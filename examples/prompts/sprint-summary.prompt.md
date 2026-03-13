---
title: "Sprint Summary"
description: "Generate a sprint summary report from recent project activity"
mode: "ask"
tools: ["githubRepo", "changes"]
---

Generate a sprint summary report based on recent activity in this repository.

1. Summarize recent commits and pull requests
2. Group changes by area (backend, frontend, database, docs, infrastructure)
3. Highlight any breaking changes or security-related updates
4. List open pull requests and their current status
5. Identify risks or blockers based on stale PRs or failing checks

Format as markdown with these sections:
- **Accomplishments**: What shipped this sprint
- **In Progress**: What's still being worked on
- **Risks & Blockers**: Anything that might delay next sprint
- **Key Metrics**: PR count, commit count, contributors

Use a professional but concise tone. Include links to relevant PRs where possible.
