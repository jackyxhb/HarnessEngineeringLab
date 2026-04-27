#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const repoRoot = process.cwd();
const requirementIds = new Set();
const reviewIds = new Set();
const reviewRecords = [];

const REVIEW_REQUIRED_PREFIXES = [
  "framework/",
  ".agent/workflows/",
  ".agent/skills/harnessing-agents/",
];

const REVIEW_REQUIRED_FILES = new Set([
  "AGENTS.md",
  "README.md",
  "REQUIREMENTS.md",
  "RELEASES.md",
  "ANCHORS.md",
  "scripts/he-lint.js",
  "scripts/harness/audit.sh",
]);

// --- DYNAMIC REGISTRIES --- //
const anchorsMap = new Map(); // Concept -> Source File
const featureMap = new Map(); // ID -> Name String

function buildDynamicRegistries() {
  // 1. Extract Anchors from ANCHORS.md
  const anchorsPath = path.join(repoRoot, "ANCHORS.md");
  if (fs.existsSync(anchorsPath)) {
    const lines = fs.readFileSync(anchorsPath, "utf-8").split("\n");
    lines.forEach((line) => {
      const match = line.match(/^###\s+A\d+:\s+(.*)$/);
      if (match) {
        anchorsMap.set(match[1].trim(), "ANCHORS.md");
      }
    });
  }

  // 2. Extract Cross-Cutting Concerns from Prevention Checklist
  const preventionPath = path.join(
    repoRoot,
    "framework",
    "cross-cutting",
    "HE Prevention Checklist.md",
  );
  if (fs.existsSync(preventionPath)) {
    const lines = fs.readFileSync(preventionPath, "utf-8").split("\n");
    lines.forEach((line) => {
      const match = line.match(/^##\s+(.*)$/);
      if (match && !line.includes("Checklist")) {
        anchorsMap.set(match[1].trim(), "HE Prevention Checklist.md");
      }
    });
  }
}

// --- STRUCTURAL VALIDATION --- //
const EXPECTED_FEATURE_FILES = 32;
const EXPECTED_PRINCIPLE_FILES = 16;

function listMarkdownFilesRecursive(dir, baseDir = dir) {
  const collected = [];
  if (!fs.existsSync(dir)) return collected;

  fs.readdirSync(dir).forEach((entry) => {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      collected.push(...listMarkdownFilesRecursive(fullPath, baseDir));
    } else if (entry.endsWith(".md")) {
      collected.push(
        path.relative(baseDir, fullPath).split(path.sep).join("/"),
      );
    }
  });

  return collected.sort();
}

function validateDAGStructure() {
  // Validate feature files exist (filenames P0-01..P0-11, P1-01..P1-12, P2-01..P2-05, P3-01..P3-04)
  const featuresDir = path.join(repoRoot, "framework", "features");
  const principlesDir = path.join(repoRoot, "framework", "principles");

  if (!fs.existsSync(featuresDir)) {
    reportError(
      featuresDir,
      0,
      "DAG Structure: framework/features/ directory is missing.",
      "Create framework/features/ and populate with modular feature files (P0-01.md through P3-04.md).",
    );
    return;
  }
  if (!fs.existsSync(principlesDir)) {
    reportError(
      principlesDir,
      0,
      "DAG Structure: framework/principles/ directory is missing.",
      "Create framework/principles/ and populate with principle files.",
    );
    return;
  }

  const featureFiles = fs
    .readdirSync(featuresDir)
    .filter((f) => f.endsWith(".md"));
  const principleFiles = fs
    .readdirSync(principlesDir)
    .filter((f) => f.endsWith(".md"));

  if (featureFiles.length !== EXPECTED_FEATURE_FILES) {
    reportError(
      featuresDir,
      0,
      `DAG Structure: Expected ${EXPECTED_FEATURE_FILES} feature files, found ${featureFiles.length}.`,
      `Ensure framework/features/ contains exactly ${EXPECTED_FEATURE_FILES} files (P0-01.md..P3-04.md).`,
    );
  }
  if (principleFiles.length !== EXPECTED_PRINCIPLE_FILES) {
    reportError(
      principlesDir,
      0,
      `DAG Structure: Expected ${EXPECTED_PRINCIPLE_FILES} principle files, found ${principleFiles.length}.`,
      `Ensure framework/principles/ contains exactly ${EXPECTED_PRINCIPLE_FILES} principle files.`,
    );
  }

  // Validate HE Index.md exists
  const indexPath = path.join(repoRoot, "framework", "HE Index.md");
  if (!fs.existsSync(indexPath)) {
    reportError(
      indexPath,
      0,
      "DAG Structure: framework/HE Index.md is missing.",
      "Create HE Index.md — the DAG navigation index.",
    );
  }
}

function validateSkillFrameworkBundle() {
  const sourceFrameworkDir = path.join(repoRoot, "framework");
  const bundledFrameworkDir = path.join(
    repoRoot,
    ".agent",
    "skills",
    "harnessing-agents",
    "framework",
  );

  if (!fs.existsSync(bundledFrameworkDir)) {
    reportError(
      bundledFrameworkDir,
      0,
      "Skill Bundle: .agent/skills/harnessing-agents/framework/ is missing.",
      "Run `npm run sync:skill-framework` to create the shipped runtime framework mirror.",
    );
    return;
  }

  const sourceFiles = listMarkdownFilesRecursive(sourceFrameworkDir);
  const bundledFiles = listMarkdownFilesRecursive(bundledFrameworkDir);

  const missingInBundle = sourceFiles.filter(
    (file) => !bundledFiles.includes(file),
  );
  const extraInBundle = bundledFiles.filter(
    (file) => !sourceFiles.includes(file),
  );

  if (missingInBundle.length > 0) {
    reportError(
      bundledFrameworkDir,
      0,
      `Skill Bundle: bundled framework is missing ${missingInBundle.join(", ")}.`,
      "Run `npm run sync:skill-framework` so the shipped runtime mirror includes every canonical framework file.",
    );
  }

  if (extraInBundle.length > 0) {
    reportError(
      bundledFrameworkDir,
      0,
      `Skill Bundle: bundled framework contains unexpected files ${extraInBundle.join(", ")}.`,
      "Remove drift by re-running `npm run sync:skill-framework` from the canonical root framework source.",
    );
  }

  sourceFiles.forEach((relativePath) => {
    const sourcePath = path.join(sourceFrameworkDir, relativePath);
    const bundledPath = path.join(bundledFrameworkDir, relativePath);
    if (!fs.existsSync(bundledPath)) return;

    const sourceContent = fs.readFileSync(sourcePath, "utf-8");
    const bundledContent = fs.readFileSync(bundledPath, "utf-8");
    if (sourceContent !== bundledContent) {
      reportError(
        bundledPath,
        0,
        `Skill Bundle: bundled framework file "${relativePath}" is out of sync with root framework/.`,
        "The shipped skill runtime must stay byte-for-byte synchronized with the canonical root framework. Run `npm run sync:skill-framework`, then commit the refreshed bundle alongside the root framework change.",
      );
    }
  });
}

function extractJsonCodeBlock(content) {
  const match = content.match(/```json\s*([\s\S]*?)```/i);
  return match ? match[1].trim() : null;
}

const REQUIRED_FEATURE_HEADERS = [
  "## L2: Targeted Enhancement",
  "## L3: Design Decisions",
  "## L4: Concrete Actions & Tools",
  "## L4: Prevention",
  "## L5: Gap Signals",
  "## L5: Improvement Policies",
  "## L5: Measurement",
  "## Dependencies",
];

const INVALID_MEASUREMENT_PATTERNS = [
  // Keep this list narrow: only reject phrases that are unambiguously gap signals.
  /\bbecomes a bottleneck\b/i,
  /\boverwrite each other's state\b/i,
  /\blose context\b/i,
  /^No clear path\b/i,
];

const CANONICAL_JSON_SCHEMA_URI =
  "https://json-schema.org/draft/2020-12/schema";

const MACHINE_READABLE_SCHEMA_BINDINGS = {
  "P1-8": {
    file: "framework/features/P1-08.md",
    schemaRefs: [".harness/anchor-record.schema.json"],
  },
  "P1-10": {
    file: "framework/features/P1-10.md",
    schemaRefs: [
      ".harness/requirement-entry.schema.json",
      ".harness/compliance-record.schema.json",
    ],
  },
  "P1-11": {
    file: "framework/features/P1-11.md",
    schemaRefs: [".harness/inquiry-response.schema.json"],
  },
  "P1-12": {
    file: "framework/features/P1-12.md",
    schemaRefs: [
      ".harness/skill-manifest.schema.json",
      ".harness/tool-definition.schema.json",
    ],
  },
  "P3-3": {
    file: "framework/features/P3-03.md",
    schemaRefs: [
      ".harness/anti-pattern-definition.schema.json",
      ".harness/pattern-audit-report.schema.json",
    ],
  },
  "P3-4": {
    file: "framework/features/P3-04.md",
    schemaRefs: [
      ".harness/consolidation-audit-report.schema.json",
      ".harness/adr-record.schema.json",
    ],
  },
};

const PREVENTION_BINDING_SCHEMA_PATH =
  "framework/schemas/prevention-rules-registry.schema.json";
const PREVENTION_REGISTRY_PATH = ".harness/prevention-rules-registry.json";
const PREVENTION_CONFIG_PATH = ".harness/prevention-enforcement-config.json";

const PREVENTION_BINDING_FEATURES = {
  // Expanded for Tranche 2 completion: Issues #1 & #2
  "P0-2": {
    file: "framework/features/P0-02.md",
    ruleIds: [],
  },
  "P0-3": {
    file: "framework/features/P0-03.md",
    ruleIds: [],
  },
  "P0-5": {
    file: "framework/features/P0-05.md",
    ruleIds: [],
  },
  "P0-6": {
    file: "framework/features/P0-06.md",
    ruleIds: [],
  },
  "P0-7": {
    file: "framework/features/P0-07.md",
    ruleIds: [],
  },
  "P0-8": {
    file: "framework/features/P0-08.md",
    ruleIds: ["P0-8-unversioned-prompts", "P0-8-version-manifests"],
  },
  "P0-9": {
    file: "framework/features/P0-09.md",
    ruleIds: [],
  },
  "P0-10": {
    file: "framework/features/P0-10.md",
    ruleIds: [],
  },
  "P1-2": {
    file: "framework/features/P1-02.md",
    ruleIds: ["P1-2-context-overflow", "P1-2-narrative-context-summaries"],
  },
  "P1-5": {
    file: "framework/features/P1-05.md",
    ruleIds: ["P1-5-blind-execution", "P1-5-narrative-observability-metrics"],
  },
  "P1-11": {
    file: "framework/features/P1-11.md",
    ruleIds: [],
  },
  "P2-4": {
    file: "framework/features/P2-04.md",
    ruleIds: [
      "P2-4-prompt-injections-and-data-leakage",
      "P2-4-malicious-emergent-behaviors",
      "P2-4-unauthorized-privilege-escalation",
      "P2-4-narrative-permission-policies",
    ],
  },
  "P2-5": {
    file: "framework/features/P2-05.md",
    ruleIds: ["P2-5-unregistered-work"],
  },
  "P3-1": {
    file: "framework/features/P3-01.md",
    ruleIds: ["P3-1-codebase-entropy", "P3-1-narrative-cleanup-reports"],
  },
  "P3-3": {
    file: "framework/features/P3-03.md",
    ruleIds: ["P3-3-pattern-drift", "P3-3-narrative-pattern-audits"],
  },
  "P3-4": {
    file: "framework/features/P3-04.md",
    ruleIds: [
      "P3-4-concept-forking-prevention",
      "P3-4-narrative-consolidation-records",
    ],
  },
};

const GRAPH_RECONCILIATION_RULES = {
  "P0-1": {
    file: "framework/features/P0-01.md",
    downstreamSource: "requiredBy",
  },
  "P0-9": {
    file: "framework/features/P0-09.md",
    downstreamSource: "enables",
    requireExplicitEnables: true,
  },
  "P2-3": {
    file: "framework/features/P2-03.md",
    downstreamSource: "none",
    mirrorRequiresIntoIndex: true,
  },
};

const MEASUREMENT_STANDARDS_PATH = "framework/HE Measurement Standards.md";
const MEASUREMENT_SCHEMA_PATH = ".harness/measurement-schema.json";
const MEASUREMENT_DEFINITIONS_PATH = ".harness/measurement-definitions.json";

const MEASUREMENT_BINDING_FEATURES = {
  // Expanded for Tranche 2 completion: Issues #1 & #2
  "P0-1": { file: "framework/features/P0-01.md" },
  "P0-2": { file: "framework/features/P0-02.md" },
  "P0-3": { file: "framework/features/P0-03.md" },
  "P0-4": { file: "framework/features/P0-04.md" },
  "P0-5": { file: "framework/features/P0-05.md" },
  "P0-6": { file: "framework/features/P0-06.md" },
  "P0-7": { file: "framework/features/P0-07.md" },
  "P0-8": { file: "framework/features/P0-08.md" },
  "P0-9": { file: "framework/features/P0-09.md" },
  "P0-10": { file: "framework/features/P0-10.md" },
  "P0-11": { file: "framework/features/P0-11.md" },
  "P1-1": { file: "framework/features/P1-01.md" },
  "P1-2": { file: "framework/features/P1-02.md" },
  "P1-3": { file: "framework/features/P1-03.md" },
  "P1-4": { file: "framework/features/P1-04.md" },
  "P1-5": { file: "framework/features/P1-05.md" },
  "P1-6": { file: "framework/features/P1-06.md" },
  "P1-7": { file: "framework/features/P1-07.md" },
  "P1-8": { file: "framework/features/P1-08.md" },
  "P1-9": { file: "framework/features/P1-09.md" },
  "P1-10": { file: "framework/features/P1-10.md" },
  "P1-11": { file: "framework/features/P1-11.md" },
  "P1-12": { file: "framework/features/P1-12.md" },
  "P2-1": { file: "framework/features/P2-01.md" },
  "P2-2": { file: "framework/features/P2-02.md" },
  "P2-3": { file: "framework/features/P2-03.md" },
  "P2-4": { file: "framework/features/P2-04.md" },
  "P2-5": { file: "framework/features/P2-05.md" },
  "P3-1": { file: "framework/features/P3-01.md" },
  "P3-2": { file: "framework/features/P3-02.md" },
  "P3-3": { file: "framework/features/P3-03.md" },
  "P3-4": { file: "framework/features/P3-04.md" },
};

function getLineNumberForSnippet(content, snippet) {
  const index = content.indexOf(snippet);
  if (index === -1) return 0;
  return content.slice(0, index).split("\n").length;
}

function getLineNumberForExactLine(lines, lineText) {
  const index = lines.findIndex((line) => line.trim() === lineText.trim());
  return index === -1 ? 0 : index + 1;
}

function validateCanonicalJsonSchemaFile(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  if (!fs.existsSync(absolutePath)) {
    reportError(
      absolutePath,
      0,
      `Schema Binding: missing canonical schema file ${relativePath}.`,
      "Create the referenced `.harness/*.schema.json` file before binding machine-readable requirements to it.",
    );
    return;
  }

  let parsed;
  try {
    parsed = JSON.parse(fs.readFileSync(absolutePath, "utf-8"));
  } catch (error) {
    reportError(
      absolutePath,
      0,
      `Schema Binding: ${relativePath} is invalid JSON (${error.message}).`,
      "Fix the schema JSON so feature-level machine-readable contracts remain parseable.",
    );
    return;
  }

  if (parsed.$schema !== CANONICAL_JSON_SCHEMA_URI) {
    reportError(
      absolutePath,
      0,
      `Schema Binding: ${relativePath} must declare the canonical Draft 2020-12 $schema URI.`,
      "Set `$schema` to `https://json-schema.org/draft/2020-12/schema`.",
    );
  }

  if (typeof parsed.title !== "string" || parsed.title.trim().length === 0) {
    reportError(
      absolutePath,
      0,
      `Schema Binding: ${relativePath} is missing a non-empty title.`,
      "Add a concise schema title so the canonical contract is self-describing.",
    );
  }

  if (parsed.type !== "object") {
    reportError(
      absolutePath,
      0,
      `Schema Binding: ${relativePath} must declare a top-level object schema.`,
      "Set the schema `type` to `object` to match the repo's canonical record pattern.",
    );
  }

  if (!Array.isArray(parsed.required) || parsed.required.length === 0) {
    reportError(
      absolutePath,
      0,
      `Schema Binding: ${relativePath} must declare a non-empty required array.`,
      "List the required fields for the machine-readable record so validation is enforceable.",
    );
  }

  if (
    !parsed.properties ||
    typeof parsed.properties !== "object" ||
    Array.isArray(parsed.properties)
  ) {
    reportError(
      absolutePath,
      0,
      `Schema Binding: ${relativePath} must declare a properties object.`,
      "Define the canonical record fields under `properties`.",
    );
  }

  if (parsed.additionalProperties !== false) {
    reportError(
      absolutePath,
      0,
      `Schema Binding: ${relativePath} must set additionalProperties to false.`,
      "Keep canonical record schemas closed by default so validators do not accept drifted fields.",
    );
  }
}

function validateMachineReadableSchemaBindings() {
  const validatedSchemas = new Set();

  Object.entries(MACHINE_READABLE_SCHEMA_BINDINGS).forEach(
    ([featureId, binding]) => {
      const featurePath = path.join(repoRoot, binding.file);
      if (!fs.existsSync(featurePath)) {
        reportError(
          featurePath,
          0,
          `Schema Binding: missing feature file for ${featureId}.`,
          "Restore the canonical feature file before validating its machine-readable schema bindings.",
        );
        return;
      }

      const content = fs.readFileSync(featurePath, "utf-8");
      binding.schemaRefs.forEach((schemaRef) => {
        if (!content.includes(schemaRef)) {
          reportError(
            featurePath,
            getLineNumberForSnippet(content, "## L4: Prevention") ||
              getLineNumberForSnippet(
                content,
                "## L4: Concrete Actions & Tools",
              ),
            `Schema Binding: ${featureId} does not reference required schema ${schemaRef}.`,
            "Reference the canonical `.harness/*.schema.json` path directly from the governing feature file so machine-readable contracts are enforceable.",
          );
        }

        if (!validatedSchemas.has(schemaRef)) {
          validateCanonicalJsonSchemaFile(schemaRef);
          validatedSchemas.add(schemaRef);
        }
      });
    },
  );
}

function readJsonFile(relativePath, label) {
  const absolutePath = path.join(repoRoot, relativePath);
  if (!fs.existsSync(absolutePath)) {
    reportError(
      absolutePath,
      0,
      `${label}: missing file ${relativePath}.`,
      `Restore ${relativePath} before relying on it as a canonical validation surface.`,
    );
    return null;
  }

  try {
    return JSON.parse(fs.readFileSync(absolutePath, "utf-8"));
  } catch (error) {
    reportError(
      absolutePath,
      0,
      `${label}: ${relativePath} is invalid JSON (${error.message}).`,
      `Fix ${relativePath} so the canonical registry/config remains machine-readable.`,
    );
    return null;
  }
}

function validatePreventionRuleBindings() {
  validateCanonicalJsonSchemaFile(PREVENTION_BINDING_SCHEMA_PATH);

  const registry = readJsonFile(PREVENTION_REGISTRY_PATH, "Prevention Binding");
  const config = readJsonFile(PREVENTION_CONFIG_PATH, "Prevention Binding");
  if (!registry || !config) return;

  if (!Array.isArray(registry.rules) || registry.rules.length === 0) {
    reportError(
      path.join(repoRoot, PREVENTION_REGISTRY_PATH),
      0,
      "Prevention Binding: registry must contain a non-empty rules array.",
      "Populate `.harness/prevention-rules-registry.json` with one binding record per targeted prevention rule.",
    );
    return;
  }

  if (
    !Array.isArray(config.enforcement_checks) ||
    config.enforcement_checks.length === 0
  ) {
    reportError(
      path.join(repoRoot, PREVENTION_CONFIG_PATH),
      0,
      "Prevention Binding: config must contain a non-empty enforcement_checks array.",
      "List the mounted lint/audit checks in `.harness/prevention-enforcement-config.json`.",
    );
  }

  const registryRuleIds = new Set();
  registry.rules.forEach((rule, index) => {
    const lineNumber = index + 1;
    if (!rule || typeof rule !== "object") {
      reportError(
        path.join(repoRoot, PREVENTION_REGISTRY_PATH),
        lineNumber,
        "Prevention Binding: registry entry is not an object.",
        "Each prevention-rule binding must be a JSON object.",
      );
      return;
    }

    const {
      rule_id: ruleId,
      feature_id: featureId,
      binding_status: bindingStatus,
      enforcement_surface: enforcementSurface,
      unmounted_reason: unmountedReason,
    } = rule;

    if (!ruleId || typeof ruleId !== "string") {
      reportError(
        path.join(repoRoot, PREVENTION_REGISTRY_PATH),
        lineNumber,
        "Prevention Binding: registry entries must include a string rule_id.",
        "Add a stable rule_id such as `P2-5-unregistered-work`.",
      );
      return;
    }

    if (registryRuleIds.has(ruleId)) {
      reportError(
        path.join(repoRoot, PREVENTION_REGISTRY_PATH),
        lineNumber,
        `Prevention Binding: duplicate rule_id ${ruleId}.`,
        "Keep rule_id values unique so enforcement status is not ambiguous.",
      );
    }
    registryRuleIds.add(ruleId);

    if (!PREVENTION_BINDING_FEATURES[featureId]) {
      reportError(
        path.join(repoRoot, PREVENTION_REGISTRY_PATH),
        lineNumber,
        `Prevention Binding: ${ruleId} references unsupported feature ${featureId}.`,
        "Keep the Tranche 2 registry limited to the targeted prevention-binding features.",
      );
    }

    if (
      bindingStatus !== "implemented" &&
      bindingStatus !== "declared-unmounted"
    ) {
      reportError(
        path.join(repoRoot, PREVENTION_REGISTRY_PATH),
        lineNumber,
        `Prevention Binding: ${ruleId} must use binding_status implemented or declared-unmounted.`,
        "Use only the canonical prevention-binding statuses.",
      );
    }

    if (!enforcementSurface || typeof enforcementSurface !== "object") {
      reportError(
        path.join(repoRoot, PREVENTION_REGISTRY_PATH),
        lineNumber,
        `Prevention Binding: ${ruleId} is missing an enforcement_surface object.`,
        "Point every prevention rule at a concrete lint/audit/runtime surface.",
      );
      return;
    }

    if (
      !enforcementSurface.path ||
      typeof enforcementSurface.path !== "string"
    ) {
      reportError(
        path.join(repoRoot, PREVENTION_REGISTRY_PATH),
        lineNumber,
        `Prevention Binding: ${ruleId} must declare enforcement_surface.path.`,
        "Reference a concrete repository path for the enforcement surface.",
      );
    } else {
      const enforcementPath = path.join(repoRoot, enforcementSurface.path);
      if (!fs.existsSync(enforcementPath)) {
        reportError(
          path.join(repoRoot, PREVENTION_REGISTRY_PATH),
          lineNumber,
          `Prevention Binding: ${ruleId} points at missing enforcement surface ${enforcementSurface.path}.`,
          "Create the referenced enforcement surface or update the registry entry.",
        );
      }
    }

    if (bindingStatus === "declared-unmounted") {
      if (!unmountedReason || typeof unmountedReason !== "string") {
        reportError(
          path.join(repoRoot, PREVENTION_REGISTRY_PATH),
          lineNumber,
          `Prevention Binding: ${ruleId} is declared-unmounted but missing unmounted_reason.`,
          "Explain why the prevention rule is still unmounted so future tranches know what is missing.",
        );
      }
    }
  });

  Object.entries(PREVENTION_BINDING_FEATURES).forEach(
    ([featureId, binding]) => {
      const featurePath = path.join(repoRoot, binding.file);
      if (!fs.existsSync(featurePath)) {
        reportError(
          featurePath,
          0,
          `Prevention Binding: missing feature file for ${featureId}.`,
          "Restore the feature file before validating its enforcement bindings.",
        );
        return;
      }

      const content = fs.readFileSync(featurePath, "utf-8");
      if (!content.includes("## Enforcement Bindings")) {
        reportError(
          featurePath,
          getLineNumberForSnippet(content, "## L4: Prevention"),
          `Prevention Binding: ${featureId} is missing an Enforcement Bindings section.`,
          "Add an explicit section that points the feature's prevention rules at the canonical registry.",
        );
      }

      if (!content.includes(PREVENTION_REGISTRY_PATH)) {
        reportError(
          featurePath,
          getLineNumberForSnippet(content, "## Enforcement Bindings") ||
            getLineNumberForSnippet(content, "## L4: Prevention"),
          `Prevention Binding: ${featureId} does not reference ${PREVENTION_REGISTRY_PATH}.`,
          "Reference the live prevention registry directly from the feature file.",
        );
      }

      if (!content.includes(PREVENTION_BINDING_SCHEMA_PATH)) {
        reportError(
          featurePath,
          getLineNumberForSnippet(content, "## Enforcement Bindings") ||
            getLineNumberForSnippet(content, "## L4: Prevention"),
          `Prevention Binding: ${featureId} does not reference ${PREVENTION_BINDING_SCHEMA_PATH}.`,
          "Reference the canonical prevention-registry schema from the feature file.",
        );
      }

      binding.ruleIds.forEach((ruleId) => {
        if (!registryRuleIds.has(ruleId)) {
          reportError(
            featurePath,
            getLineNumberForSnippet(content, "## Enforcement Bindings") ||
              getLineNumberForSnippet(content, "## L4: Prevention"),
            `Prevention Binding: ${featureId} is missing registry entry ${ruleId}.`,
            "Add the missing rule_id to `.harness/prevention-rules-registry.json`.",
          );
        }
      });
    },
  );

  config.enforcement_checks.forEach((check, index) => {
    const lineNumber = index + 1;
    if (!check || typeof check !== "object") {
      reportError(
        path.join(repoRoot, PREVENTION_CONFIG_PATH),
        lineNumber,
        "Prevention Binding: enforcement_checks entry is not an object.",
        "Each enforcement check must be a JSON object.",
      );
      return;
    }

    if (!check.script || typeof check.script !== "string") {
      reportError(
        path.join(repoRoot, PREVENTION_CONFIG_PATH),
        lineNumber,
        "Prevention Binding: each enforcement check must declare a script path.",
        "Point each configured enforcement check at the script that runs it.",
      );
      return;
    }

    const scriptPath = path.join(repoRoot, check.script);
    if (!fs.existsSync(scriptPath)) {
      reportError(
        path.join(repoRoot, PREVENTION_CONFIG_PATH),
        lineNumber,
        `Prevention Binding: configured script ${check.script} does not exist.`,
        "Create the referenced script or update the enforcement config.",
      );
    }
  });
}

function getFeatureIndexEntries() {
  const indexPath = path.join(repoRoot, "framework", "HE Index.md");
  if (!fs.existsSync(indexPath)) return [];

  const content = fs.readFileSync(indexPath, "utf-8");
  const jsonBlock = extractJsonCodeBlock(content);
  if (!jsonBlock) {
    reportError(
      indexPath,
      0,
      "Feature Chain: HE Index.md is missing the canonical JSON DAG block.",
      "Restore the HE Index JSON block so feature metadata can be validated mechanically.",
    );
    return [];
  }

  try {
    const parsed = JSON.parse(jsonBlock);
    return Array.isArray(parsed.features) ? parsed.features : [];
  } catch (error) {
    reportError(
      indexPath,
      0,
      `Feature Chain: HE Index.md has invalid JSON (${error.message}).`,
      "Fix the JSON DAG block in HE Index.md so feature metadata can be parsed.",
    );
    return [];
  }
}

function extractFeatureDependencyClaims(content) {
  const lines = content.split("\n");
  const requires = new Set();
  const requiredBy = [];
  const enables = [];
  const enableLines = [];

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    const ids = [...trimmed.matchAll(/P\d-\d+/g)].map((match) => match[0]);

    if (trimmed.startsWith("**Requires:**")) {
      ids.forEach((id) => requires.add(id));
    }

    if (trimmed.startsWith("**Required by:**")) {
      ids.forEach((id) => {
        requiredBy.push({ id, lineNumber: index + 1 });
      });
    }

    if (trimmed.startsWith("**Enables:**")) {
      enableLines.push({
        ids,
        lineNumber: index + 1,
      });
      ids.forEach((id) => {
        enables.push({ id, lineNumber: index + 1 });
      });
    }
  });

  return { requires, requiredBy, enables, enableLines };
}

