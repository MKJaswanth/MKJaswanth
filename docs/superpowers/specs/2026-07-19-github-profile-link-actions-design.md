# GitHub Profile — Link Action Treatment

**Date:** 2026-07-19  
**Status:** Direction approved; specification awaiting review

## Goal

Make important links easier to notice without adding badge clutter, external image services, or unsupported custom CSS.

## Chosen Treatment

Use GitHub-native `<kbd>` elements inside links for primary actions. These render as compact action keys in GitHub light and dark themes and require no images or dependencies.

Use the treatment selectively:

- Portfolio, LinkedIn, and Email below the introduction;
- Open QA Labs and View Source in the QA Labs case file;
- the final LinkedIn and Email contact actions.

Project titles inside the evidence table remain normal bold links with a `↗` marker. Repository source links use concise `Source ↗` labels. This creates hierarchy between primary actions and supporting navigation.

## Rules

- No coloured badge services or new SVG button assets.
- No emoji, icon wall, pill row, or decorative link for every noun.
- Use `↗` only for destinations that open an external page.
- Keep link labels explicit: `Open QA Labs`, `View Source`, `Portfolio`, `LinkedIn`, and `Email`.
- Preserve every current URL exactly.
- Ensure the raw Markdown remains understandable if GitHub changes the visual styling of `<kbd>`.

## Verification

1. Confirm GitHub preserves linked `<kbd>` elements in rendered README HTML.
2. Check all existing link destinations still return successfully.
3. Run the anti-slop scanner and confirm the action keys do not become badge spam.
4. Run `git diff --check` and inspect the live profile after publishing.

## Success Criteria

- Primary actions are visually distinct from body copy.
- Project links scan consistently in the evidence table.
- The README gains useful interaction hierarchy without introducing fragile assets or visual clutter.
