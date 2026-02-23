# Harness Engineering Meta Docs Requirements

Based on the core principles of Harness Engineering (as explored by OpenAI and Thoughtworks/Martin Fowler), the initial meta documentation for a brand new project should establish the tooling, constraints, and feedback loops necessary to safely and effectively leverage AI agents (like Codex/LLMs) for application maintenance and generation.

The meta docs should cover the following essential elements and requirements:

## 1. Context Engineering & Knowledge Base

The meta docs must define how an AI agent acquires context about the project.

* **Project Context Providers**: Outline how agents will access structural metadata, observability data, and runtime context.
* **Living Documentation**: Establish rules for maintaining documentation as code that agents can easily parse and update.
* **Dynamic Capabilities**: Specify any agentic integrations, such as the ability to browse the application, execute tests, or query logs to build context autonomously.

## 2. Architectural Constraints & Guardrails

To trust AI-generated code at scale, the solution space must be constrained. The docs should define strict "AI-friendly" boundaries.

* **Supported Tech Stack & Topology**: Define the specific runtime, framework, and architectural patterns (e.g., restricted "golden paths") carefully chosen for AI maintainability over human preference.
* **Deterministic Rule Enforcement**: Document the custom linters, static analysis tools, and structural testing frameworks (e.g., ArchUnit) used to continuously enforce architectural integrity.
* **Boundary Contracts**: Enforce rigid data shapes and strict module boundaries that the AI must adhere to and parse.

## 3. Feedback Loops & "Garbage Collection"

The meta docs must describe the processes for continuous self-correction and fighting decay.

* **Iterative Correction**: Define the workflow for when an AI agent fails or struggles. Instead of a human fixing the code directly, the human should identify what context, rule, or tool is missing, feed it back to the harness, and have the agent write the fix.
* **Entropy Management (Garbage Collection)**: Outline scheduled agent tasks designed to detect and prune dead code, fix documentation inconsistencies, and resolve low-level architectural violations.

## 4. Harness/Service Templates

The docs should serve as or define the "Service Template" for AI.

* **Bootstrapping**: Provide the foundational structure, pre-configured hooks (e.g., pre-commit restrictions), structural tests, and basic context docs needed to initialize a new AI-harnessed service.
* **Evolution**: Establish guidelines on how the harness itself evolves alongside the codebase as new AI capabilities or constraints emerge.

## 5. Verification & Behavior Validation

While the OpenAI article focuses heavily on structural quality, functional verification is critical.

* **Testing Strategy**: Define the expectation for automated test generation to prove behavioral correctness, ensuring that human trust in the AI's output is grounded in verifiable test results.

## 6. Dynamic Agent Workflows & Pipelines

The repository must define the active, automated processes that manage the codebase without human intervention.

* **"Zero Human-Written Code" Pipeline**: Enforce a workflow rule where humans cannot push code directly. All implementation must go through an automated agent pipeline.
* **Automated Review Cycles**: Establish protocols where agents review their own changes, request feedback from specialized reviewer agents, and iterate autonomously until all agent reviewers are satisfied.
* **Continuous Refactoring**: Implement workflows for continuous code and architecture refinement (e.g., automated architectural migrations) to prevent technical debt from accumulating.

## 7. Agent Personas & Human Roles

The meta docs must define the specific roles within the "Agent-First" ecosystem.

* **Agent Personas**: Define the distinct identities and responsibilities of the AI agents.
  * **Implementation Agent**: Translates high-level human intent into concrete code and tests.
  * **Reviewer Agent**: Critiques generated code against architectural rules, style guides, and security standards.
  * **Garbage Collector / Entropy Agent**: Scours the codebase for unused code, documentation drift, and structural violations.
* **The "Environment Designer" (Human Role)**: Redefine the human engineer's role. Humans are responsible for:
  * Providing high-level intent and requirements.
  * Designing the "harness" (creating tools, establishing guardrails, writing legible documentation).
  * Observing agent friction and adjusting the environment (not fixing the code directly) to ensure agent success.
