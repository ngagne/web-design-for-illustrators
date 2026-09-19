# HTML Asset Cache-Busting Design

## Goal

Ensure every local CSS and JavaScript asset referenced by an HTML file uses the
cache-busting query string `?20260912`, while preserving references that already
use that exact suffix.

## Scope

- Process all `*.html` files beneath the repository root.
- Update local `href` and `src` references whose URL path ends in `.css` or
  `.js`.
- Leave existing `?20260912` references unchanged.
- Do not modify external URLs, favicon or image references, anchors, or HTML
  formatting outside the targeted URL values.

## Implementation

Use a surgical text replacement over the HTML files. The replacement will
append `?20260912` only to unversioned local CSS and JavaScript URLs. This keeps
the change limited to the asset references and avoids parser-driven
reformatting.

## Validation

After the replacement:

1. Inspect all local CSS and JavaScript references in every HTML file.
2. Confirm each ends in `?20260912`.
3. Confirm no duplicate query suffixes were introduced.
4. Review the Git diff to ensure only intended HTML URL changes are present.
