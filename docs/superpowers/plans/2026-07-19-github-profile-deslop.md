# GitHub Profile Editorial Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the image-heavy GitHub profile with a concise recruiter-first README that presents QA Labs and testing evidence without broken images or AI-template styling.

**Architecture:** The profile becomes one native Markdown document with plain links and no image dependencies. Obsolete SVG assets, the maze generator, and its workflow are removed after the README stops referencing them.

**Tech Stack:** GitHub Markdown, Git, PowerShell validation, dependency-free `kill-ai-slop` scanner

## Global Constraints

- The README must contain no `<img>` elements, badges, animations, generated analytics, trophies, or maze content.
- Use first-person, specific copy without marketing formulas, emoji decoration, terminal metaphors, or ornamental numbering.
- QA Labs must be presented as real product work with live and source links.
- Keep the user-provided evidence of 4+ projects and 200+ designed test cases per project as one factual sentence.
- Add no dependencies.
- Stage explicit files only; never use `git add -A`.

---

### Task 1: Replace the README with the editorial profile

**Files:**
- Modify: `README.md`
- Reference: `docs/superpowers/specs/2026-07-19-github-profile-deslop-design.md`

**Interfaces:**
- Consumes: The approved content structure and verified public project URLs.
- Produces: A standalone `README.md` with no local asset dependency.

- [ ] **Step 1: Run the pre-change failure check**

Run:

```powershell
rg -n '<img|shields\.io|readme-typing-svg|github-readme-stats|streak-stats|github-profile-trophy|qa-release-maze' README.md
```

Expected: multiple matches from the current banner, badges, analytics cards, and maze.

- [ ] **Step 2: Replace `README.md` with the approved content**

Use this complete file:

```markdown
# MK Jaswanth

**QA Engineer · Software Tester · Python and Playwright Automation**

[Portfolio](https://mkjaswanth.github.io/portfolio/) · [LinkedIn](https://www.linkedin.com/in/mkjaswanth/) · [Email](mailto:jaswanth.mk63@gmail.com)

I test web and mobile products through exploratory, functional, regression, and API testing. For repeatable browser coverage, I build automation with Python, Playwright, pytest, and the Page Object Model.

I like working close to the product: understanding what can fail, turning requirements into useful coverage, and reporting defects with enough evidence for the team to act. I am open to QA Engineer, Automation Tester, and SDET opportunities.

## QA Labs

**Test management software for practical QA teams**

I built QA Labs after seeing test information spread across spreadsheets, chat threads, and disconnected tools. The product keeps the working parts of a QA cycle together: projects, requirements, test cases, coverage, plans, runs, defects, reports, activity history, and backups.

The project combines product definition, QA workflow design, and implementation around a problem I have encountered in day-to-day testing.

[Open QA Labs](https://qa-labs-seven.vercel.app/) · [View source](https://github.com/MKJaswanth/QA-labs)

## Selected work

Across 4+ projects, I have designed 200+ test cases per project for e-commerce, LMS, and other web-product workflows.

### E-commerce automation

A Playwright and pytest framework covering authentication, inventory, cart, and checkout. It uses page objects, fixtures, parameterization, HTML reports, environment-based configuration, and GitHub Actions.

[View repository](https://github.com/MKJaswanth/E-commerce_automation)

### Playwright Pytest QA Skill

A reusable workflow for designing, running, and reporting browser tests with Playwright and pytest.

[View repository](https://github.com/MKJaswanth/playwright-pytest-qa-skill)

### QA portfolio

My longer-form portfolio with project context, testing work, and ways to contact me.

[Open portfolio](https://mkjaswanth.github.io/portfolio/) · [View repository](https://github.com/MKJaswanth/portfolio)

### BugAuraLabs

A QA services site that explains testing scope, defect reporting, and engagement options for product teams.

[Open website](https://bugauralabs.studio/) · [View repository](https://github.com/MKJaswanth/BugAuraLabs)

[See all repositories and contribution activity](https://github.com/MKJaswanth?tab=overview)

## Testing experience and tools

**Testing:** Manual, exploratory, functional, regression, API, test design, defect lifecycle

**Automation:** Python, Playwright, pytest, Page Object Model, fixtures, data-driven testing

**Delivery:** Git, GitHub Actions, CI/CD, Jira, Postman

**Foundations:** SQL, HTML, CSS, JavaScript, AI-assisted testing

## How I work

- Understand the product and user risk before selecting coverage.
- Explore first, then automate stable paths that benefit from repetition.
- Report failures with clear steps, environment details, expected behavior, actual behavior, and supporting evidence.

## Outside QA

Away from testing, I spend time listening to music, travelling, and reading. They keep me curious about how people use products and solve everyday problems.

## Contact

For QA Engineer, Automation Tester, or SDET opportunities, contact me through [LinkedIn](https://www.linkedin.com/in/mkjaswanth/) or [email](mailto:jaswanth.mk63@gmail.com).
```

- [ ] **Step 3: Run the post-change dependency check**

Run:

```powershell
$patterns = '<img|shields\.io|readme-typing-svg|github-readme-stats|streak-stats|github-profile-trophy|qa-release-maze|<table|🎧|🧭|📚'
if (rg -n $patterns README.md) { exit 1 }
Write-Output 'README_DEPENDENCY_CHECK_PASSED'
```

