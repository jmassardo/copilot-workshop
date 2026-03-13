# Exercise 2: See the Difference Context Makes

**Block**: 2 — The Context Model  
**Time**: 15 minutes  
**Goal**: Ask the same question with different levels of context and compare the results

---

## Setup

Make sure you have this workshop repo open in VS Code.

---

## Steps

### Step 1 — No Context (Cold Ask)

Open a **new** Copilot Chat conversation and ask:

> What does this project do?

**Write down or remember** the response. It will likely be vague or generic.

---

### Step 2 — With File Context

In the same or new chat, ask:

> What does this project do? #file:README.md

**Compare** to Step 1. The response should now reference specific details from the README — like the inventory management API, Express, PostgreSQL, etc.

---

### Step 3 — With Codebase Context

Now ask:

> What does this project do? #codebase

**Compare** again. With `#codebase`, Copilot indexes the full workspace and should give a much richer answer referencing multiple files — routes, database schema, middleware, etc.

---

### Step 4 — With Explicit Attachments

Now ask:

> Summarize the architecture of this project #file:README.md #file:src/index.ts #file:docs/architecture.md

**Compare** the specificity of this response vs. Step 3. Explicit file references give Copilot exactly what it needs.

---

## Bonus: Try a Role-Specific Context Experiment

### Project Manager
> What are the main API endpoints and what do they do? #file:README.md

Then try:
> What are the main API endpoints and what do they do? #file:docs/api-reference.md

### Tech Writer
> What conventions should I follow when writing docs for this project?

Then try:
> What conventions should I follow when writing docs for this project? #file:README.md #file:docs/architecture.md

### DBA
> What does the database schema look like?

Then try:
> What does the database schema look like? #file:sql/schema.sql

### Developer
> How does authentication work in this project?

Then try:
> How does authentication work in this project? #file:src/middleware/auth.ts #file:src/routes/users.ts

---

## What You Should Notice

| Step | Context Level | Expected Quality |
|------|--------------|-----------------|
| 1 | None | Vague, generic, possibly wrong |
| 2 | One file | Accurate but limited |
| 3 | Full codebase | Rich but may include noise |
| 4 | Hand-picked files | Focused and precise |

---

## Debrief Questions

1. How different were the responses between Step 1 and Step 4?
2. When would you use `#codebase` vs. explicit `#file` references?
3. Have you ever been frustrated by Copilot giving a wrong answer? Was it possible that Copilot just didn't have the right context?

> **Key takeaway**: More specific context = better answers. The #1 skill with Copilot is learning what to include and when.
