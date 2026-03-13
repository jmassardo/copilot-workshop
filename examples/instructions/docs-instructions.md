---
applyTo: "docs/**/*.md"
---

When writing or editing documentation in this project:

## Style Rules
- Use second person ("you") rather than third person ("the user")
- Write at a Grade 8 reading level — short sentences, common words
- One idea per sentence. Break long sentences into two.
- Use active voice: "Run the command" not "The command should be run"

## Structure
- Every doc starts with a level-1 heading matching the filename
- Follow this structure: Overview → Prerequisites → Steps → Troubleshooting
- Use numbered lists for sequential steps, bullet lists for options
- Include code examples for every API endpoint or concept discussed

## Formatting
- Use relative links for cross-references: `[API Reference](api-reference.md)`
- Code blocks specify the language: ```bash, ```json, ```sql, etc.
- Tables for comparing options or listing parameters
- Use > blockquotes for tips, warnings, and notes

## Content Rules
- Include a "Troubleshooting" section at the end of every guide
- Show both the command and its expected output
- Don't assume the reader knows the project — briefly explain context
- Keep total document length under 500 lines
