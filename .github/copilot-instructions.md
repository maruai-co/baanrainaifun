---
applyTo: "**"
---
# Farm-to-Table Platform Coding Standards

## General Principles
- Write clear, maintainable, and well-documented code.
- Prioritize readability and simplicity.
- Use type hints and docstrings for all Python functions and classes.

## Naming Conventions
- Use PascalCase for FastAPI route classes, Pydantic models, and TypeScript/React components.
- Use camelCase for variables, functions, and methods in both Python and TypeScript.
- Prefix private class members with an underscore (_).
- Use ALL_CAPS for constants.

## Python (Backend)
- Use async/await for I/O-bound operations in FastAPI.
- Always use try/except blocks for error handling in async functions.
- Log errors with contextual information using Python's logging module.
- Organize code into routers, models, and services for clarity and separation of concerns.
- Use Poetry for dependency management.

## TypeScript/Next (Frontend)
- Use PascalCase for Next.js components and interfaces.
- Use camelCase for props, state, variables, and functions.
- Implement error boundaries for Next.js components.
- Use functional components and hooks.
- Use Tailwind CSS for styling.

## Internationalization
- Support both Thai and English in user-facing text.

## Git & Project Structure
- Commit small, focused changes with clear messages.
- Follow the conventional commit format: `type(scope): subject` (e.g., `feat(farmer-portal): add crop management feature`).
- **Existing commit scopes:** `homepage`, `deploy`, `404`
- If your change does not fit an existing commit scope, update this list with the new scope in the coding standards before committing.
- Exclude environment files, build artifacts, and secrets using .gitignore.
- Follow the documented folder structure in the project README.

## Security
- Never commit secrets or credentials.
- Validate and sanitize all user input on both frontend and backend.

## Testing
- Write unit and integration tests for critical logic.
- Use pytest for backend and React Testing Library for frontend.