Expected: `README_DEPENDENCY_CHECK_PASSED`.

- [ ] **Step 4: Run the anti-slop scanner**

Run:

```powershell
node 'C:\Users\ccl15\Documents\Codex\2026-07-14\my-portfolio-link-https-mkjaswanth-github\.agents\skills\kill-ai-slop\scripts\scan.mjs' . --exclude=docs --exclude=scripts
```

Expected: no confirmed slop hit in `README.md`. Documentation hits, if any, are triaged separately because they describe the removed patterns.

- [ ] **Step 5: Commit the README**

```powershell
git add README.md
git commit -m "docs: simplify GitHub profile for recruiters"
```

Expected: one commit modifying only `README.md`.

### Task 2: Remove unused visual and maze infrastructure

**Files:**
- Delete: `assets/profile-header.svg`
- Delete: `assets/qa-labs-product.svg`
- Delete: `assets/qa-release-maze.svg`
- Delete: `scripts/generate-maze.mjs`
- Delete: `.github/workflows/maze.yml`

**Interfaces:**
- Consumes: Task 1's asset-free README.
- Produces: A repository with no unused visual generator or scheduled maze workflow.

- [ ] **Step 1: Prove the files are no longer referenced**

Run:

```powershell
if (rg -n 'profile-header|qa-labs-product|qa-release-maze|generate-maze|maze\.yml' README.md) { exit 1 }
Write-Output 'UNUSED_ASSETS_CONFIRMED'
```

Expected: `UNUSED_ASSETS_CONFIRMED`.

- [ ] **Step 2: Delete the five obsolete files**

Delete only the files listed in this task. Do not delete the design or implementation documentation.

- [ ] **Step 3: Verify the repository cleanup**

Run:

```powershell
$paths = @(
  'assets/profile-header.svg',
  'assets/qa-labs-product.svg',
  'assets/qa-release-maze.svg',
  'scripts/generate-maze.mjs',
  '.github/workflows/maze.yml'
)
$remaining = $paths | Where-Object { Test-Path -LiteralPath $_ }
if ($remaining) { Write-Error "Files still present: $($remaining -join ', ')"; exit 1 }
Write-Output 'REPOSITORY_CLEANUP_PASSED'
```

Expected: `REPOSITORY_CLEANUP_PASSED`.

- [ ] **Step 4: Commit the cleanup**

```powershell
git add assets/profile-header.svg assets/qa-labs-product.svg assets/qa-release-maze.svg scripts/generate-maze.mjs .github/workflows/maze.yml
git commit -m "chore: remove unused profile artwork and maze workflow"
```

Expected: one commit containing five deletions.

### Task 3: Verify and publish the completed profile

**Files:**
- Verify: `README.md`
- Verify: `docs/superpowers/specs/2026-07-19-github-profile-deslop-design.md`
- Verify: `docs/superpowers/plans/2026-07-19-github-profile-deslop.md`

**Interfaces:**
- Consumes: Task 1's README and Task 2's cleanup.
- Produces: A validated commit history pushed to `origin/main`.

- [ ] **Step 1: Validate Markdown content and repository state**

Run:

```powershell
git diff --check origin/main..HEAD
$readme = Get-Content -Raw README.md
if ($readme -match '<img|https://img\.shields\.io|github-readme-stats|streak-stats|github-profile-trophy|qa-release-maze') { exit 1 }
if ((Select-String -Path README.md -Pattern '^# ' -AllMatches).Matches.Count -ne 1) { exit 1 }
if ((Select-String -Path README.md -Pattern '^## ' -AllMatches).Matches.Count -lt 5) { exit 1 }
Write-Output 'LOCAL_PROFILE_VALIDATION_PASSED'
```

Expected: `LOCAL_PROFILE_VALIDATION_PASSED` and no `git diff --check` errors.

- [ ] **Step 2: Verify every public destination**

Run HTTP GET checks for:

```text
https://qa-labs-seven.vercel.app/
https://mkjaswanth.github.io/portfolio/
https://bugauralabs.studio/
https://www.linkedin.com/in/mkjaswanth/
```

Run `git ls-remote --exit-code <repository>.git HEAD` for:

```text
https://github.com/MKJaswanth/QA-labs.git
https://github.com/MKJaswanth/E-commerce_automation.git
https://github.com/MKJaswanth/playwright-pytest-qa-skill.git
https://github.com/MKJaswanth/portfolio.git
https://github.com/MKJaswanth/BugAuraLabs.git
```

Expected: public pages respond or redirect successfully; every repository returns a HEAD commit.

- [ ] **Step 3: Push the branch to `main`**

Run:

```powershell
git fetch origin main
git rebase origin/main
git push origin HEAD:main
```

Expected: a fast-forward push to `main`. If the remote changed, inspect and integrate it before retrying; never force-push.

- [ ] **Step 4: Verify the published README**

Fetch:

```text
https://raw.githubusercontent.com/MKJaswanth/MKJaswanth/main/README.md
https://github.com/MKJaswanth/MKJaswanth
```

Expected:

- remote README contains `# MK Jaswanth` and `## QA Labs`;
- remote README contains no `<img>` element;
- GitHub's rendered README HTML contains no profile-content `<img>` element with a broken third-party source;
- remote `main` points to the pushed HEAD commit.
