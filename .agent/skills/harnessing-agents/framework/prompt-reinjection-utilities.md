# Prompt Reinjection Utilities

This file provides utilities for P0-4 Ralph Loops prompt reinjection with state summaries.

## State Serialization Schema

Task state must follow this JSON schema for cross-window persistence:

```json
{
  "taskId": "string",
  "taskDescription": "string",
  "completedSteps": 0,
  "totalSteps": 0,
  "currentStep": "string",
  "contextSummary": "string",
  "nextAction": "string",
  "reinjectionCount": 0,
  "maxReinjections": 3
}
```

## Reinjection Prompt Template

When reinjecting after context reset:

```text
You are continuing a long-running task that was interrupted. Here is the current state:

Task: {taskDescription}
Progress: {completedSteps}/{totalSteps} steps completed
Current Step: {currentStep}
Context Summary: {contextSummary}
Next Action: {nextAction}

Reinjection #{reinjectionCount} of {maxReinjections}

Continue from where you left off. Do not restart the entire task.
```

## Usage

1. Serialize state to `.harness/task-state.json` before context window exhaustion
2. On reinjection, load state and generate prompt using the template above
3. Update completedSteps and reinjectionCount after each successful step
4. Stop after maxReinjections to prevent infinite loops
