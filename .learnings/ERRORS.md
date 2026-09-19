## [ERR-20260811-001] artifact_cleanup

**Logged**: 2026-08-11T23:03:00Z
**Priority**: low
**Status**: resolved
**Area**: tests

### Summary
Workspace policy rejects `rm -f` cleanup commands for generated browser-test artifacts.

### Error
```
rm -f style commands are not permitted. Use a safer approach
```

### Context
- Command or operation attempted: remove temporary Playwright screenshots and snapshots.
- Environment details: workspace command policy.

### Suggested Fix
Move temporary test artifacts outside the repository rather than deleting them in-place.

### Metadata
- Reproducible: yes
- Related Files: .playwright-cli/

### Resolution
- **Resolved**: 2026-08-11T23:03:00Z
- **Notes**: Future cleanup uses a temporary directory outside the repository.

---