function getSortedUniqueIds(values) {
  return [...new Set(values)].sort();
}

function haveSameIds(left, right) {
  return (
    left.length === right.length &&
    left.every((value, index) => value === right[index])
  );
}

function validateGraphReconciliation() {
  const indexPath = path.join(repoRoot, "framework", "HE Index.md");
  const indexContent = fs.existsSync(indexPath)
    ? fs.readFileSync(indexPath, "utf-8")
    : "";
  const featureEntries = getFeatureIndexEntries();
  const featureEntryById = new Map(
    featureEntries.map((feature) => [feature.id, feature]),
  );

  Object.entries(GRAPH_RECONCILIATION_RULES).forEach(([featureId, rule]) => {
    const featureEntry = featureEntryById.get(featureId);
    if (!featureEntry) {
      reportError(
        indexPath,
        0,
        `Graph Reconciliation: HE Index.md is missing feature ${featureId}.`,
        "Restore the canonical feature entry before validating graph reconciliation rules.",
      );
      return;
    }

    const featurePath = path.join(repoRoot, rule.file);
    if (!fs.existsSync(featurePath)) {
      reportError(
        featurePath,
        0,
        `Graph Reconciliation: missing feature file for ${featureId}.`,
        "Restore the canonical feature file before validating graph reconciliation rules.",
      );
      return;
    }

    const content = fs.readFileSync(featurePath, "utf-8");
    const claims = extractFeatureDependencyClaims(content);
    const declaredDownstream = getSortedUniqueIds(
      featureEntry.downstream || [],
    );
    let expectedDownstream = [];

    if (rule.downstreamSource === "requiredBy") {
      expectedDownstream = getSortedUniqueIds(
        claims.requiredBy.map((claim) => claim.id),
      );
    }

    if (rule.downstreamSource === "enables") {
      if (rule.requireExplicitEnables) {
        claims.enableLines.forEach(({ ids, lineNumber }) => {
          if (ids.length === 0) {
            reportError(
              featurePath,
              lineNumber,
              `Graph Reconciliation: ${featureId} uses a vague **Enables:** clause without explicit feature IDs.`,
              "Name the enabled canonical feature IDs directly or remove the unsupported downstream claim.",
            );
          }
        });
      }

      expectedDownstream = getSortedUniqueIds(
        claims.enables.map((claim) => claim.id),
      );
    }

    if (!haveSameIds(declaredDownstream, expectedDownstream)) {
      reportError(
        indexPath,
        getLineNumberForSnippet(indexContent, `"id": "${featureId}"`),
        `Graph Reconciliation: ${featureId} downstream in HE Index.md does not match its canonical ${rule.downstreamSource} declarations.`,
        `Update ${featureId} in framework/HE Index.md so downstream is ${JSON.stringify(expectedDownstream)}.`,
      );
    }

    if (rule.mirrorRequiresIntoIndex) {
      claims.requires.forEach((requiredId) => {
        const requiredFeature = featureEntryById.get(requiredId);
        if (!requiredFeature) {
          reportError(
            featurePath,
            getLineNumberForSnippet(content, "**Requires:**"),
            `Graph Reconciliation: ${featureId} requires unknown feature ${requiredId}.`,
            "Use only canonical feature IDs declared in framework/HE Index.md.",
          );
          return;
        }

        if (!(requiredFeature.downstream || []).includes(featureId)) {
          reportError(
            indexPath,
            getLineNumberForSnippet(indexContent, `"id": "${requiredId}"`),
            `Graph Reconciliation: ${featureId} requires ${requiredId}, but HE Index.md does not list ${featureId} downstream of ${requiredId}.`,
            `Mirror the canonical requires edge by adding ${featureId} to ${requiredId}'s downstream array in framework/HE Index.md.`,
          );
        }
      });
    }
  });
}

