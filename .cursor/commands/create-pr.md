Create a new branch from latest main with the issue number, commit local changes, and create a pull request on GitHub.

Follow these steps carefully:

### 1. Verification & Prerequisites

- Run `git status` to ensure there are uncommitted changes. If none, stop and inform the user.
- Check if GitHub CLI (`gh`) is installed by running `gh --version`. If not, stop and inform the user.
- Check authentication status with `gh auth status`. If not authenticated, prompt the user to run `gh auth login`.

### 2. Get Issue Number

- **REQUIRED:** Prompt the user for the GitHub issue number (format: just the number, e.g., "123").
- Validate that a non-empty issue number is provided. If not provided, stop and inform the user that an issue number is required.
- Store the issue number for use in the PR description and branch name.

### 3. Fetch Latest Main & Create Branch

- Detect the default branch of the repository (usually `main` or `master`) using `gh repo view --json defaultBranchRef --template '{{.defaultBranchRef.name}}'`.
- Fetch the latest changes from the default branch: `git fetch origin <default-branch>`.
- Check if the branch `fix/issue-<number>` already exists locally: `git show-ref --verify --quiet refs/heads/fix/issue-<number>`.
  - If it exists locally, stop and inform the user that the branch already exists.
- Check if the branch `fix/issue-<number>` already exists remotely: `git ls-remote --heads origin fix/issue-<number>`.
  - If it exists remotely, stop and inform the user that the branch already exists remotely.
- Create and checkout a new branch from the latest default branch: `git checkout -b fix/issue-<number> origin/<default-branch>`.

### 4. Generate Commit Message

- Run `git diff --cached` (if changes are staged) or `git diff` to analyze the changes on the newly created branch.
- Automatically generate a descriptive commit message based on the modifications.
- Use the **Conventional Commits** format (e.g., `feat:`, `fix:`, `chore:`, `refactor:`, `docs:`).
- Keep the summary line under 50 characters and provide a body if the changes are complex.

### 5. Commit & Push

- If changes are not staged, run `git add .`.
- Commit the changes using the generated message: `git commit -m "<message>"`.
- Push the new branch to origin with upstream tracking: `git push -u origin fix/issue-<number>`.

### 6. Create Pull Request

- Generate a PR title from the commit summary.
- Generate a detailed PR description including:
  - **Summary**: A brief overview of the changes.
  - **Key Changes**: A bulleted list of significant modifications.
  - **Testing**: A note on how the changes were tested (or if they need testing).
  - **Issue Reference**: Add "Closes #<issue-number>" at the end of the PR description (use the issue number collected in step 2).
- Check if a PR already exists for this branch: `gh pr list --head fix/issue-<number> --json url --jq '.[0].url'`.
- If a PR exists, inform the user and provide the link as a clickable markdown hyperlink: `[PR #<number>](<PR_URL>)`.
- If no PR exists, create one:
  ```bash
  gh pr create --title "<title>" --body "<description>" --base <default-branch>
  ```
  (Use the default branch detected in step 3.)
- Capture the PR URL from the output.
- Display the PR URL as a clickable markdown hyperlink: `[<PR Title>](<PR_URL>)`.
- Also display the raw URL for reference.

### 7. Error Handling

- If any command fails, stop and explain the error to the user.
- If fetching the default branch fails, stop and inform the user to check their network connection and repository access.
- If the branch `fix/issue-<number>` already exists locally or remotely, stop and inform the user that the branch already exists.
- If creating or checking out the new branch fails, stop and explain the error to the user.
- If there are merge conflicts when pushing, inform the user they need to resolve them manually.
- If the issue number is not provided or invalid, stop and inform the user that a valid issue number is required.
