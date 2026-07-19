# MK Jaswanth GitHub Profile — QA Release Dossier

**Date:** 2026-07-19  
**Status:** Direction approved; specification awaiting review

## Goal

Make the profile visually memorable without returning to badge walls, generic AI styling, or unreliable external image services. The page should still work as a recruiter-facing introduction to a QA Engineer and SDET candidate.

## Chosen Direction

Use one locally stored SVG as the visual anchor. It will resemble a restrained QA release dossier: editorial typography, test-report structure, precise rules, and a small red QA accent. It should feel like a document made by someone who understands release quality, not a SaaS landing-page banner.

The remainder of the README stays native GitHub Markdown. Visual interest will come from hierarchy, varied section formats, concise copy, and the single authored graphic rather than repeated cards or decorative effects.

## Visual System

- **Palette:** warm paper, near-black ink, muted grey, and one controlled coral-red accent.
- **Typography:** dependable system serif for the editorial headline and system monospace for labels and QA metadata. No remote fonts.
- **Geometry:** square corners, fine rules, tight labels, and generous outer space. No gradients, glow, glass effects, blobs, or floating pills.
- **Theme safety:** the SVG has its own opaque neutral background so it remains legible in both GitHub light and dark themes.
- **Motion:** none. The profile should load instantly and remain readable without animation.

## Dossier Content

The SVG will contain only short, factual content:

- MK Jaswanth / QA Engineer;
- a direct positioning line about turning product risk into test coverage and useful evidence;
- the workflow: understand risk, design coverage, automate stable paths, report evidence;
- a compact QA Labs note connecting a real workflow problem to the product that was built;
- an `OPEN TO QA / AUTOMATION / SDET` label.

It will not contain invented pass rates, fake test counts, decorative charts, skill badges, social counters, or third-party data.

## README Structure

### 1. Visual introduction

The local dossier image appears first with meaningful alt text. Immediately below it are plain Portfolio, LinkedIn, and Email links so contact actions never depend on the graphic.

### 2. Short introduction

Keep the current first-person explanation, tightened to two compact paragraphs. It should establish manual, exploratory, regression, API, and browser automation experience and state the target roles.

### 3. QA Labs case file

Give QA Labs a different structure from the rest of the page:

- **Problem:** QA information scattered across spreadsheets, messages, and tools.
- **Build:** one test-management workspace for requirements, cases, coverage, runs, defects, reports, and history.
- **Why it matters:** it demonstrates product thinking and practical QA workflow design.

Use normal live-product and source links. Do not use a fake dashboard or fabricated product screenshot.

### 4. Selected evidence

Present the strongest repositories as a compact evidence table with columns for the work and what it proves. Include E-commerce Automation, the Playwright Pytest QA Skill, Portfolio, and BugAuraLabs. This section should scan differently from the QA Labs case file without becoming a card grid.

The user-provided experience of 4+ projects and 200+ test cases per project may appear as supporting text, not as a trophy metric.

### 5. Working toolkit

Use four short bold-label lines for Testing, Automation, Delivery, and Foundations. No icons or badges are required.

### 6. Quality approach

Keep three concrete bullets covering risk selection, exploratory-to-automation judgment, and reproducible defect evidence.

### 7. Personal note and contact

End with one natural sentence about music, travel, and reading, followed by the direct recruiting contact line.

## Asset Strategy

Create `assets/qa-release-dossier.svg` in this repository and reference it with a relative path. The SVG must be self-contained: no external fonts, CSS, images, scripts, or data requests.

Do not restore dynamic GitHub Stats, Top Languages, Streak, Trophy, typing-animation, view-counter, or maze endpoints. Those services previously produced upstream failures and are not necessary hiring evidence.

## Reliability and Accessibility

- Use useful alt text rather than repeating all SVG text.
- Keep essential identity, project, and contact information in Markdown as well as the visual.
- Ensure high contrast, adequate SVG text sizing, and a logical Markdown heading hierarchy.
- Avoid HTML layout that GitHub may sanitize unpredictably.
- Keep every claim traceable to the user's experience, a linked repository, or the live product.

## Verification

1. Render the SVG locally and inspect it at desktop and narrow widths.
2. Confirm the SVG has no external references and valid XML.
3. Run the `kill-ai-slop` scanner and manually review the output.
4. Confirm no dynamic analytics, badge, trophy, typing, or maze URL is present.
5. Check every relative file reference and public link.
6. Run `git diff --check` and inspect the final GitHub rendering after publishing.

## Success Criteria

- The profile has one recognizable QA-specific visual idea.
- A recruiter can understand the role, strongest product, relevant evidence, and contact path quickly.
- The page does not resemble a generic AI portfolio or a badge collection.
- No visual depends on a third-party renderer, so the authored design cannot break because an analytics service is unavailable.
- The profile remains concise, factual, and readable on mobile and in both GitHub themes.
