# Theory vs Practice

> _Canonical framework: `framework/HE Design Decisions.md` | Landing pathway: `research/Harness Landing Pathway.md`_

In general, **AI Agent Harness Engineering** is the theoretical design of the infrastructure—the constraints, context delivery, verification tools, and feedback loops—that channels an AI model's power so it can complete useful work instead of acting unpredictably. It focuses on the core pillars of providing the agent with durable memory (filesystems), execution environments (sandboxes), and automated guardrails (linters and tests).

When this discipline is **landed in a real project**, it transforms from theoretical infrastructure into highly specific, automated workflows that completely redefine the daily job of a software engineer. Rather than manually writing code, engineers focus on systems thinking, specifying intent, and orchestrating these environments.

Here is how harness engineering differs in practice, based on real-world projects:

## **Total Automation of the Execution Pipeline (Stripe's Approach):**

In practice, a production harness handles the entire lifecycle of a task. Stripe uses internal coding agents called "Minions" that produce **over 1,000 merged pull requests per week**. The developer simply posts a task in Slack, and the harness takes over—the agent writes the code, the harness runs it through CI validation, and the agent opens a pull request. Zero human interaction occurs between task assignment and the final PR review.

## **Zero Human Code Generation (OpenAI's Approach):**

In a real project, the harness can become so robust that humans stop writing code entirely. OpenAI built a production application featuring **over 1 million lines of code in 5 months where zero lines were written by humans**. The engineers' primary jobs shifted to designing the architecture, building the harness, and writing critical, machine-readable documentation.

## **Modular Middleware Design (LangChain's Approach):**

Rather than building a single monolithic script to control an agent, real-world harnesses are often built as **composable middleware layers**. Each layer adds a specific capability (like tracking repeated file edits to prevent "doom loops") without modifying the core agent logic, making the system easy to test and evolve.

## **Repository-First Documentation & Incremental Building (NxCode's Approach):**

In real projects, teams must forcefully abandon traditional human knowledge-sharing. **Everything the agent needs must be in the repository**; knowledge hidden in Slack or Google Docs means the agent will fail. Furthermore, real projects don't start with perfect harnesses. They utilize **incremental constraint building**—starting with basic linting and adding complex architectural constraints only as new patterns emerge.

## **Model Agnosticism:**

Real-world harnesses are designed to be "rippable" and multi-provider. Because underlying AI models improve rapidly, a complex harness built today might break tomorrow. Teams build harnesses that can easily swap between models (like Claude, GPT, or Gemini) so they aren't locked into a single ecosystem.

Ultimately, the difference is that **general harness engineering** is about giving an AI the _ability_ to work, while a **real-world harness** is a highly tuned production factory where the AI acts as an autonomous contributor and the human acts as the system architect and reviewer.
