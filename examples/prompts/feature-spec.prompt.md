---
title: "Feature Specification"
description: "Generate a product specification document from a feature brief"
mode: "ask"
tools: ["codeSearch", "githubRepo"]
---

Generate a product specification document based on the following feature brief.

Use this structure:

## 1. Overview
- Feature name and one-sentence description
- Problem statement: what user pain does this solve?

## 2. User Stories
- Write 3-5 user stories in "As a [role], I want [action], so that [benefit]" format
- Cover the primary persona and at least one secondary persona

## 3. Acceptance Criteria
- Use "Given / When / Then" format
- Include at least one happy path scenario and one edge case

## 4. Scope
- **In scope**: What this feature includes
- **Out of scope**: What it explicitly does NOT include (this prevents creep)

## 5. Dependencies
- Reference any APIs, services, or data sources using #codebase
- Flag any external dependencies or integrations

## 6. Open Questions
- List any decisions that still need to be made
- Tag each with a suggested owner (Engineering, Design, Product)

## 7. Effort Estimate
- Provide T-shirt size estimate (S/M/L/XL) with rationale

Keep language clear and jargon-free. Target a technical audience that includes developers, designers, and QA.
