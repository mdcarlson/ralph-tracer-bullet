# CLAUDE.md - Ralph Tracer Bullet

## Agent Instructions

This file guides AI agents working on the ralph-tracer-bullet project.

## Coding Standards

- Prioritize simple, clean, maintainable solutions over clever or complex ones
- Make minimal changes to achieve goals
- Avoid unrelated code modifications
- Preserve existing comments unless demonstrably incorrect
- Start files with JSDoc explaining purpose, prefixed with "ABOUTME:"
- Keep comments timeless - no temporal references like "now", "recently", "todo for later"

## Fighting Entropy

This codebase will outlive you. Every shortcut becomes someone else's burden. Patterns established now will be replicated. Leave it better than you found it.

## Communication Style

Be extremely concise. Sacrifice grammar for the sake of concision.

## Project Context

This is a tracer bullet project for validating Ralph-TUI and its dependencies.

Key files:
- `prd.json` - Project requirements and capabilities to validate
- `.claude/` - Claude configuration directory

## Validation Focus

When testing capabilities, verify:
- Tool exists and is accessible
- Authentication works (if applicable)
- Basic operations succeed
- Error handling is sensible

## Landing the Plane (Session Completion)

When ending a work session, ALL steps are mandatory:

1. File issues for remaining work
2. Run quality gates (if code changed)
3. Update issue/task status
4. **PUSH TO REMOTE:**
   ```bash
   git pull --rebase
   git push
   git status  # MUST show "up to date with origin"
   ```
5. Verify all changes committed and pushed
6. Provide context for next session

**Critical rules:**
- Work is NOT complete until `git push` succeeds
- Never stop before pushing
- Never say "ready to push when you are" - YOU must push
- If push fails, resolve and retry until it succeeds