function validateMeasurementOperationalDefinitions() {
  const standardsPath = path.join(repoRoot, MEASUREMENT_STANDARDS_PATH);
  if (!fs.existsSync(standardsPath)) {
    reportError(
      standardsPath,
      0,
      "Measurement Binding: missing framework/HE Measurement Standards.md.",
      "Create the canonical measurement standards document before binding L5 measurements to the registry.",
    );
  }

  validateCanonicalJsonSchemaFile(MEASUREMENT_SCHEMA_PATH);

  const definitions = readJsonFile(
    MEASUREMENT_DEFINITIONS_PATH,
    "Measurement Binding",
  );
  if (!definitions) return;

  const definitionsPath = path.join(repoRoot, MEASUREMENT_DEFINITIONS_PATH);
  if (definitions.$schema !== "./measurement-schema.json") {
    reportError(
      definitionsPath,
      0,
      "Measurement Binding: .harness/measurement-definitions.json must declare $schema ./measurement-schema.json.",
      "Point the definitions registry at the canonical measurement schema file.",
    );
  }

  if (definitions.generated_from !== MEASUREMENT_STANDARDS_PATH) {
    reportError(
      definitionsPath,
      0,
      "Measurement Binding: measurement definitions must declare framework/HE Measurement Standards.md as generated_from.",
      "Keep the definitions registry tied to the canonical standards document.",
    );
  }

  if (
    !Array.isArray(definitions.feature_measurements) ||
    definitions.feature_measurements.length === 0
  ) {
    reportError(
      definitionsPath,
      0,
      "Measurement Binding: .harness/measurement-definitions.json must contain a non-empty feature_measurements array.",
      "Add one measurement definition entry for each targeted feature.",
    );
    return;
  }

  const featureEntries = getFeatureIndexEntries();
  const featureEntryById = new Map(
    featureEntries.map((feature) => [feature.id, feature]),
  );
  const definitionsByFeature = new Map();

  definitions.feature_measurements.forEach((featureMeasurement, index) => {
    const lineNumber = index + 1;
    if (!featureMeasurement || typeof featureMeasurement !== "object") {
      reportError(
        definitionsPath,
        lineNumber,
        "Measurement Binding: feature measurement entry is not an object.",
        "Use one JSON object per feature measurement binding.",
      );
      return;
    }

    const {
      feature_id: featureId,
      measurement_binding: measurementBinding,
      status,
      collection_trigger: collectionTrigger,
      freshness_slo_minutes: freshnessSloMinutes,
      metrics,
    } = featureMeasurement;

    if (!MEASUREMENT_BINDING_FEATURES[featureId]) {
      reportError(
        definitionsPath,
        lineNumber,
        `Measurement Binding: unsupported feature_id ${featureId} in measurement definitions.`,
        "Keep the registry limited to the nine targeted measurement features for this tranche.",
      );
      return;
    }

    if (definitionsByFeature.has(featureId)) {
      reportError(
        definitionsPath,
        lineNumber,
        `Measurement Binding: duplicate measurement definition for ${featureId}.`,
        "Keep exactly one registry entry per targeted feature.",
      );
    }
    definitionsByFeature.set(featureId, featureMeasurement);

    if (measurementBinding !== featureId) {
      reportError(
        definitionsPath,
        lineNumber,
        `Measurement Binding: ${featureId} must use the same value for measurement_binding and feature_id.`,
        "Mirror the canonical feature ID in the registry binding key.",
      );
    }

    if (
      status !== "implemented" &&
      status !== "proxy-mounted" &&
      status !== "declared-unmounted"
    ) {
      reportError(
        definitionsPath,
        lineNumber,
        `Measurement Binding: ${featureId} has invalid status ${status}.`,
        "Use only implemented, proxy-mounted, or declared-unmounted for measurement bindings.",
      );
    }

    if (!collectionTrigger || typeof collectionTrigger !== "string") {
      reportError(
        definitionsPath,
        lineNumber,
        `Measurement Binding: ${featureId} must declare collection_trigger.`,
        "Name the command or workflow that refreshes the metric binding.",
      );
    }

    if (typeof freshnessSloMinutes !== "number" || freshnessSloMinutes <= 0) {
      reportError(
        definitionsPath,
        lineNumber,
        `Measurement Binding: ${featureId} must declare a positive freshness_slo_minutes value.`,
        "Set the freshness SLO in minutes for each feature measurement binding.",
      );
    }

    if (!Array.isArray(metrics) || metrics.length === 0) {
      reportError(
        definitionsPath,
        lineNumber,
        `Measurement Binding: ${featureId} must contain one or more metric definitions.`,
        "Add at least one metric object for each bound feature.",
      );
      return;
    }

    metrics.forEach((metric, metricIndex) => {
      if (!metric || typeof metric !== "object") {
        reportError(
          definitionsPath,
          lineNumber,
          `Measurement Binding: ${featureId} metric ${metricIndex + 1} is not an object.`,
          "Use JSON objects for all metric definitions.",
        );
        return;
      }

      const metricLabel =
        metric.metric_id || `${featureId} metric ${metricIndex + 1}`;

      [
        "metric_id",
        "outcome",
        "status",
        "event_source",
        "collection_trigger",
        "formula",
        "storage_key",
        "threshold_justification",
      ].forEach((field) => {
        if (!metric[field] || typeof metric[field] !== "string") {
          reportError(
            definitionsPath,
            lineNumber,
            `Measurement Binding: ${metricLabel} is missing string field ${field}.`,
            "Complete all required metric-definition fields in the measurement registry.",
          );
        }
      });

      if (
        metric.status !== "implemented" &&
        metric.status !== "proxy-mounted" &&
        metric.status !== "declared-unmounted"
      ) {
        reportError(
          definitionsPath,
          lineNumber,
          `Measurement Binding: ${metricLabel} has invalid status ${metric.status}.`,
          "Use only implemented, proxy-mounted, or declared-unmounted for metric statuses.",
        );
      }

      if (
        !metric.storage_key ||
        !metric.storage_key.startsWith(
          `measurement_health.features.${featureId}.metrics.`,
        )
      ) {
        reportError(
          definitionsPath,
          lineNumber,
          `Measurement Binding: ${metricLabel} must store under measurement_health.features.${featureId}.metrics.*.`,
          "Keep metric storage keys namespaced by feature ID in the observation report.",
        );
      }

      if (
        !metric.threshold ||
        typeof metric.threshold !== "object" ||
        Array.isArray(metric.threshold)
      ) {
        reportError(
          definitionsPath,
          lineNumber,
          `Measurement Binding: ${metricLabel} must declare a threshold object.`,
          "Define operator, target, and unit for every metric threshold.",
        );
      } else {
        if (
          typeof metric.threshold.operator !== "string" ||
          !["<", "<=", ">", ">=", "="].includes(metric.threshold.operator)
        ) {
          reportError(
            definitionsPath,
            lineNumber,
            `Measurement Binding: ${metricLabel} has invalid threshold operator ${metric.threshold.operator}.`,
            "Use one of <, <=, >, >=, or = for threshold.operator.",
          );
        }

        if (typeof metric.threshold.target !== "number") {
          reportError(
            definitionsPath,
            lineNumber,
            `Measurement Binding: ${metricLabel} must use a numeric threshold target.`,
            "Set threshold.target to a number.",
          );
        }

        if (
          !metric.threshold.unit ||
          typeof metric.threshold.unit !== "string"
        ) {
          reportError(
            definitionsPath,
            lineNumber,
            `Measurement Binding: ${metricLabel} must declare threshold.unit.`,
            "Name the threshold unit for every metric.",
          );
        }
      }

      if (
        !metric.enforcement_surface ||
        typeof metric.enforcement_surface !== "object" ||
        Array.isArray(metric.enforcement_surface)
      ) {
        reportError(
          definitionsPath,
          lineNumber,
          `Measurement Binding: ${metricLabel} must declare an enforcement_surface object.`,
          "Reference the script, artifact, or future surface that owns the metric.",
        );
      } else if (
        !metric.enforcement_surface.type ||
        !metric.enforcement_surface.path
      ) {
        reportError(
          definitionsPath,
          lineNumber,
          `Measurement Binding: ${metricLabel} enforcement_surface requires type and path.`,
          "Complete the enforcement_surface object for every metric.",
        );
      } else if (metric.status !== "declared-unmounted") {
        const enforcementPath = path.join(
          repoRoot,
          metric.enforcement_surface.path,
        );
        if (!fs.existsSync(enforcementPath)) {
          reportError(
            definitionsPath,
            lineNumber,
            `Measurement Binding: ${metricLabel} points at missing mounted enforcement surface ${metric.enforcement_surface.path}.`,
            "Use an existing path for implemented or proxy-mounted metrics, or mark the metric declared-unmounted.",
          );
        }
      }
    });
  });

  Object.entries(MEASUREMENT_BINDING_FEATURES).forEach(
    ([featureId, binding]) => {
      const featureEntry = featureEntryById.get(featureId);
      const featurePath = path.join(repoRoot, binding.file);

      if (!featureEntry) {
        reportError(
          path.join(repoRoot, "framework", "HE Index.md"),
          0,
          `Measurement Binding: HE Index.md is missing targeted feature ${featureId}.`,
          "Restore the canonical feature entry before validating measurement bindings.",
        );
        return;
      }

      if (featureEntry.measurement_binding !== featureId) {
        reportError(
          path.join(repoRoot, "framework", "HE Index.md"),
          getLineNumberForSnippet(
            fs.readFileSync(
              path.join(repoRoot, "framework", "HE Index.md"),
              "utf-8",
            ),
            `"id": "${featureId}"`,
          ),
          `Measurement Binding: ${featureId} must declare measurement_binding ${featureId} in framework/HE Index.md.`,
          "Mirror the canonical feature ID into the index measurement_binding field.",
        );
      }

      if (!fs.existsSync(featurePath)) {
        reportError(
          featurePath,
          0,
          `Measurement Binding: missing feature file for ${featureId}.`,
          "Restore the canonical feature file before validating measurement bindings.",
        );
        return;
      }

      const content = fs.readFileSync(featurePath, "utf-8");
      if (!content.includes("## Measurement Bindings")) {
        reportError(
          featurePath,
          getLineNumberForSnippet(content, "## L5: Measurement"),
          `Measurement Binding: ${featureId} must declare a ## Measurement Bindings section.`,
          "Bind the feature's L5 measurement outcomes to the shared registry and standards document.",
        );
      }

      if (!content.includes(MEASUREMENT_STANDARDS_PATH)) {
        reportError(
          featurePath,
          getLineNumberForSnippet(content, "## Measurement Bindings"),
          `Measurement Binding: ${featureId} does not reference framework/HE Measurement Standards.md.`,
          "Reference the canonical measurement standards document from the feature file.",
        );
      }

      if (!content.includes(MEASUREMENT_DEFINITIONS_PATH)) {
        reportError(
          featurePath,
          getLineNumberForSnippet(content, "## Measurement Bindings"),
          `Measurement Binding: ${featureId} does not reference .harness/measurement-definitions.json.`,
          "Reference the shared measurement registry from the feature file.",
        );
      }

      if (!content.includes(`**Binding Key:** \`${featureId}\``)) {
        reportError(
          featurePath,
          getLineNumberForSnippet(content, "## Measurement Bindings"),
          `Measurement Binding: ${featureId} must declare its binding key in the feature file.`,
          "Add a Binding Key line that matches the registry and index metadata.",
        );
      }

      if (!definitionsByFeature.has(featureId)) {
        reportError(
          definitionsPath,
          0,
          `Measurement Binding: .harness/measurement-definitions.json is missing ${featureId}.`,
          "Add a feature measurement entry for every targeted L5 measurement surface.",
        );
      }
    },
  );
}

