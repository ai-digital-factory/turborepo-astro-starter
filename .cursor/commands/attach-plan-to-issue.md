Attach a plan from an MD file to an existing GitHub issue by appending the plan content to the issue body.

**CRITICAL: This command ONLY updates the GitHub issue. It MUST NOT:**

- Implement any fixes or solutions
- Make any code changes
- Modify any files in the repository (except reading the plan file)
- Perform any actions beyond updating the issue

After updating the issue, STOP immediately. Do not proceed with any implementation or code modifications.

Follow these steps carefully:

### 1. Verification & Prerequisites

- Check if GitHub CLI (`gh`) is installed by running `gh --version`. If not, stop and inform the user.
- Check authentication status with `gh auth status`. If not authenticated, prompt the user to run `gh auth login`.
- Verify we're in a git repository by running `git rev-parse --git-dir`. If not, stop and inform the user.

### 2. Get Issue Number

- **REQUIRE** the user to provide the GitHub issue number when invoking this command.
- If no issue number is provided, stop and inform the user that an issue number is required.
- Validate the issue exists using `gh issue view <number>`. If the issue doesn't exist, stop and inform the user with a clear error message.

### 3. Find Plan Files

- Search for `.md` files in `.cursor/plans/` directory first. If the directory doesn't exist, create it but don't fail.
- If no plan files found in `.cursor/plans/`, fallback to searching the root directory for plan-like files matching patterns: `*plan*.md`, `plan.md`, or any `.md` file in the root.
- Sort all found plan files by modification time (most recent first) using `ls -t` or similar.
- If no plan files are found, stop and inform the user that no plan files were found.
- If multiple plan files are found:
  - List them with their modification times
  - Use the most recent one automatically, or prompt the user to select one if preferred
- Store the selected plan file path for reading.

### 4. Read Plan Content

- Read the content of the selected plan file.
- If the file cannot be read or is empty, stop and inform the user with an error message.
- Store the plan content for later use.

### 5. Fetch Current Issue Body

- Fetch the current issue body using: `gh issue view <number> --json body --jq '.body'`
- If the command fails, stop and explain the error to the user.
- Store the current body content. If the body is null or empty, treat it as an empty string.

### 6. Combine Content

- Append the plan content to the existing issue body with a clear separator.
- Use the following format:

  ```
  <existing-body>

  ---

  ## Plan

  <plan-content>
  ```

- If the existing body is empty, start directly with `## Plan\n\n<plan-content>`.
- Ensure proper markdown formatting is preserved.

### 7. Update Issue

- Create a temporary file to store the combined content if the body is too large for command line arguments.
- Update the issue using one of these methods:
  - If body is small: `gh issue edit <number> --body "<combined-content>"`
  - If body is large: `gh issue edit <number> --body-file <temp-file>`
- Properly escape special characters (quotes, newlines, etc.) when passing to CLI.
- If using a temp file, clean it up after the update.
- Capture the output URL of the updated issue.

### 8. Output

- Display the URL of the updated issue to the user.
- Confirm successful update with a brief message indicating the plan was attached.
- **STOP HERE** - Do not proceed with any code changes or implementation. The task is complete once the issue is updated.

### 9. Error Handling

- If any command fails, stop and explain the error to the user.
- If no issue number is provided, inform the user that an issue number is required.
- If the issue doesn't exist, provide a clear error message with the issue number.
- If no plan files are found, inform the user where the command searched and suggest creating a plan file.
- If GitHub CLI authentication fails, provide clear instructions on how to authenticate.
- If the plan file cannot be read, inform the user with the file path and error details.
