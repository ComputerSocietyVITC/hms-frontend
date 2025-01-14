# Frontend for Hackathon Management System (HMS)

This project is built with Next.js and uses several modern development tools, including pre-commit hooks, Storybook for component development, and more. Below you'll find a guide on how to set up and run the project, along with instructions on adding stories for components and configuring necessary pre-commit hooks.

> Refer to the [CONTRIBUTING.md](https://github.com/ComputerSocietyVITC/hms-frontend/blob/master/CONTRIBUTING.md) before starting out development and working on the project.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Setting Up Pre-Commit Hooks](#setting-up-pre-commit-hooks)
- [Building Components](#building-components)
- [Running the Project](#running-the-project)
- [Commit Guidelines](#commit-guidelines)
- [Conclusion](#conclusion)

## Getting Started

Follow these steps to get the development environment up and running:

1. **Fork the repository**

   Click the Fork button at the top right corner of the repository to create a copy of the project in your GitHub account.

2. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/hms-frontend.git
   cd hms-frontend
   ```

3. **Create a new branch**

   Create a new branch for your changes:

   ```bash
   git checkout -b feat/your-feature-name
   ```

   Replace `your-feature-name` with a meaningful name that describes the feature you're working on.

4. **Install dependencies**

   Run the following command to install all necessary dependencies for the project:

   ```bash
   npm install
   ```

## Prerequisites

Before setting up pre-commit hooks and Storybook, make sure you have the following installed:

- Node.js
- npm

If you don't have these installed, download and install them from [Node.js Official Website](https://nodejs.org/).

## Setting Up Pre-Commit Hooks

This project uses Husky and lint-staged to enforce code quality before each commit. Here’s how to set up the pre-commit hooks:

1. **Enable Husky**

   Husky needs to be enabled in your project. Run the following:

   ```bash
   npm run prepare
   ```

   This will install Husky hooks into your project, specifically the pre-commit hook that will run lint-staged before every commit.

2. **Configure lint-staged**

   Lint-staged is configured to run ESLint, Prettier, and other tools on staged files before commit. The configuration is already set in package.json as follows:

   ```json
   "lint-staged": {
    "**/*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ]
   }
   ```

## Building Components

This project uses shadcn/ui for building components. You don't need to install it separately as it's already included in the project dependencies.

To add a new component, you need to refer to the shadcn/ui documentation. For example, to add a button component, you can use the following code:

```bash
npx shadcn@latest add button
```

This will add a new button component to the components directory. You can then import and use this component in the project.

You can add more components using the same command. Refer to the [shadcn/ui documentation](https://ui.shadcn.com/docs) for more details.

For further development, you will need to pick up issues from the GitHub repository and work on them.

## Running the Project

Once everything is set up, you can run the project locally for development and production builds.

1. **Development**

   For running the project in development mode, use:

   ```bash
   npm run dev
   ```

   This will start the Next.js development server, and you can view the project at http://localhost:3000.

2. **Build for Production**

   To build the project for production:

   ```bash
   npm run build
   ```

   After building, you can start the production server:

   ```bash
   npm run start
   ```

   This will serve the app on http://localhost:3000 with optimized production code.

## Commit Guidelines

To maintain a clean and consistent commit history, follow these guidelines:

- **Branch Naming**: Use meaningful branch names that describe the feature or bug you're working on. For example, `feat/add-login-page` or `fix/fix-button-styling`.
- **Commit Messages**: Use meaningful commit messages that describe the changes you've made. If you're fixing a bug, use `fix: bug description`. For adding a new feature, use `feat: feature description`. For refactoring, use `refactor: description`.
- **Always build before committing**: Make sure to run `npm run build` before committing your changes. This ensures that the code is error-free and builds successfully. Even though it will run automatically on a Pull Request, it's a good practice to run it locally.
- **Pull Requests**: Create a pull request for each feature or bug fix. Add a meaningful title and description to the PR. Assign reviewers and labels as needed.

## Conclusion

The project is built with Next.js, Husky (for pre-commit hooks), and Storybook (for component-driven development). Follow the steps in this README to set up your development environment, add component stories, and run the project locally.

If you have any issues or need additional guidance, feel free to reach out!
