# CLAUDE.md

This file is the **Claude Code entry point** for this repository. All project rules live in [`AGENTS.md`](AGENTS.md) — read it before taking any action.

> **Directive:** Read `AGENTS.md` at session start. It contains the repository purpose, organizing framework, directory layout, workflows, available tools & commands, forbidden operations, and conventions. This file exists only as a Claude Code discovery shim per **P0-11 Portable Agent Surface** (see A8 in `ANCHORS.md`).

## Claude Code-Specific Notes

- Claude Code automatically loads `CLAUDE.md` at session start. No additional configuration is needed for rule discovery.
- Do not store project-wide rules in Claude Code memory files (`/memories/`). Memory files are invisible to agents running in VS Code, Cursor, or Windsurf. Store all portable rules in `AGENTS.md` instead.
- When adding new project rules, add them to `AGENTS.md`, not this file. This file should remain a thin shim.
