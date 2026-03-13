# Exercise 4: Create Role-Specific Prompt Files

**Block**: 3 — Instructions & Prompt Files  
**Time**: 10 minutes  
**Goal**: Create a reusable prompt file for a common task in your role

---

## Background

Prompt files are **reusable, on-demand prompts** stored in `.github/prompts/`. Unlike instructions (which are automatic), prompt files are **explicitly triggered** by the user.

Think of it this way:
- **Instructions** = "always remember this" (background context)
- **Prompt files** = "run this specific task" (on-demand action)

---

## Prompt File Format

```markdown
---
title: "Human-Readable Title"
description: "What this prompt does (shows in the picker UI)"
mode: "ask"
tools: ["githubRepo", "changes"]
---

Your prompt text goes here.

You can reference variables like:
- #file — a specific file
- #selection — currently selected text
- #codebase — the full workspace
```

### Key Fields

| Field | Required | Purpose |
|-------|----------|---------|
| `title` | Yes | Display name in the prompt picker |
| `description` | Yes | Help text so others know what the prompt does |
| `mode` | No | `ask` (default), `edit`, or a custom chat mode name |
| `tools` | No | Array of tools/skills the prompt can use |

---

## Your Task

Create **one prompt file** in `.github/prompts/` for a common task in your role.

### Role-Specific Suggestions

#### Project Manager: `sprint-summary.prompt.md`

```markdown
---
title: "Sprint Summary"
description: "Generate a sprint summary from recent project activity"
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
```

#### Product Manager: `feature-spec.prompt.md`

```markdown
---
title: "Feature Spec Draft"
description: "Draft a feature specification from a brief description"
mode: "ask"
---

I need a feature specification document. Based on the following brief description, generate a complete spec:

**Feature brief**: #selection

Include these sections:
1. **Overview**: What the feature does and why it matters
2. **User Stories**: 3-5 user stories in "As a [role], I want [goal], so that [benefit]" format
3. **Acceptance Criteria**: Testable criteria for each user story
4. **Technical Considerations**: What the engineering team should think about
5. **Out of Scope**: What this feature explicitly does NOT include
6. **Success Metrics**: How we'll measure if this feature is successful

Reference the existing codebase architecture from #file:docs/architecture.md when discussing technical considerations.
```

#### Tech Writer: `api-docs.prompt.md`

```markdown
---
title: "API Endpoint Documentation"
description: "Generate API documentation from a route handler file"
mode: "ask"
---

Generate API documentation for the endpoints in the following file:

#selection

For each endpoint, document:
1. **Method and Path** (e.g., `GET /api/items`)
2. **Description**: What the endpoint does in plain English
3. **Authentication**: Required or not, and what roles have access
4. **Request Parameters**: Query params, path params, and body schema
5. **Response Format**: Example success response with realistic data
6. **Error Responses**: Common error codes and what triggers them

Follow the existing documentation style in #file:docs/api-reference.md.
Use clear, concise language. Include curl examples for each endpoint.
```

#### DBA: `query-review.prompt.md`

```markdown
---
title: "SQL Query Review"
description: "Review a SQL query for performance, correctness, and best practices"
mode: "ask"
---

Review the following SQL query for the Inventory Tracker database:

#selection

Check for:
1. **Performance**: Missing indexes, full table scans, N+1 patterns
2. **Correctness**: Logic errors, edge cases (NULLs, empty results)
3. **Security**: SQL injection risks, unparameterized inputs
4. **Best Practices**: Naming conventions, readability, comments
5. **Optimization**: Suggest EXPLAIN ANALYZE if the query is non-trivial

Reference the database schema from #file:sql/schema.sql for table structure and existing indexes.

Provide the improved query with comments explaining each change.
```

#### Developer: `code-review.prompt.md`

```markdown
---
title: "Code Review"
description: "Structured code review with security and performance checks"
mode: "ask"
---

Perform a structured code review of the following code:

#selection

Review criteria:
1. **Correctness**: Logic errors, edge cases, error handling gaps
2. **Security**: Input validation, injection risks, auth checks, data exposure
3. **Performance**: Unnecessary allocations, N+1 queries, missing pagination
4. **Maintainability**: Naming, complexity, single responsibility principle
5. **TypeScript**: Proper typing, avoidance of `any`, null safety

Reference the project conventions from #file:README.md (Project Conventions section).

Format your review as:
- 🔴 **Critical**: Must fix before merge
- 🟡 **Suggestion**: Should improve but not blocking
- 🟢 **Looks Good**: What's working well

End with a one-sentence summary of overall quality.
```

#### Manager: `team-update.prompt.md`

```markdown
---
title: "Team Update Email"
description: "Draft a team update email from project activity"
mode: "ask"
tools: ["githubRepo"]
---

Draft a team update email based on recent activity in this repository.

The email should:
1. Have a clear, specific subject line
2. Open with a 2-sentence executive summary
3. List key accomplishments (3-5 bullets, non-technical language)
4. Call out team members who made significant contributions
5. Flag any risks or blockers that need leadership attention
6. End with a "looking ahead" section for next week

Audience: Engineering leadership (technical but not in the daily code)
Tone: Professional, concise, data-informed
Length: Under 300 words
```

---

## How to Test Your Prompt

1. Open the Command Palette: `Cmd/Ctrl + Shift + P`
2. Type: **Copilot: Use Prompt**
3. Select your prompt from the list
4. If your prompt uses `#selection`, select some text first
5. Review the output

---

## Checklist

- [ ] Created a `.prompt.md` file in `.github/prompts/`
- [ ] Included `title` and `description` in front matter
- [ ] Referenced at least one variable (`#file`, `#selection`, `#codebase`)
- [ ] Tested the prompt via the Command Palette
