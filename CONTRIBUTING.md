# Contributing Guidelines

These are the guidelines you need to follow to contribute to the project.

You are **REQUIRED** to follow these guidelines otherwise your pull requests will **NOT BE ACCEPTED**!

## **Commit Guidelines**

### **Branch Naming**

- Use clear and descriptive branch names that explain the feature or fix you're working on.
  - Examples:
    - For features: `feat/add-login-page`
    - For bug fixes: `fix/fix-button-styling`
    - For refactoring: `refactor/update-helper-functions`
  - Avoid vague or generic names like `new-branch` or `test`.

### **Commit Messages**

- Write meaningful and concise commit messages using the following format:
  - **Bug fixes:** `fix: resolve issue with API call timeout`
  - **New features:** `feat: add user authentication module`
  - **Refactoring:** `refactor: optimize database queries`
  - **Documentation:** `docs: update README with setup instructions`
- Begin with a lowercase prefix (`fix:`, `feat:`, etc.) followed by a short description of your changes.

### **Build Before Committing**

- Run `npm run build` locally before committing:
  - This ensures that your code builds successfully and is error-free.
  - Running builds locally helps save time by avoiding repeated errors during the CI/CD pipeline.
  - Commit only if the build completes without errors.

## **Setting Up Pre-Commit Hooks**

To enforce code quality, this project uses **Husky** and **lint-staged** to run automated checks before each commit.

### **Enable Husky**

1. Run the following command to enable Husky in your project:

   ```bash
   npm run prepare
   ```

2. This will install Husky hooks, specifically the pre-commit hook, which runs lint-staged before every commit.

### **Configure lint-staged**

The lint-staged configuration is already included in the package.json file:

```json
"lint-staged": {
  "**/*.{js,jsx,ts,tsx}": [
    "eslint --fix",
    "prettier --write"
  ]
}
```

These tools ensure your code is linted and formatted correctly before it is committed.

## **Pull Request Guidelines**

### **Creating a Pull Request**

1. Ensure your branch is up-to-date with the main branch.
2. Submit a pull request (PR) for each feature, bug fix, or significant change.
3. Include the following in your PR:
    - **Title:** A short and clear title, e.g., `Add Login Page`
    - **Description:** A brief explanation of the changes you made and why.
    - **Link to Issues (if any):** Use keywords like Fixes #123 to link to GitHub issues.
4. Assign at least one reviewer and relevant labels to your PR. Labels are already provided

### **Review Process**

- Be responsive to feedback from reviewers.
- Make requested changes promptly and update the PR.
- After approval, the PR will be merged by the maintainers.

## **Code Style**

- Follow the existing coding standards in the repository.
- Use a linter (`npm run lint`) to ensure consistent formatting.
- Resolve all linting errors before committing your code.

## **General Workflow**

1. Fork the repository and create a local clone.
2. Create a branch for your feature or fix:

   ```bash
   git checkout -b feat/your-feature-name
   ```

3. Make your changes and commit them following the guidelines.
4. Push your branch to your fork:

    ```bash
    git push origin feat/your-feature-name
    ```

5. Create a pull request against the main repository.
6. Keep an eye on the main repository, and sync your fork and your local clone after every change on the main repository. Resolve merge conflicts if needed.

## **Additional Notes**

- Avoid making changes directly to the main branch.
- Keep your branches small and focused; large pull requests are harder to review.
- If you're unsure about any step, feel free to ask for help in the discussions or issue threads.