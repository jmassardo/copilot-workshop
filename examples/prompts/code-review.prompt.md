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
