Analyze the changes in the current branch and perform a commit followed by creating a pull request on GitHub.

Follow these steps carefully:

### 1. Verification & Prerequisites

- Run `git status` to ensure there are uncommitted changes. If none, stop and inform the user.
- Run `git rev-parse --abbrev-ref HEAD` to get the current branch name.
- **CRITICAL:** If the current branch is `main` or `master`, stop and warn the user. They should be on a feature branch.
- Check if GitHub CLI (`gh`) is installed by running `gh --version`. If not, stop and inform the user.
- Check authentication status with `gh auth status`. If not authenticated, prompt the user to run `gh auth login`.

### 2. Generate Commit Message

- Run `git diff --cached` (if changes are staged) or `git diff` to analyze the changes.
- Automatically generate a descriptive commit message based on the modifications.
- Use the **Conventional Commits** format (e.g., `feat:`, `fix:`, `chore:`, `refactor:`, `docs:`).
- Keep the summary line under 50 characters and provide a body if the changes are complex.

### 3. Commit & Push

- If changes are not staged, run `git add .`.
- Commit the changes using the generated message: `git commit -m "<message>"`.
- Push the current branch to origin. If it's a new branch, use `git push -u origin <branch-name>`.

### 4. Create Pull Request

- Detect the default branch of the repository (usually `main` or `master`) using `gh repo view --json defaultBranchRef --template '{{.defaultBranchRef.name}}'`.
- Generate a PR title from the commit summary.
- Generate a detailed PR description including:
  - **Summary**: A brief overview of the changes.
  - **Key Changes**: A bulleted list of significant modifications.
  - **Testing**: A note on how the changes were tested (or if they need testing).
- Check if a PR already exists for this branch: `gh pr list --head <branch-name> --json url --jq '.[0].url'`.
- If a PR exists, inform the user and provide the link.
- If no PR exists, create one:
  ```bash
  gh pr create --title "<title>" --body "<description>" --base <default-branch>
  ```
- Output the URL of the created PR.

### 5. Error Handling

- If any command fails, stop and explain the error to the user.
- If there are merge conflicts when pushing, inform the user they need to resolve them manually.
