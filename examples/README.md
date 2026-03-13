# Example Solutions

This folder contains **example solutions** for the workshop exercises. Use these as reference — your own files should reflect your role and how you'd actually use Copilot.

## Contents

### Instructions Files (Exercise 3 examples)

| File | Type | For Role |
|------|------|----------|
| [copilot-instructions-developer.md](instructions/copilot-instructions-developer.md) | Repo-level | Developer |
| [copilot-instructions-pm.md](instructions/copilot-instructions-pm.md) | Repo-level | Project/Product Manager |
| [copilot-instructions-dba.md](instructions/copilot-instructions-dba.md) | Repo-level | DBA |
| [docs-instructions.md](instructions/docs-instructions.md) | Scoped | Tech Writer |
| [sql-instructions.md](instructions/sql-instructions.md) | Scoped | DBA |
| [src-instructions.md](instructions/src-instructions.md) | Scoped | Developer |
| [reports-instructions.md](instructions/reports-instructions.md) | Scoped | PM / Manager |

### Prompt Files (Exercise 4 examples)

| File | For Role |
|------|----------|
| [sprint-summary.prompt.md](prompts/sprint-summary.prompt.md) | Project Manager |
| [code-review.prompt.md](prompts/code-review.prompt.md) | Developer |
| [query-review.prompt.md](prompts/query-review.prompt.md) | DBA |
| [api-docs.prompt.md](prompts/api-docs.prompt.md) | Tech Writer |
| [team-update.prompt.md](prompts/team-update.prompt.md) | Manager |

### Chat Modes (Block 4 bonus examples)

| File | Persona |
|------|---------|
| [tech-writer.chatmode.md](chatmodes/tech-writer.chatmode.md) | Technical Writer |
| [dba.chatmode.md](chatmodes/dba.chatmode.md) | DBA Assistant |

## How to Use These

1. **Don't just copy-paste** — adapt them to your actual workflow
2. **Use them as starting points** — your version should be more specific to your team
3. **To deploy**: Copy the file to the proper location:
   - Repo instructions → `.github/copilot-instructions.md`
   - Scoped instructions → wherever the `applyTo` glob targets (e.g., `docs/.instructions.md`)
   - Prompt files → `.github/prompts/`
   - Chat modes → `.vscode/`