function validateNoDuplicateSections() {
  const featureEntries = getFeatureIndexEntries();

  featureEntries.forEach((feature) => {
    const featurePath = path.join(repoRoot, feature.file);
    if (!fs.existsSync(featurePath)) return;

    const content = fs.readFileSync(featurePath, "utf-8");
    const lines = content.split("\n");

    // Check for duplicate L5 Improvement Policies sections
    const l5Count = lines.filter((line) =>
      line.includes("## L5: Improvement Policies"),
    ).length;
    if (l5Count > 1) {
      reportError(
        featurePath,
        0,
        `Structure: ${feature.id} has ${l5Count} "## L5: Improvement Policies" sections (should be 1).`,
        "Remove duplicate L5 Improvement Policies section, keeping the first authoritative one.",
      );
    }

    // Check for duplicate L4 sections
    const l4ConcreteCount = lines.filter((line) =>
      line.includes("## L4: Concrete Actions"),
    ).length;
    const l4PreventionCount = lines.filter((line) =>
      line.includes("## L4: Prevention"),
    ).length;

    if (l4ConcreteCount > 1) {
      reportError(
        featurePath,
        0,
        `Structure: ${feature.id} has ${l4ConcreteCount} "## L4: Concrete Actions & Tools" sections (should be 1).`,
        "Keep only one L4: Concrete Actions & Tools section.",
      );
    }

    if (l4PreventionCount > 1) {
      reportError(
        featurePath,
        0,
        `Structure: ${feature.id} has ${l4PreventionCount} "## L4: Prevention" sections (should be 1).`,
        "Keep only one L4: Prevention section.",
      );
    }
  });
}

