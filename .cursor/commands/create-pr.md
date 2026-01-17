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

### 5. Update README Files with Changelog

- After generating the commit message (Step 4), analyze the git diff to identify which README files need updating:
  - Check if changes affect root-level files → update `README.md`
  - Check if changes affect files in `apps/<app-name>/` → update `apps/<app-name>/README.md`
  - Check if changes affect files in `packages/<package-name>/` → update `packages/<package-name>/README.md` (if it exists)
- For each README that needs updating:
  - Read the current README file
  - Analyze the git diff to extract meaningful changes (features added, bugs fixed, dependencies updated, etc.)
  - Generate a changelog entry in **Conventional Commits** format with:
    - Date (current date in YYYY-MM-DD format)
    - Type prefix (feat, fix, chore, refactor, docs, etc.) matching the commit message
    - Brief description of the change
  - Add the changelog entry to a "## Changelog" section:
    - If the section doesn't exist, create it at the end of the README (before "## Learn More" if present, or at the end)
    - If it exists, prepend the new entry at the top of the changelog section
    - Format: `### YYYY-MM-DD` followed by bullet points with `- **Type**: Description`
- Stage the updated README files: `git add <path-to-readme>`
- If no README files exist for affected directories, skip silently

### 6. Commit & Push

- Note that README files are already staged from Step 5.
- If changes are not staged, run `git add .` as a fallback for any other unstaged changes.
- Commit the changes using the generated message: `git commit -m "<message>"`.
- Push the new branch to origin with upstream tracking: `git push -u origin fix/issue-<number>`.

### 7. Create Pull Request

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

### 8. Checkout Main & Fetch Latest

- After successfully creating the PR (Step 7), checkout to the default branch detected in Step 3: `git checkout <default-branch>`.
- Fetch the latest changes from origin: `git fetch origin <default-branch>` (this updates remote-tracking refs).
- Fast-forward the local branch to match the remote: `git merge --ff-only origin/<default-branch>` (this actually moves the local branch to the remote tip).
- This ensures the local main branch is up-to-date after PR creation.
- Handle errors gracefully (e.g., if checkout fails due to uncommitted changes in the feature branch, inform the user but don't stop the process).

### 9. Error Handling

- If any command fails, stop and explain the error to the user.
- If fetching the default branch fails, stop and inform the user to check their network connection and repository access.
- If the branch `fix/issue-<number>` already exists locally or remotely, stop and inform the user that the branch already exists.
- If creating or checking out the new branch fails, stop and explain the error to the user.
- If there are merge conflicts when pushing, inform the user they need to resolve them manually.
- If the issue number is not provided or invalid, stop and inform the user that a valid issue number is required.
- For README update operations (Step 5):
  - If reading a README file fails, log a warning but continue (don't stop the process)
  - If writing a README file fails, stop and inform the user
  - If the README file is read-only or has permission issues, inform the user
- For checkout and fetch operations (Step 8):
  - If checkout fails due to uncommitted changes in the feature branch, inform the user but don't stop the process (the PR was already created successfully)
  - If checkout fails for other reasons, inform the user but don't stop the process (the PR was already created successfully)
  - If fetch fails, inform the user but don't stop the process (the PR was already created successfully)
  - If fast-forward merge fails (e.g., local branch has diverged or has uncommitted changes), inform the user but don't stop the process (the PR was already created successfully)
