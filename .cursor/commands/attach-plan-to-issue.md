Attach a plan from an MD file to an existing GitHub issue by appending the plan content to the issue body.

**CRITICAL: This command ONLY updates the GitHub issue. It MUST NOT:**

- Implement any fixes or solutions
- Make any code changes
- Modify any files in the repository (except creating/deleting temporary plan files in `.cursor/plans/` directory)
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

### 3. Save Plan Content

- **REQUIRE** plan content to be provided (from `mcp_create_plan` tool output or user input).
- Create `.cursor/plans/` directory if it doesn't exist using `mkdir -p .cursor/plans/`.
- Save the plan content to a file named `.cursor/plans/plan-<issue-number>.md` (e.g., `plan-123.md`).
- Store the plan file path for later cleanup.
- If the file cannot be written, stop and inform the user with an error message.

### 4. Find Plan Files

- Use the plan file path from step 3 (`.cursor/plans/plan-<issue-number>.md`).
- Verify the file exists. If it doesn't exist, stop and inform the user with an error message.
- Store the plan file path for reading and later cleanup.

### 5. Read Plan Content

- Read the content of the selected plan file.
- If the file cannot be read or is empty, stop and inform the user with an error message.
- Store the plan content for later use.

### 6. Fetch Current Issue Body

- Fetch the current issue body using: `gh issue view <number> --json body --jq '.body'`
- If the command fails, stop and explain the error to the user.
- Store the current body content. If the body is null or empty, treat it as an empty string.

### 7. Combine Content

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

### 8. Update Issue

- Create a temporary file to store the combined content if the body is too large for command line arguments.
- Update the issue using one of these methods:
  - If body is small: `gh issue edit <number> --body "<combined-content>"`
  - If body is large: `gh issue edit <number> --body-file <temp-file>`
- Properly escape special characters (quotes, newlines, etc.) when passing to CLI.
- If using a temp file, clean it up after the update.
- Capture the output URL of the updated issue.
- Store a flag indicating successful update for cleanup step.

### 9. Cleanup Plan File

- After successful issue update, delete the plan file from `.cursor/plans/` using `rm .cursor/plans/plan-<issue-number>.md`.
- If the deletion fails, log a warning but don't fail the entire operation (the plan was already attached to the issue).
- Only attempt deletion if the issue update was successful.

### 10. Output

- Display the URL of the updated issue to the user.
- Confirm successful update with a brief message indicating the plan was attached.
- **STOP HERE** - Do not proceed with any code changes or implementation. The task is complete once the issue is updated.

### 11. Error Handling

- If any command fails, stop and explain the error to the user.
- If no issue number is provided, inform the user that an issue number is required.
- If the issue doesn't exist, provide a clear error message with the issue number.
- If plan content is not provided, inform the user that plan content is required.
- If the plan file cannot be written to `.cursor/plans/`, inform the user with the file path and error details.
- If the plan file cannot be read, inform the user with the file path and error details.
- If GitHub CLI authentication fails, provide clear instructions on how to authenticate.
- If the plan file deletion fails during cleanup, log a warning but don't fail the operation (the plan was already attached to the issue).
- Ensure cleanup happens even if some operations fail (attempt to delete the plan file even if there were errors, as long as the issue was updated).