function validateNoDuplicateDeclarations() {
  const featureEntries = getFeatureIndexEntries();

  featureEntries.forEach((feature) => {
    const featurePath = path.join(repoRoot, feature.file);
    if (!fs.existsSync(featurePath)) return;

    const content = fs.readFileSync(featurePath, "utf-8");
    const lines = content.split("\n");

    // Check for duplicate Binding Key declarations
    const bindingKeyPattern = /\*\*Binding Key:\*\*/g;
    const bindingKeyMatches = content.match(bindingKeyPattern) || [];

    if (bindingKeyMatches.length > 1) {
      reportError(
        featurePath,
        0,
        `Structure: ${feature.id} has ${bindingKeyMatches.length} "**Binding Key:**" declarations (should be 1).`,
        "Keep only the first Binding Key declaration in the Measurement Bindings section.",
      );
    }

    // Check for duplicate Enforcement Bindings headers
    const enforcementCount = lines.filter((line) =>
      line.includes("## Enforcement Bindings"),
    ).length;
    if (enforcementCount > 1) {
      reportError(
        featurePath,
        0,
        `Structure: ${feature.id} has ${enforcementCount} "## Enforcement Bindings" sections (should be 0 or 1).`,
        "Remove duplicate Enforcement Bindings sections.",
      );
    }
  });
}

function validateMeasurementRegistry() {
  const measurementDefPath = path.join(
    repoRoot,
    ".harness",
    "measurement-definitions.json",
  );
  if (!fs.existsSync(measurementDefPath)) return;

  let measurementDefs;
  try {
    measurementDefs = JSON.parse(fs.readFileSync(measurementDefPath, "utf-8"));
  } catch (error) {
    reportError(
      measurementDefPath,
      0,
      `Measurement Registry: measurement-definitions.json is invalid JSON (${error.message}).`,
      "Fix the JSON syntax in .harness/measurement-definitions.json.",
    );
    return;
  }

  if (
    !Array.isArray(measurementDefs.feature_measurements) ||
    measurementDefs.feature_measurements.length === 0
  ) {
    return;
  }

  const registeredKeys = new Set(
    measurementDefs.feature_measurements.map((def) => def.measurement_binding),
  );

  const featureEntries = getFeatureIndexEntries();

  featureEntries.forEach((feature) => {
    const featurePath = path.join(repoRoot, feature.file);
    if (!fs.existsSync(featurePath)) return;

    const content = fs.readFileSync(featurePath, "utf-8");

    // Extract Binding Key from file if present
    const bindingKeyMatch = content.match(
      /\*\*Binding Key:\*\*\s+`?([^`\n]+)`?/,
    );
    if (bindingKeyMatch) {
      const declaredKey = bindingKeyMatch[1].trim();

      if (!registeredKeys.has(declaredKey)) {
        reportError(
          featurePath,
          getLineNumberForSnippet(content, bindingKeyMatch[0]),
          `Registry: ${feature.id} declares Binding Key "${declaredKey}" but no entry exists in .harness/measurement-definitions.json.`,
          "Add a measurement definition entry for this feature to the registry, or remove the Binding Key declaration if measurement is deferred.",
        );
      }
    }
  });
}

function validateFeatureChainFiles() {
  const featureEntries = getFeatureIndexEntries();
  const featureEntryById = new Map(
    featureEntries.map((feature) => [feature.id, feature]),
  );
  featureEntries.forEach((feature) => {
    const featurePath = path.join(repoRoot, feature.file);
    if (!fs.existsSync(featurePath)) {
      reportError(
        featurePath,
        0,
        `Feature Chain: missing canonical feature file for ${feature.id}.`,
        "Restore the feature file referenced by framework/HE Index.md.",
      );
      return;
    }

    const content = fs.readFileSync(featurePath, "utf-8");
    const lines = content.split("\n");
    const dependencyClaims = extractFeatureDependencyClaims(content);

    REQUIRED_FEATURE_HEADERS.forEach((header) => {
      if (!content.includes(header)) {
        reportError(
          featurePath,
          0,
          `Feature Chain: ${feature.id} is missing required section "${header}".`,
          "Restore the canonical L2-L5 feature template sections.",
        );
      }
    });

    const chainMatch = content.match(/^> \*\*Chain:\*\* \[(EP-\d+)\]/m);
    if (!chainMatch) {
      reportError(
        featurePath,
        0,
        `Feature Chain: ${feature.id} is missing its EP chain link.`,
        "Add the canonical `> **Chain:** [EP-x](...)` line beneath the title.",
      );
    } else if (chainMatch[1] !== feature.ep) {
      reportError(
        featurePath,
        getLineNumberForSnippet(content, chainMatch[0]),
        `Feature Chain: ${feature.id} links to ${chainMatch[1]} but HE Index declares ${feature.ep}.`,
        "Update the feature file or HE Index.md so the EP mapping is identical in both places.",
      );
    }

    const l2Match = content.match(/## L2: Targeted Enhancement\n\n([^\n]+)/);
    if (!l2Match) {
      reportError(
        featurePath,
        0,
        `Feature Chain: ${feature.id} is missing L2 targeted-enhancement text.`,
        "Restore the L2 targeted-enhancement sentence beneath the L2 heading.",
      );
    }

    const improvementPoliciesMatch = content.match(
      /## L5: Improvement Policies\n\n```json\n([\s\S]*?)\n```/,
    );
    if (!improvementPoliciesMatch) {
      reportError(
        featurePath,
        getLineNumberForSnippet(content, "## L5: Improvement Policies"),
        `Feature Chain: ${feature.id} must express L5 improvement policies as JSON.`,
        "Replace narrative bullets with a canonical ```json improvement_policies block.",
      );
    } else {
      try {
        const parsed = JSON.parse(improvementPoliciesMatch[1]);
        if (
          !Array.isArray(parsed.improvement_policies) ||
          parsed.improvement_policies.length === 0
        ) {
          reportError(
            featurePath,
            getLineNumberForSnippet(content, "## L5: Improvement Policies"),
            `Feature Chain: ${feature.id} improvement_policies must be a non-empty array.`,
            "Populate the JSON block with one or more improvement policy entries.",
          );
        }
      } catch (error) {
        reportError(
          featurePath,
          getLineNumberForSnippet(content, "## L5: Improvement Policies"),
          `Feature Chain: ${feature.id} improvement_policies JSON is invalid (${error.message}).`,
          "Fix the JSON syntax so the feature remains machine-readable.",
        );
      }
    }

    const measurementMatch = content.match(
      /## L5: Measurement\n\n([\s\S]*?)\n## Dependencies/,
    );
    if (!measurementMatch) {
      reportError(
        featurePath,
        getLineNumberForSnippet(content, "## L5: Measurement"),
        `Feature Chain: ${feature.id} is missing its L5 measurement section.`,
        "Restore the L5 measurement bullets that describe observable success outcomes.",
      );
      return;
    }

    const measurementBullets = measurementMatch[1]
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.startsWith("- "));

    if (measurementBullets.length === 0) {
      reportError(
        featurePath,
        getLineNumberForSnippet(content, "## L5: Measurement"),
        `Feature Chain: ${feature.id} measurement section has no bullets.`,
        "Add one or more measurement bullets describing observable success outcomes.",
      );
    }

    measurementBullets.forEach((bullet) => {
      const bulletText = bullet.slice(2);
      if (
        INVALID_MEASUREMENT_PATTERNS.some((pattern) => pattern.test(bulletText))
      ) {
        reportError(
          featurePath,
          getLineNumberForExactLine(lines, bullet),
          `Feature Chain: ${feature.id} measurement bullet contains failure-state language instead of a measurable success outcome.`,
          "Keep failure states in Gap Signals; reserve L5 Measurement for observable success metrics or success-state outcomes.",
        );
      }
    });

    const measurementLineIndex = lines.findIndex(
      (line) => line.trim() === "## L5: Measurement",
    );
    const dependenciesLineIndex = lines.findIndex(
      (line, index) =>
        index > measurementLineIndex && line.trim() === "## Dependencies",
    );
    if (measurementLineIndex !== -1 && dependenciesLineIndex !== -1) {
      for (
        let index = measurementLineIndex + 1;
        index < dependenciesLineIndex;
        index += 1
      ) {
        const line = lines[index].trim();
        if (
          line.startsWith("- ") &&
          INVALID_MEASUREMENT_PATTERNS.some((pattern) =>
            pattern.test(line.slice(2)),
          )
        ) {
          reportError(
            featurePath,
            index + 1,
            `Feature Chain: ${feature.id} measurement line is phrased as a gap signal.`,
            "Move failure states back into Gap Signals and replace them with measurable success outcomes.",
          );
        }
      }
    }

    dependencyClaims.requiredBy.forEach(({ id: dependentId, lineNumber }) => {
      const dependentFeature = featureEntryById.get(dependentId);
      if (!dependentFeature) {
        reportError(
          featurePath,
          lineNumber,
          `Feature Chain: ${feature.id} lists unknown dependent feature ${dependentId} under Required by.`,
          "Replace the unknown feature reference with a canonical feature ID from framework/HE Index.md or remove the unsupported dependency claim.",
        );
        return;
      }

      const dependentPath = path.join(repoRoot, dependentFeature.file);
      if (!fs.existsSync(dependentPath)) {
        return;
      }

      const dependentContent = fs.readFileSync(dependentPath, "utf-8");
      const dependentClaims = extractFeatureDependencyClaims(dependentContent);
      if (!dependentClaims.requires.has(feature.id)) {
        reportError(
          featurePath,
          lineNumber,
          `Feature Chain: ${feature.id} claims it is required by ${dependentId}, but ${dependentId} does not declare ${feature.id} under **Requires:**.`,
          "Keep `Required by` lines truthful: either remove the unsupported dependent from this feature file or add the matching `**Requires:**` declaration in the dependent feature file if the dependency is real.",
        );
      }
    });
  });
}

