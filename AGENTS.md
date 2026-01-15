# AGENTS.md - Ralph Tracer Bullet

## Agent Instructions

This file guides AI coding agents working on the ralph-tracer-bullet project.

## Coding Standards

- Prioritize simple, clean, maintainable solutions over clever or complex ones
- Make minimal changes to achieve outcomes
- Avoid unrelated code modifications
- Preserve existing code comments unless provably incorrect
- Start all files with JSDoc comments prefixed with "ABOUTME:"
- Use evergreen comments without temporal references

## Fighting Entropy

Shortcuts create technical debt affecting the entire team. Patterns established now will be replicated; corners cut will be cut again. Leave the codebase better than you found it.

## Project Context

This is a tracer bullet project for validating Ralph-TUI and its dependencies.

Key files:
- `prd.json` - Project requirements and capabilities to validate
- `CLAUDE.md` - Claude-specific agent instructions
- `.claude/` - Claude configuration directory

## Build Instructions

(To be added when project has buildable code)

## Skills for Next.js + Vercel Development

### Recommended Skill Set (Minimal Viable)

Based on analysis of Vercel-labs tooling, here are the essential skills for building and deploying a basic Next.js app:

#### 1. vercel-deploy (Required)
**Source:** [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills)

Instant deployment to Vercel with no authentication required. Returns preview URL and claimable deployment link.

**Triggers:** "Deploy my app", "Deploy this to production", "Create a preview deployment"

**Usage:**
```bash
bash /mnt/skills/user/vercel-deploy/scripts/deploy.sh
```

**Output:** JSON with `previewUrl`, `claimUrl`, `deploymentId`, `projectId`

#### 2. agent-browser (Required)
**Source:** [vercel-labs/agent-browser](https://github.com/vercel-labs/agent-browser)

Headless browser automation CLI for verifying deployments work. 93% less context usage than Playwright MCP.

**Install:**
```bash
npm install -g agent-browser
agent-browser install  # Download Chromium
```

**Core workflow:**
```bash
agent-browser open <url>
agent-browser snapshot -i          # Get interactive elements as @refs
agent-browser click @e1
agent-browser fill @e2 "text"
agent-browser screenshot output.png
agent-browser close
```

**Use cases:** Smoke test deployments, fill forms, take screenshots, verify UI renders

#### 3. react-best-practices (Recommended)
**Source:** [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills/tree/react-best-practices)

40+ rules across 8 categories from Vercel Engineering. Focus on these critical categories:

**CRITICAL - Eliminating Waterfalls:**
- Parallelize with Promise.all()
- Defer awaits to branches where needed
- Use Suspense for streaming

**CRITICAL - Bundle Size:**
- Import directly, not through barrel files
- Dynamic imports for heavy components
- Preload on user interactions

**HIGH - Server Performance:**
- Cache with React.cache()
- Minimize serialized data to clients

### Optional Skills

#### 4. web-design-guidelines
100+ rules for accessibility, performance, UX auditing. Use when: "Review my UI", "Check accessibility", "Audit design"

### Skill Installation

For Claude Code:
```
/install-skill https://github.com/vercel-labs/agent-skills
```

For manual setup, copy skill folders to your project's `.claude/skills/` directory.

## Deployment to Vercel

### Phase 1: Tracer Bullet (Zero Auth)

Use the vercel-deploy skill for fast iteration:

```bash
bash /mnt/skills/user/vercel-deploy/scripts/deploy.sh
```

Returns JSON with `previewUrl` and `claimUrl`. No tokens needed.

### Phase 2: Persistent Project (GitHub Integration)

1. Go to vercel.com/new
2. Import GitHub repo
3. Auto-deploys on every push

**Configuration locations:**
| What | Where |
|------|-------|
| Build settings | `vercel.json` or Vercel Dashboard |
| Environment variables | Vercel Dashboard → Settings → Environment Variables |
| Domains | Vercel Dashboard |

### Phase 3: GitHub Actions (Optional - Full Control)

Only use if you need custom CI/CD (tests, lint before deploy).

**Required GitHub Secrets:**
- `VERCEL_TOKEN` - from vercel.com/account/tokens
- `VERCEL_ORG_ID` - from account settings or `.vercel/project.json`
- `VERCEL_PROJECT_ID` - from project settings or `.vercel/project.json`

**Workflow location:** `.github/workflows/deploy.yml`

```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]
env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm i -g vercel@latest
      - run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}
      - run: vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}
      - run: vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}
```

### Verify Deployment

After deploy, use agent-browser to smoke test:

```bash
agent-browser open <preview-url>
agent-browser snapshot -i
agent-browser screenshot verify.png
agent-browser close
```

## Landing the Plane (Session Completion)

When ending a work session, ALL steps are mandatory. Work is NOT complete until `git push` succeeds.

**Mandatory Workflow:**

1. **File issues for remaining work** - Create issues for follow-up tasks
2. **Run quality gates** (if code changed) - Tests, linters, builds
3. **Update issue status** - Close finished work, update in-progress items
4. **PUSH TO REMOTE:**
   ```bash
   git pull --rebase
   git push
   git status  # MUST show "up to date with origin"
   ```
5. **Verify** - All changes committed and pushed
6. **Hand off** - Provide context for next session

**Critical Rules:**
- Work is NOT complete until `git push` succeeds
- Never stop before pushing - that leaves work stranded locally
- Never say "ready to push when you are" - YOU must push
- If push fails, resolve and retry until it succeeds
