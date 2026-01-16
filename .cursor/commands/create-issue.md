Create a GitHub issue using the GitHub CLI from the provided issue text.

**CRITICAL: This command ONLY creates a GitHub issue. It MUST NOT:**

- Implement any fixes or solutions
- Make any code changes
- Modify any files in the repository
- Perform any actions beyond creating the issue

After creating the issue, STOP immediately. Do not proceed with any implementation or code modifications.

Follow these steps carefully:

### 1. Verification & Prerequisites

- Check if GitHub CLI (`gh`) is installed by running `gh --version`. If not, stop and inform the user.
- Check authentication status with `gh auth status`. If not authenticated, prompt the user to run `gh auth login`.

### 2. Parse Issue Text

- The user will provide the issue text when invoking this command.
- Extract the title from the first line of the provided text.
- Use the remaining lines (if any) as the issue body.
- If only one line is provided, use it as the title and leave the body empty.
- Trim any leading/trailing whitespace from both title and body.

### 3. Create Issue

- Create the issue using GitHub CLI:
  ```bash
  gh issue create --title "<title>" --body "<body>"
  ```
- If the body is empty, use:
  ```bash
  gh issue create --title "<title>"
  ```
- Capture the output URL of the created issue.

### 4. Output

- Display the URL of the created issue to the user.
- Confirm successful creation with a brief message.
- **STOP HERE** - Do not proceed with any code changes or implementation. The task is complete once the issue is created.

### 5. Error Handling

- If any command fails, stop and explain the error to the user.
- If the title is empty after parsing, inform the user that a title is required.
- If GitHub CLI authentication fails, provide clear instructions on how to authenticate.