function extractSkillVersion(content) {
  const match = content.match(/^version:\s*"([^"]+)"\s*$/m);
  return match ? match[1] : null;
}

function normalizeRelativePath(filePath) {
  return filePath.split(path.sep).join("/");
}

function isReviewRequiredPath(filePath) {
  return (
    REVIEW_REQUIRED_PREFIXES.some((prefix) => filePath.startsWith(prefix)) ||
    REVIEW_REQUIRED_FILES.has(filePath)
  );
}

function scopeEntryMatchesPath(scopeEntry, filePath) {
  const normalizedScope = normalizeRelativePath(scopeEntry.trim());
  if (!normalizedScope) return false;
  if (normalizedScope.endsWith("/")) {
    return filePath.startsWith(normalizedScope);
  }
  return filePath === normalizedScope;
}

function getGitChangedFiles({ includeWorkingTree = false } = {}) {
  const changed = new Set();
  const commands = ["git diff --cached --name-only HEAD"];

  if (includeWorkingTree) {
    commands.push("git diff --name-only HEAD", "git diff --name-only");
  }

  commands.forEach((command) => {
    try {
      const output = execSync(command, {
        cwd: repoRoot,
        encoding: "utf-8",
        stdio: ["ignore", "pipe", "ignore"],
      });
      output
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .forEach((file) => changed.add(file));
    } catch {
      // Ignore git diff failures and fall back to whatever can be observed.
    }
  });

  if (includeWorkingTree) {
    try {
      const untracked = execSync("git ls-files --others --exclude-standard", {
        cwd: repoRoot,
        encoding: "utf-8",
        stdio: ["ignore", "pipe", "ignore"],
      });
      untracked
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .forEach((file) => changed.add(file));
    } catch {
      // Ignore git ls-files failures and fall back to tracked changes only.
    }
  }

  return Array.from(changed);
}

function validateReleaseNotesSurface() {
  const releasesPath = path.join(repoRoot, "RELEASES.md");
  if (!fs.existsSync(releasesPath)) {
    reportError(
      releasesPath,
      0,
      "Release Notes: RELEASES.md is missing.",
      "Create RELEASES.md as the canonical HELab release-notes surface.",
    );
    return;
  }

  const content = fs.readFileSync(releasesPath, "utf-8");
  if (!/^##\s+Unreleased\s*$/m.test(content)) {
    reportError(
      releasesPath,
      0,
      "Release Notes: RELEASES.md is missing an Unreleased section.",
      "Add a `## Unreleased` section for pending downstream changes.",
    );
  }
}

function validateDownstreamImpactNotes(explicitFiles, options = {}) {
  const candidateFiles =
    explicitFiles.length > 0
      ? explicitFiles.map((file) =>
          path.relative(repoRoot, path.resolve(file)).split(path.sep).join("/"),
        )
      : getGitChangedFiles(options);

  const downstreamPrefixes = ["framework/", ".agent/skills/harnessing-agents/"];
  const hasDownstreamChange = candidateFiles.some((file) =>
    downstreamPrefixes.some((prefix) => file.startsWith(prefix)),
  );
  if (!hasDownstreamChange) return;

  const releasesTouched = candidateFiles.includes("RELEASES.md");
  if (!releasesTouched) {
    reportError(
      path.join(repoRoot, "RELEASES.md"),
      0,
      "Downstream Impact: framework/ or .agent/skills/harnessing-agents/ changed without updating RELEASES.md.",
      "Update the `Unreleased` section in RELEASES.md with the downstream-facing impact of the change.",
    );
  }
}

function validateSkillVersionSync() {
  const packageJsonPath = path.join(repoRoot, "package.json");
  const skillPath = path.join(
    repoRoot,
    ".agent",
    "skills",
    "harnessing-agents",
    "SKILL.md",
  );

  if (!fs.existsSync(packageJsonPath)) {
    reportError(
      packageJsonPath,
      0,
      "Version Sync: package.json is missing.",
      "Restore package.json so the canonical HELab version can be read.",
    );
    return;
  }

  if (!fs.existsSync(skillPath)) {
    reportError(
      skillPath,
      0,
      "Version Sync: .agent/skills/harnessing-agents/SKILL.md is missing.",
      "Restore SKILL.md so downstream consumers have visible skill metadata.",
    );
    return;
  }

  let packageJson;
  try {
    packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
  } catch (error) {
    reportError(
      packageJsonPath,
      0,
      `Version Sync: package.json is invalid JSON (${error.message}).`,
      "Fix package.json so the canonical HELab version can be parsed.",
    );
    return;
  }

  const rootVersion = packageJson.version;
  if (!rootVersion || typeof rootVersion !== "string") {
    reportError(
      packageJsonPath,
      0,
      "Version Sync: package.json is missing a string version field.",
      "Add a canonical root version string to package.json.",
    );
    return;
  }

  const skillContent = fs.readFileSync(skillPath, "utf-8");
  const skillVersion = extractSkillVersion(skillContent);
  if (!skillVersion) {
    reportError(
      skillPath,
      0,
      "Version Sync: SKILL.md frontmatter is missing a version field.",
      "Add a version field and sync it from package.json.",
    );
    return;
  }

  if (skillVersion !== rootVersion) {
    reportError(
      skillPath,
      0,
      `Version Sync: SKILL.md version "${skillVersion}" does not match package.json version "${rootVersion}".`,
      "Run `npm run sync:skill-version` to mirror the canonical HELab version into the skill metadata.",
    );
  }
}

