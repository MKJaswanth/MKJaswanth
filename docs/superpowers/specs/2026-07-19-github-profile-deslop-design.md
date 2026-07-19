# MK Jaswanth GitHub Profile — Editorial Redesign

**Date:** 2026-07-19  
**Status:** Approved design, awaiting specification review

## Objective

Replace the current showcase-heavy profile with a concise, recruiter-first README that sounds like MK Jaswanth, presents QA Labs as real product work, and cannot display broken analytics or decorative images.

The finished profile should answer five questions quickly:

1. Who is Jaswanth?
2. What kind of QA work does he do?
3. What did he build?
4. What evidence and tools support his claims?
5. How can someone contact him?

## Confirmed Problems

The existing README contains patterns identified by the `kill-ai-slop` audit:

- animated typing and a gradient/glow banner;
- six header badges and a large skill-badge wall;
- terminal-style `whoami` and status-tree presentation;
- a synthetic QA Labs dashboard with invented figures;
- nested cards, tinted icons, a glowing live indicator, and decorative gradients;
- ornamental 01/02/03/04 labels;
- third-party stats, streak, language, and trophy cards;
- an animated release maze that adds decoration but little hiring evidence;
- emoji bullets and a generic closing slogan.

The broken analytics are caused by upstream services. At audit time, GitHub Stats and Top Languages returned HTTP 503, the trophy service returned HTTP 402, and GitHub's image proxy returned HTTP 502. The README syntax is not the cause.

## Design Direction

Use a plain editorial structure built entirely from GitHub Markdown and text links. No decorative image, animation, badge, generated statistic, or third-party image service will be required.

The voice will be first-person, specific, and calm. Copy should describe actual work and decisions without marketing formulas, punchy slogan triplets, or generic claims such as “passionate” and “results-driven.”

## Information Architecture

### 1. Identity

- `# MK Jaswanth`
- One line: `QA Engineer · Software Tester · Automation with Python and Playwright`
- Plain links: Portfolio, LinkedIn, Email
- No centered HTML, banner, typing animation, availability pill, follower badge, or view counter.

### 2. Introduction

Two short first-person paragraphs:

- explain that Jaswanth works across exploratory, manual, API, regression, and browser automation testing;
- explain that he stays close to product risk and builds tools when the workflow itself needs improvement;
- mention that he is open to QA Engineer, Automation Tester, and SDET opportunities without turning it into a status badge.

### 3. QA Labs

Present QA Labs as the strongest evidence on the page using a compact case-study structure:

- **Why I built it:** test information becomes fragmented across spreadsheets, chat, and disconnected tools.
- **What it covers:** projects, requirements, test cases, coverage, plans, runs, defects, reports, activity, and backups.
- **What it demonstrates:** product thinking, practical QA workflow design, and the ability to build a tool around a recurring testing problem.
- Plain links to the live product and source repository.

The synthetic `qa-labs-product.svg`, invented pass rates, colored cards, live indicator, and badge buttons will be removed.

### 4. Selected Work

Use a short Markdown list rather than equal-sized marketing cards:

- E-commerce Automation
- Playwright Pytest QA Skill
- Portfolio
- BugAuraLabs

Each entry receives one specific sentence explaining what it demonstrates and one or two plain links. Claims should be grounded in the repository or user-provided experience.

### 5. Testing Experience and Tools

Replace the badge wall with four readable lines:

- **Testing:** manual, exploratory, functional, regression, API, test design, defect lifecycle
- **Automation:** Python, Playwright, pytest, Page Object Model, fixtures, data-driven testing
- **Delivery:** Git, GitHub Actions, CI/CD, Jira, Postman
- **Foundations:** SQL, HTML, CSS, JavaScript, AI-assisted testing

The user-provided evidence of 4+ tested projects and 200+ designed test cases per project may appear as one factual sentence, not as a stat row.

### 6. Quality Approach

Use three unnumbered bullets:

- understand product and user risk before selecting coverage;
- explore first, then automate stable paths that benefit from repetition;
- report failures with enough evidence for another person to reproduce and act.

No numbered grid or “not a final gate” marketing phrasing.

### 7. GitHub Activity

Remove GitHub Stats, Top Languages, Streak, and Trophies. Replace them with one normal text link to Jaswanth's GitHub overview and repositories.

This eliminates the broken-image dependency and keeps the page focused on inspectable work.

### 8. Personal Note and Contact

Use one natural sentence mentioning music, travel, and reading. Follow it with a direct contact line containing LinkedIn and email links.

No emoji list, badge buttons, “Let's build something reliable” heading, or closing slogan.

## Repository Cleanup

The following files become unused and will be removed:

```text
assets/profile-header.svg
assets/qa-labs-product.svg
assets/qa-release-maze.svg
scripts/generate-maze.mjs
.github/workflows/maze.yml
```

Empty `assets`, `scripts`, and `.github/workflows` directories do not need placeholder files.

The design specification remains under `docs/superpowers/specs/` as project documentation.

## Reliability and Accessibility

- The README will contain no `<img>` elements.
- Core content will not depend on external rendering services.
- Link labels will state their destination or purpose.
- Headings will follow a clear Markdown hierarchy.
- Content will remain readable in GitHub light mode, dark mode, desktop, and mobile because it uses native Markdown presentation.

## Verification

Before publishing:

1. Re-run the `kill-ai-slop` scanner and manually triage any remaining hit.
2. Confirm the README contains no image, badge, stats, trophy, streak, typing, or maze URL.
3. Confirm every local reference resolves and no removed file remains referenced.
4. Verify live product, portfolio, LinkedIn, email, and repository links.
5. Run `git diff --check`.
6. Publish to `main`, then inspect GitHub's rendered README HTML to confirm there are no broken `<img>` elements.

## Success Criteria

- A recruiter can identify Jaswanth's role, flagship product, tools, project evidence, and contact options in under 20 seconds.
- QA Labs reads as a real product response to a testing-workflow problem.
- No invented metric or generic third-party analytics card appears.
- The README contains no broken images because it contains no image dependencies.
- The writing sounds specific and personal rather than generated or promotional.
