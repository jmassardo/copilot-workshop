# Exercise 5: Agent & Skill Exploration

**Block**: 4 — Skills, Agents & MCP  
**Time**: 8 minutes  
**Goal**: See how agents like `@workspace` change the quality and scope of Copilot's responses

---

## Part 1: With and Without @workspace

Try these two prompts and compare the results:

### Without `@workspace`

Open Copilot Chat and ask:

> What modules does this project have?

Note the response. It may be vague or only reference the currently active file.

### With `@workspace`

Now ask:

> @workspace What modules does this project have?

Compare. With `@workspace`, Copilot searches across your entire workspace and should give a comprehensive answer referencing routes, middleware, database modules, types, etc.

---

## Part 2: Role-Specific Agent Queries

Try the query that matches your role:

### Project Manager

> @workspace What are the most recently changed areas of the codebase?

Then try:

> @workspace What API endpoints exist and which ones require authentication?

### Product Manager

> @workspace What features does this application currently support?

Then try:

> @workspace Based on the current codebase, what feature gaps do you see?

### Tech Writer

> @workspace Which public functions are missing documentation comments?

Then try:

> @workspace List all the API endpoints with their HTTP methods and a brief description of each

### DBA

> @workspace Find all SQL queries that don't use parameterized inputs

Then try:

> @workspace What indexes exist in the database schema and are any missing for the queries in src/db/queries.ts?

### Developer

> @workspace What error handling patterns are used in this project?

Then try:

> @workspace Where is user input validated and are there any gaps?

### Manager

> @workspace Summarize the test coverage and quality practices for this project

Then try:

> @workspace What are the main risks or technical debt items visible in this codebase?

---

## Part 3: Other Built-in Skills

Try these additional skills to see what Copilot can do beyond code search:

### Terminal Integration

> @terminal What was the last command I ran and did it succeed?

### VS Code Help

> @vscode How do I change the color theme?

### Web Search (if enabled)

> What's the latest LTS version of Node.js?

> What are the security best practices for Express.js rate limiting?

---

## What You Should Notice

| Query Type | What It Does | Best For |
|-----------|-------------|---------|
| Plain chat | Uses active file + open tabs | Quick questions about current context |
| `@workspace` | Searches and reasons over full workspace | Architecture, cross-file analysis |
| `@terminal` | Reads terminal output | Debugging, build issues |
| `@vscode` | Knows about editor settings | Configuration help |
| Web search | Searches the internet | Current info, documentation |

---

## Debrief Questions

1. How much more useful were `@workspace` queries vs. plain chat?
2. Which agent or skill was most relevant to your role?
3. What question would you ask `@workspace` in your actual day-to-day work?

> **Key takeaway**: Agents extend what Copilot can **reach**. `@workspace` is the most universally useful — it turns Copilot from "knows about this file" to "knows about this project."
