# Capstone Exercise: Putting It All Together

**Block**: 5 — Capstone  
**Time**: 15 minutes  
**Goal**: Set up a repo for Copilot success by creating instructions, a prompt file, and scoped instructions

---

## The Scenario

Your team just inherited this repository. Your job is to **set it up for Copilot success** based on your role. You'll create the context infrastructure that makes Copilot useful for your entire team from day one.

---

## Requirements

Create **all three** of the following:

### 1. Repository Instructions (`.github/copilot-instructions.md`)

If you already created this in Exercise 3, **expand it**. If not, create it now.

Your instructions should cover:
- What the project is and what problem it solves
- Key conventions for your role
- What Copilot should **always** do in this repo
- What Copilot should **never** do in this repo

**Minimum**: 10 lines of meaningful content.

### 2. One Prompt File (`.github/prompts/your-task.prompt.md`)

If you already created one in Exercise 4, **create a second one**. Each person should have at least one unique prompt file.

Your prompt file should:
- Have a descriptive `title` and `description` in the front matter
- Reference at least one variable (`#file`, `#selection`, `#codebase`)
- Be useful enough that you'd actually use it in your real work tomorrow
- Include at least 3 specific instructions for how to format the output

### 3. One Scoped Instructions File (`*.instructions.md`)

If you already created one in Exercise 3, **create a second one for a different scope**. 

Your scoped instructions should:
- Use the `applyTo` front matter to target the right files
- Include at least 3 specific conventions or rules
- Be relevant to how your role interacts with those files

---

## Starter Ideas by Role

| Role | Project Angle | Prompt Idea | Scoped Instructions |
|------|--------------|------------|-------------------|
| **PM** | Track project health & team status | `risk-assessment.prompt.md` — analyze codebase for risks | `reports/.instructions.md` — report formatting rules |
| **Product** | Define features & specs | `user-story.prompt.md` — generate user stories from code | `specs/.instructions.md` — spec writing conventions |
| **Tech Writer** | Document the API & architecture | `release-notes.prompt.md` — generate release notes from commits | `docs/.instructions.md` — documentation style guide |
| **DBA** | Manage schema & query performance | `migration-review.prompt.md` — review migration scripts | `sql/.instructions.md` — SQL conventions |
| **Developer** | Build & maintain the API | `api-endpoint.prompt.md` — scaffold a new API endpoint | `src/.instructions.md` — code conventions |
| **Manager** | Oversee team & communicate up | `weekly-digest.prompt.md` — summarize team activity | `reviews/.instructions.md` — communication format |

---

## Verification

After creating all three files, verify they work:

### Test 1: Instructions are auto-included
1. Open a file matching your scoped instructions glob
2. Open Copilot Chat
3. Ask a question — verify the response follows your conventions

### Test 2: Prompt file is invokable
1. `Cmd/Ctrl + Shift + P` → **Copilot: Use Prompt**
2. Select your prompt
3. Verify it runs and produces useful output

### Test 3: Repo instructions are always present
1. Open a chat in any file
2. Ask: "What conventions should I follow in this project?"
3. Verify Copilot references your `.github/copilot-instructions.md` content

---

## Share Out (5 min)

Be ready to share:
1. What role you chose
2. What your prompt file does
3. One insight about how instructions changed Copilot's behavior

---

## Checklist

- [ ] `.github/copilot-instructions.md` — repo-level instructions (10+ lines)
- [ ] `.github/prompts/*.prompt.md` — at least one prompt file with front matter
- [ ] `*.instructions.md` — at least one scoped instructions file with `applyTo`
- [ ] Tested all three and verified they affect Copilot's behavior
