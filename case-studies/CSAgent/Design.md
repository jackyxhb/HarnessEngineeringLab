# SMS Customer Service Agent Design Document

> **Domain:** A small team using an iOS app to manage customer service via SMS, powered by an agent that autonomously handles standard queries and periodically learns from human interventions.

## 1. Architecture Overview

The system is designed as an **"Agent-First" On-Device Orchestrator**.

- **Placement:** The core agent logic runs within a dedicated iOS app (likely on an iPad or Mac "base station" that remains on).
- **Reasoning & Storage:** The app uses an on-device **Markdown File System** to store the Production Knowledge Base. Because the product knowledge is small (firm intro, history, services, marketing, contact info), it is stored as plain `.md` files. For heavy reasoning (intent extraction, drafting responses), it calls out to a Cloud LLM (e.g., OpenAI or Anthropic API).
- **Communication:** SMS delivery is handled natively via the iOS device's own capabilities (Messages framework or Shortcuts automation), eliminating recurring costs from third-party SMS APIs like Twilio.
- **Service History:** Chat logs are also saved as `.md` files, utilizing a filename convention (e.g., `+1234567890_2026-02-24.md`) to distinguish between different customer phone numbers and dates. This prevents massive, unmanageable monolithic history files.

## 2. Core Agent Loop

The primary agent workflow operates as a continuous pipeline triggered by inbound messages:

```text
1. INGEST        → Receive inbound SMS via Native iOS integration (e.g., automated Shortcut triggering an intent/deep link to the app).
2. RETRIEVE      → Pull recent `.md` chat history for that phone number and inject the core `.md` product knowledge files into the context prompt.
3. ANALYSE       → Call Cloud LLM to extract intent, determine tone, and calculate a "confidence score".
4. DRAFT & ACT   → Cloud LLM generates a proposed SMS reply based on the retrieved markdown context.
5. ROUTE         →
                   ↳ If High Confidence: Auto-route and send the SMS seamlessly via native APIs. Append to the daily `.md` chat log.
                   ↳ If Low Confidence: Route to the iOS App Escalation Queue for human review.
6. LEARN         → (Periodic) A scheduled local job analyzes human-corrected responses in the Escalation Queue and appends new learnings or rules to the relevant Production Knowledge `.md` files.
```

## 3. Repository & Component Structure

```text
project/
├── AGENTS.md                 ← Rules for the SMS Agent and the Periodic Learner Agent
├── App/                      ← SwiftUI iOS App
│   ├── Views/                ← Supervision dashboard (Escalation Queue, Markdown Editor)
│   ├── Models/               ← Domain models (SMSMessage, CustomerIntent, DocumentMetadata)
│   └── ViewModels/
├── Services/
│   ├── SMSIntegration/       ← Logic handling native iOS SMS sending/receiving
│   ├── LLMOrchestrator/      ← Manages API calls to Cloud LLMs with structured prompts
│   └── MarkdownStorage/      ← Service to read/write KB and partitioned chat history `.md` files
├── Data/
│   ├── Knowledge/            ← Core logic (firm-intro.md, services.md, contact.md)
│   └── ChatLogs/             ← Daily partitioned logs (e.g., +1234567890_2026-02-24.md)
├── Skills/
│   ├── extract-intent/       ← Prompts/logic for extracting intent
│   ├── draft-sms/            ← Prompts/logic for drafting concise SMS
│   └── synthesize-knowledge/ ← Prompts/logic for the periodic learning loop
└── Tests/
```

## 4. Taste Invariants (Quality Gates)

| Rule                     | Enforcement                                                                                                   |
| ------------------------ | ------------------------------------------------------------------------------------------------------------- |
| Privacy & Cost           | Maximize local processing where possible; batch LLM calls if needed.                                          |
| Zero Subscription SMS    | Must use native device plan for SMS.                                                                          |
| SMS Constraints          | Output must be concise (ideally <160 characters). Enforced by LLM prompt + local length check before sending. |
| Hallucination Prevention | Strict grounding to the retrieved Markdown files.                                                             |
| Graceful Escalation      | If frustrated intent is detected, force confidence score to 0 (escalate to human).                            |

## User Review Required

Please review this proposed design document. Does this architecture and structure align with your requirements? Are there any specific iOS frameworks (e.g., specific local vector DB choices, or specific methods for native SMS interception) you want to mandate?