function validateReviewLedger() {
  const reviewsPath = path.join(repoRoot, "REVIEWS.md");
  if (!fs.existsSync(reviewsPath)) {
    reportError(
      reviewsPath,
      0,
      "Review Ledger: REVIEWS.md is missing.",
      "Create REVIEWS.md with a machine-readable JSON ledger of review records.",
    );
    return;
  }

  const content = fs.readFileSync(reviewsPath, "utf-8");
  const jsonBlock = extractJsonCodeBlock(content);
  if (!jsonBlock) {
    reportError(
      reviewsPath,
      0,
      "Review Ledger: missing JSON code block.",
      "Add a ```json block containing the canonical review ledger.",
    );
    return;
  }

  let parsed;
  try {
    parsed = JSON.parse(jsonBlock);
  } catch (error) {
    reportError(
      reviewsPath,
      0,
      `Review Ledger: invalid JSON (${error.message}).`,
      "Fix REVIEWS.md so the review ledger JSON parses cleanly.",
    );
    return;
  }

  const reviews = Array.isArray(parsed) ? parsed : parsed.reviews;
  if (!Array.isArray(reviews)) {
    reportError(
      reviewsPath,
      0,
      "Review Ledger: reviews must be an array.",
      "Store review records in a top-level `reviews` array.",
    );
    return;
  }

  reviews.forEach((review, index) => {
    const entryLine = index + 1;
    if (!review || typeof review !== "object") {
      reportError(
        reviewsPath,
        entryLine,
        "Review Ledger: entry is not an object.",
        "Each review record must be a JSON object.",
      );
      return;
    }

    const {
      id,
      date,
      status,
      generator,
      reviewer,
      review_type: reviewType,
      requirement_ids: requirementIdList,
      scope_paths: scopePaths,
      change_summary: changeSummary,
      findings,
    } = review;

    if (!id || typeof id !== "string") {
      reportError(
        reviewsPath,
        entryLine,
        "Review Ledger: entry missing string id.",
        'Add a unique review id such as "HE-REV-2026-04-09-001".',
      );
      return;
    }
    if (reviewIds.has(id)) {
      reportError(
        reviewsPath,
        entryLine,
        `Review Ledger: duplicate id "${id}".`,
        "Ensure each review id is unique.",
      );
    }
    reviewIds.add(id);

    if (typeof date !== "string" || date.trim() === "") {
      reportError(
        reviewsPath,
        entryLine,
        `Review Ledger: review "${id}" missing date.`,
        'Add an ISO date string such as "2026-04-09".',
      );
    }
    if (!status || typeof status !== "string") {
      reportError(
        reviewsPath,
        entryLine,
        `Review Ledger: review "${id}" missing status.`,
        'Add a review status such as "approved" or "approved-with-findings".',
      );
    }
    if (typeof generator !== "string" || generator.trim() === "") {
      reportError(
        reviewsPath,
        entryLine,
        `Review Ledger: review "${id}" missing generator.`,
        "Record the implementation identity for the change.",
      );
    }
    if (typeof reviewer !== "string" || reviewer.trim() === "") {
      reportError(
        reviewsPath,
        entryLine,
        `Review Ledger: review "${id}" missing reviewer.`,
        "Record the independent reviewer identity.",
      );
    }
    if (typeof reviewType !== "string" || reviewType.trim() === "") {
      reportError(
        reviewsPath,
        entryLine,
        `Review Ledger: review "${id}" missing review_type.`,
        "Record whether the reviewer was an agent or human.",
      );
    }
    if (!Array.isArray(requirementIdList) || requirementIdList.length === 0) {
      reportError(
        reviewsPath,
        entryLine,
        `Review Ledger: review "${id}" missing requirement_ids.`,
        'Reference one or more requirement IDs such as "HE-R007".',
      );
    }
    if (!Array.isArray(scopePaths) || scopePaths.length === 0) {
      reportError(
        reviewsPath,
        entryLine,
        `Review Ledger: review "${id}" missing scope_paths.`,
        "List the reviewed files or directories in scope_paths.",
      );
    }
    if (typeof changeSummary !== "string" || changeSummary.trim() === "") {
      reportError(
        reviewsPath,
        entryLine,
        `Review Ledger: review "${id}" missing change_summary.`,
        "Summarize what the reviewer approved.",
      );
    }
    if (!Array.isArray(findings)) {
      reportError(
        reviewsPath,
        entryLine,
        `Review Ledger: review "${id}" findings must be an array.`,
        "Use an empty array when the reviewer found no issues.",
      );
    }

    if (Array.isArray(scopePaths)) {
      scopePaths.forEach((scopeEntry) => {
        if (typeof scopeEntry !== "string" || scopeEntry.trim() === "") {
          reportError(
            reviewsPath,
            entryLine,
            `Review Ledger: review "${id}" contains an empty scope_paths entry.`,
            "Each scope_paths entry must be a non-empty file or directory path.",
          );
          return;
        }

        const normalizedScope = normalizeRelativePath(scopeEntry.trim());
        const scopePath = path.join(
          repoRoot,
          normalizedScope.replace(/\/$/, ""),
        );
        if (!fs.existsSync(scopePath)) {
          reportError(
            reviewsPath,
            entryLine,
            `Review Ledger: review "${id}" references missing scope path "${normalizedScope}".`,
            "Use existing repository files or directories in scope_paths.",
          );
          return;
        }

        if (
          fs.statSync(scopePath).isDirectory() &&
          !normalizedScope.endsWith("/")
        ) {
          reportError(
            reviewsPath,
            entryLine,
            `Review Ledger: review "${id}" directory scope "${normalizedScope}" must end with "/".`,
            "Use trailing slashes for directory scope entries so coverage checks stay deterministic.",
          );
        }
      });
    }

    if (
      typeof generator === "string" &&
      typeof reviewer === "string" &&
      generator.trim() !== "" &&
      generator.trim() === reviewer.trim()
    ) {
      reportError(
        reviewsPath,
        entryLine,
        `Review Ledger: review "${id}" uses the same identity for generator and reviewer.`,
        "Record a separate reviewer identity to preserve generator/evaluator separation.",
      );
    }

    if (Array.isArray(requirementIdList)) {
      requirementIdList.forEach((requirementId) => {
        if (!requirementIds.has(requirementId)) {
          reportError(
            reviewsPath,
            entryLine,
            `Review Ledger: review "${id}" references unknown requirement ID "${requirementId}".`,
            "Add the requirement to REQUIREMENTS.md or fix the referenced ID.",
          );
        }
      });
    }

    reviewRecords.push(review);
  });
}

function validateIndependentReviewCoverage(explicitFiles, options = {}) {
  const candidateFiles =
    explicitFiles.length > 0
      ? explicitFiles.map((file) =>
          normalizeRelativePath(path.relative(repoRoot, path.resolve(file))),
        )
      : getGitChangedFiles(options).map(normalizeRelativePath);

  const reviewRequiredFiles = candidateFiles.filter(isReviewRequiredPath);
  if (reviewRequiredFiles.length === 0) return;

  if (!candidateFiles.includes("REVIEWS.md")) {
    reportError(
      path.join(repoRoot, "REVIEWS.md"),
      0,
      "Independent Review: review-required surfaces changed without updating REVIEWS.md.",
      "Add an approving review record in REVIEWS.md that covers the changed files before merging.",
    );
    return;
  }

  const approvedStatuses = new Set(["approved", "approved-with-findings"]);
  const approvedReviews = reviewRecords.filter((review) =>
    approvedStatuses.has(review.status),
  );
  if (approvedReviews.length === 0) {
    reportError(
      path.join(repoRoot, "REVIEWS.md"),
      0,
      "Independent Review: no approving review record found for the current change.",
      "Add an `approved` or `approved-with-findings` record to REVIEWS.md before merging review-required changes.",
    );
    return;
  }

  const uncoveredFiles = reviewRequiredFiles.filter((filePath) => {
    return !approvedReviews.some(
      (review) =>
        Array.isArray(review.scope_paths) &&
        review.scope_paths.some((scopeEntry) =>
          scopeEntryMatchesPath(scopeEntry, filePath),
        ),
    );
  });

  if (uncoveredFiles.length > 0) {
    reportError(
      path.join(repoRoot, "REVIEWS.md"),
      0,
      `Independent Review: no approving review record covers ${uncoveredFiles.join(", ")}.`,
      "Expand scope_paths in REVIEWS.md so the approving review explicitly covers every changed review-required surface.",
    );
  }
}

function validateRequirementsLedger() {
  const requirementsPath = path.join(repoRoot, "REQUIREMENTS.md");
  if (!fs.existsSync(requirementsPath)) {
    reportError(
      requirementsPath,
      0,
      "Requirements Ledger: REQUIREMENTS.md is missing.",
      "Create REQUIREMENTS.md with a machine-readable JSON ledger of active requirements.",
    );
    return;
  }

  const content = fs.readFileSync(requirementsPath, "utf-8");
  const jsonBlock = extractJsonCodeBlock(content);
  if (!jsonBlock) {
    reportError(
      requirementsPath,
      0,
      "Requirements Ledger: missing JSON code block.",
      "Add a ```json block containing the canonical requirements ledger.",
    );
    return;
  }

  let parsed;
  try {
    parsed = JSON.parse(jsonBlock);
  } catch (error) {
    reportError(
      requirementsPath,
      0,
      `Requirements Ledger: invalid JSON (${error.message}).`,
      "Fix REQUIREMENTS.md so the ledger JSON parses cleanly.",
    );
    return;
  }

  const requirements = Array.isArray(parsed) ? parsed : parsed.requirements;
  if (!Array.isArray(requirements) || requirements.length === 0) {
    reportError(
      requirementsPath,
      0,
      "Requirements Ledger: no requirement entries found.",
      "Define at least one requirement entry with id, title, narrative, acceptance_criteria, status, and source.",
    );
    return;
  }

  requirements.forEach((requirement, index) => {
    const entryLine = index + 1;
    if (!requirement || typeof requirement !== "object") {
      reportError(
        requirementsPath,
        entryLine,
        "Requirements Ledger: entry is not an object.",
        "Each requirement must be a JSON object.",
      );
      return;
    }

    const {
      id,
      title,
      narrative,
      acceptance_criteria: acceptanceCriteria,
      status,
      source,
    } = requirement;
    if (!id || typeof id !== "string") {
      reportError(
        requirementsPath,
        entryLine,
        "Requirements Ledger: entry missing string id.",
        'Add a unique string id such as "HE-R001".',
      );
      return;
    }
    if (requirementIds.has(id)) {
      reportError(
        requirementsPath,
        entryLine,
        `Requirements Ledger: duplicate id "${id}".`,
        "Ensure each requirement id is unique.",
      );
    }
    requirementIds.add(id);

    if (!title || typeof title !== "string") {
      reportError(
        requirementsPath,
        entryLine,
        `Requirements Ledger: requirement "${id}" missing title.`,
        "Add a human-readable title.",
      );
    }
    if (!narrative || typeof narrative !== "string") {
      reportError(
        requirementsPath,
        entryLine,
        `Requirements Ledger: requirement "${id}" missing narrative.`,
        "Add a narrative describing the requirement.",
      );
    }
    if (!Array.isArray(acceptanceCriteria) || acceptanceCriteria.length === 0) {
      reportError(
        requirementsPath,
        entryLine,
        `Requirements Ledger: requirement "${id}" missing acceptance_criteria array.`,
        "Add at least one acceptance criterion for the requirement.",
      );
    }
    if (!status || typeof status !== "string") {
      reportError(
        requirementsPath,
        entryLine,
        `Requirements Ledger: requirement "${id}" missing status.`,
        'Add a string status such as "active".',
      );
    }
    if (!source || typeof source !== "string") {
      reportError(
        requirementsPath,
        entryLine,
        `Requirements Ledger: requirement "${id}" missing source.`,
        "Add a source string describing where the requirement came from.",
      );
    }
  });
}

