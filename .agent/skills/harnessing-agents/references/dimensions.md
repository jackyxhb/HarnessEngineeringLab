# Harness Dimensions

## 4 Scoping Dimensions

These four dimensions define the scope and complexity of the entire harness audit:

1. **Feature Tree:** Systematically walking the 4 core areas → 25 features → Actions/Tools tree.
2. **Agent Scale:** Determining if the system is a single agent (SAS), small team (2–5 agents), or enterprise swarm (MAS). MAS-specific checks and SAS→MAS Readiness perspectives apply heavily depending on this scope.
3. **Project Complexity:** Categorizing the target project as pure text/docs, scripted ops, simple app, complex system, or enterprise platform to adapt the depth of the audit.
4. **Remediation Level:** Classifying execution strategies as Light (meta-docs), Medium (features), or Heavy (architecture) when formulating the implementation plan.

## 6 Evaluation Dimensions

These are the lenses used to score individual features inside `references/gap-scoring.md`. They are strictly for *gap analysis* (not scoping the audit).

1. **Implementation Maturity:** How fully built is this feature?
2. **Operational Effectiveness:** Does the feature actually work in practice?
3. **Risk Exposure:** What breaks if this feature is absent or weak?
4. **Cost-Efficiency:** Is the investment proportional to the value?
5. **Scalability:** Will this feature survive scaling from SAS to MAS?
6. **Human Role Evolution:** Does this feature shift humans from writing code to designing systems?
