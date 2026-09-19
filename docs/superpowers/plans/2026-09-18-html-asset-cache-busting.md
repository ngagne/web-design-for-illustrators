# HTML Asset Cache-Busting Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Append `?20260912` to every unversioned local CSS and JavaScript URL reference in every HTML file.

**Architecture:** Make a surgical text-only update to existing HTML asset attributes. Preserve existing `?20260912` references, HTML formatting, and all non-CSS/JS URLs.

**Tech Stack:** Static HTML, shell search tools, Git.

---

### Task 1: Add the cache-busting suffix to local asset references

**Files:**
- Modify: `index.html`
- Modify: `reference/screen-design-field-notes.html`
- Modify: `lessons/0001-whitespace-is-composition.html`
- Modify: `lessons/0002-visual-hierarchy.html`
- Modify: `lessons/0003-grids-and-alignment.html`
- Modify: `lessons/0004-typography-as-voice.html`
- Modify: `lessons/0005-colour-and-contrast.html`
- Modify: `lessons/0006-balance-rhythm-and-grouping.html`
- Modify: `lessons/0007-responsive-composition.html`
- Modify: `lessons/0008-designing-interaction.html`
- Modify: `lessons/0009-graphic-systems.html`
- Modify: `lessons/0010-capstone-critique-loop.html`

- [ ] **Step 1: Inventory all local CSS and JavaScript references**

Run:

```bash
rg -n '(?:href|src)=["'\''][^"'\'']+\.(?:css|js)(?:\?[^"'\'']*)?["'\'']' --glob '**/*.html'
```

Expected: the 12 HTML files above are listed, with existing `?20260912`
references visible in `index.html`, `lessons/0001-whitespace-is-composition.html`,
and `lessons/0002-visual-hierarchy.html`.

- [ ] **Step 2: Append the suffix only to unversioned local CSS/JS URLs**

For each matching local asset attribute, change:

```html
href="assets/course.css"
src="../assets/course.js"
```

to:

```html
href="assets/course.css?20260912"
src="../assets/course.js?20260912"
```

Leave these already-versioned values unchanged:

```html
href="assets/course.css?20260912"
src="../assets/course.js?20260912"
```

Do not modify favicon references, external URLs, anchor links, or surrounding
HTML formatting.

- [ ] **Step 3: Confirm every local CSS/JS reference is versioned**

Run:

```bash
rg -n '(?:href|src)=["'\''][^"'\'']+\.(?:css|js)(?:\?[^"'\'']*)?["'\'']' --glob '**/*.html' | rg -v '\?20260912["'\'']'
```

Expected: no output.

- [ ] **Step 4: Confirm no duplicate suffixes were introduced**

Run:

```bash
rg -n '\?20260912\?20260912|\.css\?[^"'\'' ]+\?20260912|\.js\?[^"'\'' ]+\?20260912' --glob '**/*.html'
```

Expected: no output.

- [ ] **Step 5: Review the final diff**

Run:

```bash
git diff --check
git diff --stat
git diff -- '*.html'
```

Expected: only local `.css` and `.js` URL values change in the listed HTML
files; no whitespace or unrelated content changes appear.