function validatePlanRequirementIds() {
  const plansPath = path.join(repoRoot, "PLANS.md");
  if (!fs.existsSync(plansPath)) return;

  const lines = fs.readFileSync(plansPath, "utf-8").split("\n");
  const activeHeaderIndex = lines.findIndex(
    (line) => line.trim() === "## Active Plans",
  );
  if (activeHeaderIndex === -1) return;

  let activeSectionEnd = lines.length;
  for (let index = activeHeaderIndex + 1; index < lines.length; index += 1) {
    if (/^##\s+/.test(lines[index])) {
      activeSectionEnd = index;
      break;
    }
  }

  const activeSection = lines.slice(activeHeaderIndex + 1, activeSectionEnd);
  if (activeSection.some((line) => line.includes("_No active plans._"))) return;

  const plans = [];
  let currentPlan = null;
  activeSection.forEach((line, offset) => {
    const lineNum = activeHeaderIndex + 2 + offset;
    if (line.startsWith("### Plan:")) {
      if (currentPlan) plans.push(currentPlan);
      currentPlan = {
        title: line.replace("### Plan:", "").trim(),
        lineNum,
        lines: [],
      };
      return;
    }
    if (currentPlan) currentPlan.lines.push({ text: line, lineNum });
  });
  if (currentPlan) plans.push(currentPlan);

  plans.forEach((plan) => {
    const requirementLine = plan.lines.find((entry) =>
      entry.text.includes("**Requirement IDs:**"),
    );
    if (!requirementLine) {
      reportError(
        plansPath,
        plan.lineNum,
        `Requirements Gate: active plan "${plan.title}" is missing a Requirement IDs field.`,
        'Add a "- **Requirement IDs:** `...`" line referencing REQUIREMENTS.md entries.',
      );
      return;
    }

    const ids = Array.from(requirementLine.text.matchAll(/`([^`]+)`/g)).map(
      (match) => match[1],
    );
    if (ids.length === 0) {
      reportError(
        plansPath,
        requirementLine.lineNum,
        `Requirements Gate: active plan "${plan.title}" has no backticked requirement IDs.`,
        "List one or more requirement IDs such as `HE-R003`.",
      );
      return;
    }

    ids.forEach((id) => {
      if (!requirementIds.has(id)) {
        reportError(
          plansPath,
          requirementLine.lineNum,
          `Requirements Gate: active plan "${plan.title}" references unknown requirement ID "${id}".`,
          "Add the requirement to REQUIREMENTS.md or fix the referenced ID.",
        );
      }
    });
  });
}

let hasErrors = false;

function reportError(filePath, lineNum, message, fix) {
  hasErrors = true;
  console.error(
    `\x1b[31m[HE-LINT]\x1b[0m ${path.basename(filePath)}:${lineNum > 0 ? lineNum : "ALL"} -> ${message}`,
  );
  if (fix) {
    console.error(`  \x1b[33m\u21b3 Fix:\x1b[0m ${fix}`);
  }
}

function scanFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n");
  const basename = path.basename(filePath);

  lines.forEach((line, index) => {
    const lineNum = index + 1;

    // 1. Generic Number Bias Check
    // Detects any double-digit number of features that isn't exactly a valid count (ignoring single digits like Pillar 1).
    const countRegex = /\b((?:1[0-9]|[2-9][0-9]+))\s+(?:core\s+)?features\b/gi;
    let match;
    while ((match = countRegex.exec(line)) !== null) {
      if (match[1] !== "32") {
        reportError(
          filePath,
          lineNum,
          `Number Bias: Detected "${match[0]}" instead of the canonical 32.`,
          'Update to "32 core features" (11 Foundation + 12 P1 + 5 P2 + 4 P3). See: framework/HE Index.md',
        );
      }
    }

    // 2. Generic ID Validation
    // Validates that extracted IDs fit logical constraints (P0-1 to P0-11, P1-1 to P1-12, P2-1 to P2-5, P3-1 to P3-4)
    const idRegex = /\b(P\d+(?:-\d+)?|EP-\d+)\b/g;
    let idMatch;
    while ((idMatch = idRegex.exec(line)) !== null) {
      const id = idMatch[1];
      let invalid = false;
      const parts = id.split("-");
      if (parts.length === 2) {
        const pillar = parseInt(parts[0].replace("P", ""), 10);
        const num = parseInt(parts[1], 10);
        if (pillar === 0 && (num < 1 || num > 11)) invalid = true;
        if (pillar === 1 && (num < 1 || num > 12)) invalid = true;
        if (pillar === 2 && (num < 1 || num > 5)) invalid = true;
        if (pillar === 3 && (num < 1 || num > 4)) invalid = true;
        if (pillar < 0 || pillar > 3) invalid = true;
      } else {
        // just P0, P1, P2, P3 is valid
        const pillar = parseInt(id.replace("P", ""), 10);
        if (pillar < 0 || pillar > 3) invalid = true;
      }

      // New check: No leading zeros allowed in IDs (e.g. P0-01 is forbidden, use P0-1)
      // We exclude cases where the ID is part of a filename (e.g. P0-01.md)
      const isFilename =
        line.slice(idMatch.index + id.length).startsWith(".md") ||
        line.slice(idMatch.index + id.length).startsWith(".json");

      if (id.includes("-0") && !isFilename) {
        reportError(
          filePath,
          lineNum,
          `ID Format Violation: Leading zero detected in "${id}".`,
          `Remove leading zero per v3.3.1 standard (e.g., "${id.replace("-0", "-")}" instead of "${id}").`,
        );
      }

      if (invalid) {
        reportError(
          filePath,
          lineNum,
          `Invalid Feature ID constraint: "${id}" is out of bounds.`,
          "Valid IDs are P0-1..P0-11, P1-1..P1-12, P2-1..P2-5, P3-1..P3-4. See: framework/HE Index.md",
        );
      }
    }

    // 3. Pillar Label Integrity Check
    // Section headings that label a Pillar must use the canonical verb annotation.
    const pillarLabelChecks = [
      {
        regex: /^#+\s+(?:Foundation[:\s]+)?Infrastructure\s*$/,
        canonical: "Foundation: Infrastructure (Execute)",
      },
      {
        regex: /^#+\s+(?:Pillar\s+1[:\s]+)?Context\s+Engineering\s*$/,
        canonical: "Context Engineering (Inform)",
      },
      {
        regex: /^#+\s+(?:Pillar\s+2[:\s]+)?Architectural\s+Constraints\s*$/,
        canonical: "Architectural Constraints (Constrain)",
      },
      {
        regex: /^#+\s+(?:Pillar\s+3[:\s]+)?Entropy\s+Management\s*$/,
        canonical: "Entropy Management (Maintain)",
      },
    ];
    pillarLabelChecks.forEach(({ regex, canonical }) => {
      if (regex.test(line)) {
        reportError(
          filePath,
          lineNum,
          `Pillar Label: Heading uses unlabelled pillar name.`,
          `Use canonical label "${canonical}". See: framework/HE Index.md`,
        );
      }
    });
  });

  // 4. Generic Orphan Concept Check
  // Check against our dynamically extracted anchors Map.
  anchorsMap.forEach((sourceDoc, concept) => {
    // Escape concept for regex
    const escapedConcept = concept.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const conceptRegex = new RegExp(`\\b${escapedConcept}\\b`, "gi");

    // Skip checking if the file is the source doc itself
    if (basename === sourceDoc) return;

    // If concept is used, ensure the source doc is referenced SOMEWHERE in the file.
    if (conceptRegex.test(content) && !content.includes(sourceDoc)) {
      // Exclude generic terms that might overlap (like "Context Compaction" vs "Context")
      if (concept.split(" ").length > 1) {
        reportError(
          filePath,
          0,
          `Orphan Concept Gap: Mentions dynamic concept "${concept}" but fails to link back to canonical source: ${sourceDoc}`,
          `Add a markdown reference link to "${sourceDoc}" in this file, or remove the concept mention.`,
        );
      }
    }
  });
}

function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (!fullPath.includes("node_modules") && !fullPath.includes(".git")) {
        walkDir(fullPath);
      }
    } else if (fullPath.endsWith(".md")) {
      scanFile(fullPath);
    }
  });
}

function run() {
  console.log("Running Generic HE Validations...");
  buildDynamicRegistries();

  // Always validate DAG structure
  validateDAGStructure();
  validateFeatureChainFiles();
  validateNoDuplicateSections();
  validateNoDuplicateDeclarations();
  validateMeasurementRegistry();
  validateGraphReconciliation();
  validateMeasurementOperationalDefinitions();
  validateMachineReadableSchemaBindings();
  validatePreventionRuleBindings();
  validateRequirementsLedger();
  validateReviewLedger();
  validatePlanRequirementIds();
  validateSkillVersionSync();
  validateSkillFrameworkBundle();
  validateReleaseNotesSurface();

  const args = process.argv.slice(2).filter((a) => a !== "--all");
  const allMode = process.argv.includes("--all");
  const includeWorkingTree = process.argv.includes("--include-working-tree");
  const changeDetectionOptions = { includeWorkingTree };
  validateDownstreamImpactNotes(args, changeDetectionOptions);
  validateIndependentReviewCoverage(args, changeDetectionOptions);
  if (args.length > 0 && !allMode) {
    // Run only on provided files (lint-staged)
    args.forEach((file) => {
      if (file.endsWith(".md")) scanFile(path.resolve(file));
    });
  } else {
    // Run globally on the active framework, skill, and harness surface only.
    const DIRS_TO_SCAN = [
      "framework",
      ".agent/workflows",
      ".agent/skills/harnessing-agents",
    ];
    DIRS_TO_SCAN.forEach((dir) => {
      walkDir(path.join(repoRoot, dir));
    });
    [
      "README.md",
      "AGENTS.md",
      "ANCHORS.md",
      "CLAUDE.md",
      "PLANS.md",
      "REQUIREMENTS.md",
      "RELEASES.md",
      "REVIEWS.md",
    ].forEach((file) => scanFile(path.join(repoRoot, file)));
  }

  if (hasErrors) {
    console.error(
      `\x1b[31m[FAILED]\x1b[0m HE Validation failed on strict logical rule constraints.`,
    );
    process.exit(1);
  } else {
    console.log(`\x1b[32m[SUCCESS]\x1b[0m Generic HE Rules passed.`);
    process.exit(0);
  }
}

run();
