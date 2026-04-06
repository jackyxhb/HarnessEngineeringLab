# Harness Dimensions

## 4 Scoping Dimensions

These four dimensions define the scope and complexity of the entire harness audit:

1. **Feature Tree:** Systematically walking the 4 core areas → 32 features → Actions/Tools tree.
2. **Agent Scale:** Determining if the system is a single agent (SAS), small team (2–5 agents), or enterprise swarm (MAS). MAS-specific checks and SAS→MAS Readiness perspectives apply heavily depending on this scope.
3. **Project Complexity:** Categorizing the target project as pure text/docs, scripted ops, simple app, complex system, or enterprise platform to adapt the depth of the audit.
4. **Remediation Level:** Classifying execution strategies as Light (meta-docs), Medium (features), or Heavy (architecture) when formulating the implementation plan.

## 6 Evaluation Dimensions

These are the lenses used to score individual features inside `references/he-scoring.md`. They are strictly for *gap analysis* (not scoping the audit). Each dimension maps to a level in the Principle-to-Practice Chain (see `framework/HE Principle Map.md`).

1. **Implementation Maturity** (→ L4 Actions & Tools): How fully built is this feature?
2. **Operational Effectiveness** (→ L5 Measurable Outcomes): Does the feature actually work in practice?
3. **Risk Exposure** (→ L2 inverse, Enhancement at risk): What breaks if this feature is absent or weak?
4. **Cost-Efficiency** (→ L4 Action proportionality): Is the investment proportional to the value?
5. **Scalability** (→ L3 Design Decisions): Will this feature survive scaling from SAS to MAS?
6. **Human Role Evolution** (→ L2 Enhancement trajectory): Does this feature shift humans from writing code to designing systems?
