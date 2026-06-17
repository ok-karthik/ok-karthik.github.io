# 🤖 Agent Guidelines

Welcome to this repository. You are operating in a fully Agentic-Engineered environment.
Before making any changes to this codebase, you **MUST** read and adhere to the following:

## 1. Context References
- Read `ARCHITECTURE.md` for the overarching technical design, business logic, and component structure.
- Read the modular rule files in `.agent/rules/` for strict coding and testing constraints.
- Utilize the `.agent/skills/` directory whenever building new features or UI components to maintain consistency.

## 2. Core Behaviors
- **Always `git pull`**: Always perform a `git pull` before making any changes to ensure you are working with the latest codebase.
- **Never Push Without Approval**: Making local commits is perfectly acceptable, but you MUST NEVER push commits to the remote repository (e.g., `git push origin main`) without explicitly asking the user for permission first.
- **Explain Technical Details**: When making changes, fixes, or implementing new features, always break down the technical details and explain them clearly to the user. Do not blindly write code—educate the user on the "why" and "how".

## 3. Post-Commit Verification
- **Monitor CI Pipelines**: After committing code, you must actively monitor the GitHub Actions pipeline (using the GitHub MCP server or the `gh run list` / `gh run watch` CLI tools). If the pipeline fails, investigate the logs and immediately push a fix.
- **Live Production Validation**: Once the CI pipeline succeeds, verify that the deployment worked properly. Use your browser/web-fetching tools to test both production URLs:
  1. `https://karthik-orugonda.pages.dev`
  2. `https://ok-karthik.github.io`
  Ensure the changes are visible and no critical 500/404 errors occurred during the deployment. Crucially, perform **content validation**: search the fetched HTML/DOM for expected content (e.g., "Karthik Orugonda" or the specific UI component you changed). This prevents silent failures where GitHub Pages returns a 200 status but renders a blank or default error page.
