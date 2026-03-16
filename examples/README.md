# Example Solutions

This folder contains **example solutions** for the workshop exercises. Use these as reference — your own files should reflect your role and how you'd actually use Copilot.

## Contents

### Instructions Files (Exercise 3 examples)

#### Repo-Level Instructions

These go in `.github/copilot-instructions.md` and apply to every Copilot interaction in the repo.

| File | For Role |
|------|----------|
| [copilot-instructions-developer.md](instructions/copilot-instructions-developer.md) | Developer |
| [copilot-instructions-pm.md](instructions/copilot-instructions-pm.md) | Project/Product Manager |
| [copilot-instructions-dba.md](instructions/copilot-instructions-dba.md) | DBA |
| [copilot-instructions-techwriter.md](instructions/copilot-instructions-techwriter.md) | Tech Writer |
| [copilot-instructions-manager.md](instructions/copilot-instructions-manager.md) | Manager |

#### Scoped Instructions

These use `applyTo` front matter to auto-apply when working on matching files.

| File | `applyTo` | For Role |
|------|-----------|----------|
| [docs-instructions.md](instructions/docs-instructions.md) | `docs/**/*.md` | Tech Writer |
| [sql-instructions.md](instructions/sql-instructions.md) | `sql/**/*.sql` | DBA |
| [src-instructions.md](instructions/src-instructions.md) | `src/**/*.ts` | Developer |
| [reports-instructions.md](instructions/reports-instructions.md) | `reports/**` | PM |
| [reviews-instructions.md](instructions/reviews-instructions.md) | `reviews/**` | Manager |

### Prompt Files (Exercise 4 examples)

| File | For Role |
|------|----------|
| [sprint-summary.prompt.md](prompts/sprint-summary.prompt.md) | Project Manager |
| [code-review.prompt.md](prompts/code-review.prompt.md) | Developer |
| [query-review.prompt.md](prompts/query-review.prompt.md) | DBA |
| [api-docs.prompt.md](prompts/api-docs.prompt.md) | Tech Writer |
| [team-update.prompt.md](prompts/team-update.prompt.md) | Manager |
| [feature-spec.prompt.md](prompts/feature-spec.prompt.md) | Product Manager |

### Chat Modes (Block 4 examples)

| File | Persona |
|------|---------|
| [developer.chatmode.md](chatmodes/developer.chatmode.md) | Developer |
| [pm.chatmode.md](chatmodes/pm.chatmode.md) | Project Manager |
| [tech-writer.chatmode.md](chatmodes/tech-writer.chatmode.md) | Technical Writer |
| [dba.chatmode.md](chatmodes/dba.chatmode.md) | DBA Assistant |
| [manager.chatmode.md](chatmodes/manager.chatmode.md) | Engineering Manager |

## How to Use These

1. **Don't just copy-paste** — adapt them to your actual workflow
2. **Use them as starting points** — your version should be more specific to your team
3. **To deploy**: Copy the file to the proper location:
   - Repo instructions → `.github/copilot-instructions.md`
   - Scoped instructions → wherever the `applyTo` glob targets (e.g., `docs/.instructions.md`)
   - Prompt files → `.github/prompts/`
   - Chat modes → `.vscode/`
