Fetch a GitHub issue by number, extract the plan description from the issue body, and implement it directly using agent mode.

**CRITICAL: This command fetches the issue and implements the plan described in the issue body. It WILL:**

- Fetch the issue using GitHub CLI
- Extract the plan from the entire issue body
- Proceed with implementation (make code changes, edit files, etc.)
- Follow the plan instructions to complete the implementation

Follow these steps carefully:

### 1. Verification & Prerequisites

- Check if GitHub CLI (`gh`) is installed by running `gh --version`. If not, stop and inform the user.
- Check authentication status with `gh auth status`. If not authenticated, prompt the user to run `gh auth login`.
- Verify we're in a git repository by running `git rev-parse --git-dir`. If not, stop and inform the user.

### 2. Get Issue Number

- **REQUIRE** the user to provide the GitHub issue number when invoking this command.
- If no issue number is provided, stop and inform the user that an issue number is required.
- Validate the issue exists using `gh issue view <number>`. If the issue doesn't exist, stop and inform the user with a clear error message.

### 3. Fetch Issue Details

- Fetch the issue using GitHub CLI:
  ```bash
  gh issue view <number> --json body,title,url,number
  ```
- Extract the following fields:
  - `body`: The entire issue body (this is the plan description)
  - `title`: The issue title (for context)
  - `url`: The issue URL (for reference)
  - `number`: The issue number
- If the command fails, stop and explain the error to the user.
- If the body is null or empty, stop and inform the user that the issue has no plan description.

### 4. Extract Plan Description

- Use the entire issue body as the plan description.
- The issue body contains the instructions for what needs to be implemented.
- Store the plan description for implementation.
- Display the issue title and URL to the user for context.

### 5. Implement the Plan

- **Proceed with implementation directly** - do NOT enter plan mode.
- Treat the issue body as instructions and implement them.
- Make necessary code changes, create/edit files, and complete the implementation as described in the plan.
- Follow the project's development standards:
  - Use absolute imports with `@/` prefix
  - Run `pnpm lint` and `pnpm format` after making changes
  - Use AbortController's signal for cleanup where applicable
  - Run `pnpm install` if dependencies are changed
- Continue until the implementation is complete according to the plan.

### 6. Validation

- After implementation, run `pnpm lint` at the root to check for linting errors.
- Run `pnpm format` to ensure code formatting is correct.
- If there are errors, fix them before considering the task complete.

### 7. Output

- Display a summary of what was implemented.
- Reference the issue number and URL.
- Confirm successful implementation.

### 8. Error Handling

- If any command fails, stop and explain the error to the user.
- If no issue number is provided, inform the user that an issue number is required.
- If the issue doesn't exist, provide a clear error message with the issue number.
- If the issue body is empty, inform the user that the issue has no plan description.
- If GitHub CLI authentication fails, provide clear instructions on how to authenticate.
- If implementation fails, provide clear error messages and guidance on what went wrong.
