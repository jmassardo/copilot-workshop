# GitHub Copilot: Context Mastery & Beyond Developers

## 3-Hour Guided Hands-On Workshop

**Target audience**: Mixed — developers, project managers, product managers, tech writers, DBAs, managers, and other technical roles  
**Prerequisites**: VS Code installed, GitHub Copilot license active, GitHub account  
**Workshop repo**: [github.com/jmassardo/copilot-workshop](https://github.com/jmassardo/copilot-workshop) — clone this before the session  
**Facilitator prep**: The workshop repo contains a sample Inventory Tracker API with source code, docs, SQL, reports, and pre-built exercise guides. Attendees should have this repo cloned locally.

---

## Agenda at a Glance

| Time | Block | Focus |
|------|-------|-------|
| 0:00–0:15 | **Welcome & Setup Check** | Verify environments, introductions |
| 0:15–0:55 | **Block 1: Copilot for Everyone** | Overview, surfaces, and the "anyone can use this" moment |
| 0:55–1:25 | **Block 2: The Context Model** | How Copilot decides what it knows — and what it doesn't |
| 1:25–1:40 | **Break** | |
| 1:40–2:10 | **Block 3: Instructions & Prompt Files** | Persistent context that travels with your repo |
| 2:10–2:40 | **Block 4: Skills, Agents & MCP** | Extending what Copilot can do |
| 2:40–2:50 | **Block 5: Putting It All Together** | Capstone exercise by role |
| 2:50–3:00 | **Q&A + Wrap-Up** | Key takeaways, resources, next steps |

---

## Block 0 — Welcome & Setup Check (15 min)

### Facilitator Talking Points

- Quick intros: name, role, one thing you hope to use Copilot for
- This workshop is about **context** — Copilot is only as good as the information you give it
- We'll work with real files in a real repo, not slides

### Setup Verification Checklist

Have every attendee confirm:

1. VS Code is open with the workshop repo cloned
2. GitHub Copilot Chat extension is installed and authenticated (look for the Copilot icon in the sidebar)
3. They can open Copilot Chat (Ctrl/Cmd + Shift + I) and get a response to "Hello"

> **Troubleshooting**: If someone can't authenticate, check that their license is assigned at https://github.com/settings/copilot/features. Organization admins can verify at `https://github.com/organizations/<org>/settings/copilot`.

---

## Block 1 — Copilot for Everyone (40 min)

### Key Message

Copilot isn't just for writing code. It's a general-purpose AI assistant that lives in **multiple surfaces** — VS Code, GitHub.com, the CLI, and more. If you work with text, data, or ideas, Copilot can help.

### Part A: What Is Copilot and Where Does It Live? (10 min)

#### Facilitator Walkthrough

Brief overview of Copilot's surfaces. Show each one so the audience sees these are real, shipping features — not vaporware:

| Surface | Where | Who It's For | What It Does |
|---------|-------|-------------|-------------|
| **Ghost text (inline completions)** | VS Code / JetBrains / Neovim | Developers | Tab-to-accept code suggestions as you type |
| **Chat panel** | VS Code sidebar (Ctrl/Cmd+Shift+I) | Everyone | Conversational AI with full context control |
| **Inline chat** | VS Code editor (Ctrl/Cmd+I) | Everyone | Quick edits without leaving the file |
| **Edits mode** | VS Code (Ctrl/Cmd+Shift+I → Edits) | Developers | Multi-file editing with AI across the workspace |
| **Copilot Chat on github.com** | Any repo page, PR, issue, or file | Everyone | AI in the browser — no IDE required |
| **Copilot in GitHub Mobile** | GitHub Mobile app | Everyone | Ask questions about repos on the go |
| **Copilot CLI** | Terminal (`gh copilot`) | Developers / Ops | Explain commands, suggest shell commands |
| **Copilot in Windows Terminal** | Windows Terminal (Ctrl+Shift+.) | Developers / Ops | AI chat right in the terminal |

> **Key point for non-developers**: You do NOT need VS Code for everything. Copilot Chat on github.com works in your browser with zero setup beyond having a license. That's the lowest-friction entry point for PMs, tech writers, managers, and anyone who lives in GitHub but doesn't write code daily.

#### Quick Live Demo: The Three Surfaces Everyone Should Know

1. **VS Code Chat panel** — Open chat, ask "What is this repository about?" with the workshop repo open
2. **GitHub.com Copilot Chat** — Navigate to the workshop repo on github.com, click the Copilot icon, ask the same question
3. **GitHub.com PR summary** — Open a pull request, show Copilot's auto-generated summary (or click "Summarize" in the Copilot dropdown)

### Part B: Copilot on GitHub.com Demos (10 min)

These demos require **only a browser and a GitHub login** — perfect for non-dev audiences:

1. **Chat with a repo**: Navigate to any repo on github.com → Click the Copilot icon (bottom-right) → "Explain the purpose of this repository and its main components"
2. **Understand a PR**: Open a pull request → Copilot Chat → "Summarize the changes in this PR and flag any potential risks"
3. **Triage an issue**: Open an issue → Copilot Chat → "What files in this repo are most likely related to this issue?"
4. **Explain a file**: Navigate to any file in the repo → Click the Copilot icon → "Explain what this file does in plain English"
5. **Draft an issue**: From the repo's Issues tab → New Issue → use Copilot to help draft: "Write an issue for adding CSV export to the reports page. Include acceptance criteria."

> **Facilitator tip**: These demos land hard with PMs and managers because they show Copilot working in the tool they already use daily — no IDE, no terminal, no learning curve.

### Part C: VS Code Demos — Non-Code Tasks (10 min)

Now switch to VS Code. Show these use cases **without writing a single line of traditional code**:

1. **Summarize a document**: Open a long markdown file → Chat → "Summarize this document in 3 bullet points"
2. **Draft a meeting agenda**: New file → Chat → "Create a meeting agenda for a sprint retrospective with 8 engineers"
3. **Rewrite for audience**: Select a technical paragraph → Chat → "Rewrite this for a non-technical executive audience"
4. **Generate a SQL query**: Open a `.sql` file → Chat → "Write a query that finds all users who haven't logged in for 90 days, assuming a `users` table with `id`, `email`, `last_login_at` columns"
5. **Convert formats**: "Convert this CSV data into a markdown table"

### Exercise 1: Your First Non-Code Task (8 min)

> **Exercise guide**: [`exercises/exercise-1.md`](https://github.com/jmassardo/copilot-workshop/blob/main/exercises/exercise-1.md) in the workshop repo

Each attendee picks **one** task from their actual role. **Choose your surface** — do it in VS Code Chat OR on github.com, whichever feels more natural for your role:

| Role | VS Code Task | GitHub.com Task |
|------|-------------|----------------|
| **Project Manager** | "Create a project status report template with sections for risks, blockers, accomplishments, and next steps" | Open the repo on github.com → Copilot Chat → "What were the most significant changes to this repo in the last month?" |
| **Product Manager** | "Draft user acceptance criteria for a feature that lets users export their data as CSV" | Open an issue → Copilot Chat → "Suggest acceptance criteria for this feature request" |
| **Tech Writer** | "Write a getting-started guide for a CLI tool called `deploy-bot` that takes `--env` and `--version` flags" | Navigate to a code file on github.com → Copilot → "Explain this file so I can write documentation for it" |
| **DBA** | "Write a PostgreSQL query to find the top 10 largest tables by row count and disk usage" | Open a `.sql` file on github.com → Copilot → "Review this query for performance issues" |
| **Manager** | "Draft a performance review self-assessment prompt covering impact, collaboration, and growth areas" | Open a PR → Copilot Chat → "Summarize this PR for a non-technical stakeholder" |
| **Developer** | "Explain what this function does and suggest improvements" (select actual code in the repo) | Open a PR → Copilot Chat → "What are the riskiest changes in this PR?" |

### Debrief (2 min)

- Ask 2-3 people to share what they asked and what they got
- Key insight: **the quality of the output depends on the specificity of your input** — this is the segue to Block 2

---

## Block 2 — The Context Model (30 min)

### Key Message

Copilot doesn't read your mind. It reads your **context**. Understanding what Copilot can see — and what it can't — is the single most impactful skill you can develop.

### Facilitator Explanation: The Context Hierarchy (10 min)

Draw or display this hierarchy (from most to least automatic):

```
┌─────────────────────────────────────────────────┐
│  1. Active File           (always included)      │
├─────────────────────────────────────────────────┤
│  2. Open Tabs / Editors   (included as context)  │
├─────────────────────────────────────────────────┤
│  3. Instructions Files    (auto-included)        │
│     • .github/copilot-instructions.md            │
│     • .instructions.md files (scoped by glob)    │
├─────────────────────────────────────────────────┤
│  4. Prompt Files          (user-invoked)         │
│     • .github/prompts/*.prompt.md                │
├─────────────────────────────────────────────────┤
│  5. Chat Variables        (user-attached)        │
│     • #file, #selection, #editor, #codebase      │
│     • #terminalLastCommand, #terminalSelection   │
├─────────────────────────────────────────────────┤
│  6. Skills & Agents       (capabilities)         │
│     • @workspace, @terminal, @vscode             │
│     • MCP servers (external tools)               │
│     • Built-in skills (web search, etc.)         │
├─────────────────────────────────────────────────┤
│  7. Custom Chat Modes     (persona + toolset)    │
│     • Combine instructions + allowed tools       │
└─────────────────────────────────────────────────┘
```

**Critical concept**: Copilot does NOT automatically read your entire repository. If you ask about a file you haven't opened or referenced, it won't know about it unless you use `#codebase`, `@workspace`, or explicitly attach the file.

### Exercise 2: See the Difference Context Makes (15 min)

> **Exercise guide**: [`exercises/exercise-2.md`](https://github.com/jmassardo/copilot-workshop/blob/main/exercises/exercise-2.md) in the workshop repo

This exercise demonstrates the impact of context by asking the **same question** with different levels of context attached.

**Setup**: Everyone opens the workshop repo's README.

**Step 1 — No context (cold ask)**:
Open a new Copilot Chat and ask:
> "What does this project do?"

Note the response. It's likely vague or generic.

**Step 2 — With file context**:
Now ask:
> "What does this project do? #file:README.md"

Compare. It should now reference specific details from the README.

**Step 3 — With codebase context**:
Now ask:
> "What does this project do? #codebase"

Compare again. With `#codebase`, Copilot indexes the full workspace and should give a much richer answer referencing multiple files.

**Step 4 — With explicit attachments**:
Now ask:
> "Summarize the architecture of this project #file:README.md #file:src/index.ts #file:package.json"

Compare the specificity of this response vs. Step 3.

### Debrief (5 min)

- **Takeaway**: More specific context = better answers. `#codebase` is powerful but broad. Explicit `#file` references give Copilot exactly what it needs.
- Ask: "How many of you have been frustrated by Copilot giving a wrong answer? Was it possible that Copilot just didn't have the right context?"

---

## ☕ Break (15 min)

---

## Block 3 — Instructions & Prompt Files (30 min)

### Key Message

Instructions and prompt files let you **bake context into the repo** so every team member — developer or not — gets consistent, high-quality assistance without needing to be a prompt engineering expert.

### Part A: Instructions Files (15 min)

#### Facilitator Explanation (5 min)

There are two types of instructions files:

| Type | Location | Scope | When Applied |
|------|----------|-------|-------------|
| **Repository instructions** | `.github/copilot-instructions.md` | Entire repo | Automatically on every chat |
| **Scoped instructions** | Anywhere, named `*.instructions.md` | Files matching glob in front matter | Automatically when working on matching files |

**Repository instructions** example — this gets applied to EVERY Copilot interaction in this repo:

```markdown
<!-- .github/copilot-instructions.md -->
# Project Context
This is a Node.js REST API for inventory management.
We use TypeScript, Express, and PostgreSQL.

## Conventions
- Use camelCase for variables, PascalCase for types
- All API responses follow { data, error, meta } envelope
- Database queries use the `db` module in src/db/
- Logging uses the `logger` from src/utils/logger.ts
```

**Scoped instructions** example — this only applies when working on files matching the glob:

```markdown
<!-- docs/.instructions.md -->
---
applyTo: "docs/**"
---
When writing documentation:
- Use second person ("you") not third person
- Include code examples for every concept
- Link to related docs using relative paths
- Follow the style guide at docs/STYLE_GUIDE.md
```

Another scoped example for non-dev use:

```markdown
<!-- reports/.instructions.md -->
---
applyTo: "reports/**"
---
When generating or editing reports:
- Use formal business language
- Include an executive summary section
- All metrics should include comparison to previous period
- Format dates as YYYY-MM-DD
- Currency values should include two decimal places
```

#### Exercise 3: Create Instructions Files (10 min)

> **Exercise guide**: [`exercises/exercise-3.md`](https://github.com/jmassardo/copilot-workshop/blob/main/exercises/exercise-3.md) in the workshop repo  
> **Example solutions**: [`examples/instructions/`](https://github.com/jmassardo/copilot-workshop/tree/main/examples/instructions)

**Everyone does this:**

1. **Create a repo-level instructions file**: Create `.github/copilot-instructions.md` in the workshop repo with 5-10 lines describing the project and conventions. Write it for YOUR role (a PM's instructions will look different from a DBA's).

2. **Create a scoped instructions file**: Create a `.instructions.md` file scoped to a folder relevant to your role:

| Role | File | `applyTo` | Content Ideas |
|------|------|-----------|--------------|
| **PM** | `docs/.instructions.md` | `docs/**` | Report format, status update template, stakeholder language |
| **Tech Writer** | `docs/.instructions.md` | `docs/**/*.md` | Style guide rules, heading conventions, link format |
| **DBA** | `sql/.instructions.md` | `**/*.sql` | Naming conventions, index guidelines, always include comments |
| **Developer** | `src/.instructions.md` | `src/**/*.ts` | Architecture patterns, error handling, import order |
| **Manager** | `reviews/.instructions.md` | `reviews/**` | Performance review format, competency framework, tone |

3. **Test it**: Open a file that matches your glob, open Copilot Chat, and ask a question. Notice how the instructions automatically shape the response.

### Part B: Prompt Files (15 min)

#### Facilitator Explanation (5 min)

Prompt files are **reusable, invokable prompts** stored in `.github/prompts/`. Unlike instructions (which are automatic), prompt files are **explicitly triggered** by the user.

Think of them as:
- **Instructions** = "always remember this" (background context)
- **Prompt files** = "run this specific task" (on-demand action)

Prompt file anatomy:

```markdown
<!-- .github/prompts/weekly-status.prompt.md -->
---
title: "Weekly Status Report"
description: "Generate a weekly status report from recent activity"
mode: "ask"
tools: ["githubRepo", "changes"]
---

Generate a weekly status report based on the following:

1. Summarize commits from the last 7 days using #changes
2. Group changes by area (frontend, backend, infrastructure, docs)
3. Highlight any breaking changes or security fixes
4. List open pull requests and their status
5. Format as markdown with sections: Accomplishments, In Progress, Risks, Next Week

Use a professional but concise tone. Include links to relevant PRs.
```

Key features of prompt files:
- **`mode`**: Controls which chat mode to use (`ask`, `edit`, or a custom mode name)
- **`tools`**: Specifies which tools/skills the prompt can use
- **`description`**: Shows up in the picker UI so people know what the prompt does
- Can reference `#file`, `#selection`, and other variables

#### Exercise 4: Create Role-Specific Prompt Files (10 min)

> **Exercise guide**: [`exercises/exercise-4.md`](https://github.com/jmassardo/copilot-workshop/blob/main/exercises/exercise-4.md) in the workshop repo  
> **Example solutions**: [`examples/prompts/`](https://github.com/jmassardo/copilot-workshop/tree/main/examples/prompts)

Each attendee creates **one prompt file** in `.github/prompts/` for a common task in their role:

| Role | Prompt File | Purpose |
|------|-------------|---------|
| **PM** | `sprint-summary.prompt.md` | Summarize sprint progress from recent commits and PRs |
| **Product Manager** | `feature-spec.prompt.md` | Generate a feature specification from a brief description |
| **Tech Writer** | `api-docs.prompt.md` | Generate API documentation from a code file |
| **DBA** | `query-review.prompt.md` | Review a SQL query for performance and correctness |
| **Developer** | `code-review.prompt.md` | Structured code review with security and performance checks |
| **Manager** | `team-update.prompt.md` | Draft a team update email from project activity |

**Test your prompt:**
1. Open the Command Palette (Cmd/Ctrl + Shift + P)
2. Search for "Copilot: Use Prompt..."  or type `/` in Chat and look for your prompt
3. Run it and evaluate the output

---

## Block 4 — Skills, Agents & MCP (30 min)

### Key Message

Skills and agents extend what Copilot **can do**, not just what it **knows**. They give Copilot the ability to take actions, query tools, and work with systems outside your editor.

### Part A: Built-in Skills & Agents (15 min)

#### Facilitator Explanation (7 min)

**Skills** are built-in capabilities that Copilot can invoke:

| Skill | What It Does | Example Use |
|-------|-------------|-------------|
| Code Search | Searches across your codebase | "Where is the authentication middleware defined?" |
| Web Search | Searches the web for current info | "What's the latest LTS version of Node.js?" |
| File Operations | Creates, edits, renames files | "Create a new component called UserProfile" |
| Terminal | Runs commands in the terminal | "Run the test suite and show me failures" |
| Code Interpreter | Executes code snippets | "Calculate the P95 latency from this data" |

**Agents** (participant modes) are specialized capabilities:

| Agent | Scope | Best For |
|-------|-------|----------|
| `@workspace` | Searches & reasons over your full workspace | Architecture questions, cross-file analysis |
| `@terminal` | Reads terminal output and runs commands | Debugging, build issues, system commands |
| `@vscode` | Knows about VS Code settings and extensions | Editor configuration, extension recommendations |

**Non-dev examples:**
- Tech Writer: `@workspace How are error messages structured in this project? I need to document the error format.`
- PM: `@workspace What dependencies does the authentication service have on other services?`
- DBA: `@workspace Show me all files that contain database queries`
- Manager: `@workspace How many TODO comments are in the codebase and who wrote them?`

#### Exercise 5: Agent Exploration (8 min)

> **Exercise guide**: [`exercises/exercise-5.md`](https://github.com/jmassardo/copilot-workshop/blob/main/exercises/exercise-5.md) in the workshop repo

Try each of these and compare the results:

1. **Without @workspace**: Ask "What modules does this project have?"
2. **With @workspace**: Ask "@workspace What modules does this project have?"

Then try a role-specific query:

| Role | Query |
|------|-------|
| **PM** | "@workspace What are the most recently changed areas of the codebase?" |
| **Tech Writer** | "@workspace Which public functions are missing documentation?" |
| **DBA** | "@workspace Find all SQL queries that don't use parameterized inputs" |
| **Developer** | "@workspace What error handling patterns are used in this project?" |
| **Manager** | "@workspace Summarize the test coverage for this project" |

### Part B: MCP — Model Context Protocol (8 min)

#### Facilitator Explanation

MCP servers are **external integrations** that give Copilot the ability to talk to tools outside of VS Code. They're configured per-workspace or per-user.

```
┌──────────────┐     ┌──────────────┐     ┌──────────────────┐
│  Copilot Chat │────▶│  MCP Server  │────▶│  External Tool   │
│  (VS Code)    │◀────│  (bridge)    │◀────│  (DB, API, etc.) │
└──────────────┘     └──────────────┘     └──────────────────┘
```

Common MCP servers:

| MCP Server | What It Connects To | Example Use |
|-----------|-------------------|-------------|
| GitHub | GitHub API (issues, PRs, repos) | "List open PRs that need my review" |
| Postgres | PostgreSQL databases | "Show me the schema for the users table" |
| Playwright | Browser automation | "Test this login page flow" |
| Fetch | Any HTTP API | "GET the /health endpoint and show me the response" |
| File System | Additional file paths | "Read the shared design docs from the design repo" |

**Configuration** lives in `.vscode/mcp.json`:

```json
{
  "servers": {
    "github": {
      "command": "docker",
      "args": ["run", "--rm", "-i", "ghcr.io/github/github-mcp-server"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  }
}
```

> **Note for facilitator**: MCP is the most "advanced" topic. For mixed audiences, focus on **what it enables** rather than how to build custom servers. The GitHub MCP server is the most relatable example since everyone in the room uses GitHub.

### Part C: Custom Chat Modes (7 min)

#### Facilitator Explanation

Custom chat modes combine **instructions + tool access** into a named persona. Think of them as "hats" Copilot can wear.

They live in `.vscode/*.chatmode.md` or the user's global settings:

```markdown
<!-- .vscode/tech-writer.chatmode.md -->
---
title: "Tech Writer"
description: "Documentation-focused assistant"
tools: ["codeSearch", "webSearch", "githubRepo"]
---

You are a senior technical writer. Your responses should:
- Use clear, concise language at a Grade 8 reading level
- Always include code examples with explanations
- Follow the Microsoft Style Guide
- Suggest diagrams where visual explanation would help
- Flag jargon that needs a glossary entry
```

```markdown
<!-- .vscode/dba.chatmode.md -->
---
title: "DBA Assistant"  
description: "Database-focused analysis and query help"
tools: ["codeSearch", "terminal"]
---

You are an expert PostgreSQL DBA. Your responses should:
- Always consider query performance and index usage  
- Suggest EXPLAIN ANALYZE for any non-trivial query
- Flag potential N+1 query patterns
- Recommend appropriate indexes
- Use explicit column names, never SELECT *
```

**Quick demo**: Switch between chat modes in the mode picker dropdown and show how the same question gets different responses.

---

## Block 5 — Capstone Exercise: Putting It All Together (15 min)

> **Exercise guide**: [`exercises/capstone.md`](https://github.com/jmassardo/copilot-workshop/blob/main/exercises/capstone.md) in the workshop repo  
> **All example solutions**: [`examples/`](https://github.com/jmassardo/copilot-workshop/tree/main/examples) (instructions, prompts, and chat modes)

### The Scenario

Your team just inherited a new repository. Your job is to **set it up for Copilot success** based on your role. You'll create the context infrastructure that makes Copilot useful for your team from day one.

### Instructions

Working in the workshop repo, create **all three** of the following:

#### 1. Repository Instructions (`.github/copilot-instructions.md`)
Write instructions that cover:
- What the project is (invent something relevant to your role)
- Key conventions for your role
- What Copilot should always/never do in this repo

#### 2. One Prompt File (`.github/prompts/your-task.prompt.md`)
Create one reusable prompt for your most common task:
- Include a descriptive `title` and `description` in front matter
- Reference at least one variable (`#file`, `#selection`, `#codebase`)
- Make it useful enough that you'd actually use it tomorrow

#### 3. One Scoped Instructions File (`*.instructions.md`)
Create scoped instructions for a specific file type or folder:
- Use the `applyTo` front matter to target the right files
- Include at least 3 specific conventions or rules

### Capstone Starter Ideas by Role

| Role | Project Idea | Prompt Idea | Scoped Instructions |
|------|-------------|------------|-------------------|
| **PM** | Internal project tracker | `sprint-report.prompt.md` — generate sprint summary from PR activity | `reports/.instructions.md` — report formatting rules |
| **Product Manager** | Customer feedback tool | `prd-draft.prompt.md` — draft PRD from a feature brief | `specs/.instructions.md` — spec writing conventions |
| **Tech Writer** | Developer documentation site | `release-notes.prompt.md` — generate release notes from changelog | `docs/.instructions.md` — documentation style guide |
| **DBA** | Data warehouse | `migration-review.prompt.md` — review a migration script for safety | `migrations/.instructions.md` — migration conventions |
| **Developer** | REST API service | `api-endpoint.prompt.md` — scaffold a new API endpoint | `src/.instructions.md` — code conventions |
| **Manager** | Team operations repo | `weekly-digest.prompt.md` — summarize team activity into digest | `updates/.instructions.md` — communication format rules |

### Share Out (5 min)

2-3 volunteers share their setup and demonstrate running their prompt file.

---

## Q&A + Wrap-Up (15 min)

### Key Takeaways Slide

1. **Copilot works for everyone** — not just developers. If you work with text, Copilot can help.
2. **Context is everything** — the #1 skill is learning to give Copilot the right context at the right time.
3. **Instructions are automatic** — they shape every interaction without anyone having to remember to include them.
4. **Prompt files are reusable** — build them once, use them across the team as sharable workflows.
5. **Agents extend reach** — `@workspace`, `@terminal`, and MCP servers let Copilot interact with your actual tools and systems.
6. **Custom chat modes are personas** — different roles, different hats, same tool.
7. **Context hierarchy matters** — active file → open tabs → instructions → explicit references → workspace search. Know where you are in the stack.

### Context Method Quick Reference

| Method | Auto/Manual | Scope | Best For |
|--------|-------------|-------|----------|
| Active file + open tabs | Auto | Current editor state | Immediate context |
| `.github/copilot-instructions.md` | Auto | Entire repo | Project-wide standards |
| `*.instructions.md` with `applyTo` | Auto | Matching files | Role/file-type-specific rules |
| `#file:path` | Manual | Specific file | Targeted questions |
| `#selection` | Manual | Selected text | Focused analysis |
| `#codebase` | Manual | Full workspace | Broad questions |
| `@workspace` | Manual | Full workspace + reasoning | Architecture, cross-cutting |
| `.prompt.md` files | Manual (invoked) | Defined per prompt | Repeatable tasks |
| Custom chat modes | Manual (selected) | Entire conversation | Role-based personas |
| MCP servers | Auto (when configured) | External system | Tool integration |

### Resources

- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
- [Customizing Copilot for Your Repository](https://docs.github.com/en/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot)
- [Prompt Files Documentation](https://docs.github.com/en/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot#creating-reusable-prompt-files)
- [VS Code Custom Chat Modes](https://code.visualstudio.com/docs/copilot/customization/custom-chat-modes)
- [MCP Protocol Overview](https://modelcontextprotocol.io/)
- [Awesome Copilot Repository](https://github.com/github/awesome-copilot)
- [VS Code Copilot Customization Docs](https://code.visualstudio.com/docs/copilot/customization)
- [Workshop Repository (exercises & examples)](https://github.com/jmassardo/copilot-workshop)

### Facilitator Notes: Pre-Workshop Prep

1. **Workshop repo**: [github.com/jmassardo/copilot-workshop](https://github.com/jmassardo/copilot-workshop) — an Inventory Tracker API (TypeScript, Express, PostgreSQL) with source code in `src/`, docs in `docs/`, SQL in `sql/`, reports in `reports/`, and review templates in `reviews/`. All skeleton directories are pre-created.
2. **Exercise guides**: All exercises are in [`exercises/`](https://github.com/jmassardo/copilot-workshop/tree/main/exercises) with step-by-step instructions. Example solutions are in [`examples/`](https://github.com/jmassardo/copilot-workshop/tree/main/examples) (instructions files, prompt files, and chat modes for every role).
3. **Verify licenses**: Confirm all attendees have Copilot access **before** the session. Nothing kills momentum like troubleshooting auth for 20 minutes.
4. **Backup plan**: Have screenshots or recordings of each exercise in case of network/auth issues.
5. **Handout**: Consider printing or sharing this agenda so attendees can reference it during exercises. The [`exercises/README.md`](https://github.com/jmassardo/copilot-workshop/blob/main/exercises/README.md) has a complete exercise map.
