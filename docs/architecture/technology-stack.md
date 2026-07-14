# Technology Stack

## Purpose

The Technology Stack defines the technologies, tools and development standards used to build Aurora Overlay Framework.

Rather than selecting technologies based on popularity, every choice is evaluated against the architectural principles
and long-term goals of the project.

The selected technologies should:

- Support a modular architecture.
- Encourage maintainability.
- Provide a productive developer experience.
- Enable future extensibility.
- Minimize unnecessary complexity.
- Support long-term sustainability.

Every technology decision must align with the architectural principles established in the Module Architecture.

## Selection Criteria

Technologies selected for Aurora Overlay Framework should satisfy the following criteria:

- Mature and well-supported.
- Open source whenever possible.
- Strong TypeScript support.
- Excellent developer tooling.
- Modular by design.
- Cross-platform compatibility.
- Active community.
- Long-term maintainability.

## TypeScript

### Purpose

TypeScript is the primary programming language used throughout Aurora Overlay Framework.

It provides static typing, interfaces and modern language features that support the project's modular architecture and
improve long-term maintainability.

### Why TypeScript

Aurora is designed as a modular framework consisting of independent modules that communicate through well-defined
contracts.

TypeScript enables these architectural principles by providing:

- Strong static type checking.
- Explicit interfaces and contracts.
- Improved refactoring support.
- Excellent IDE integration.
- Early error detection during development.
- Improved code readability and maintainability.

These capabilities align directly with Aurora's architectural goals of modularity, extensibility and developer
experience.

### Alternatives Considered

#### JavaScript

JavaScript offers maximum flexibility but lacks built-in static typing.

As Aurora grows into a modular framework with multiple packages and extension points, maintaining consistency without
static types becomes increasingly difficult.

### Decision

TypeScript has been selected as the primary language for Aurora Overlay Framework because it provides the best balance
between developer productivity, maintainability and architectural scalability.

Its strong support for interfaces and type safety makes it particularly well suited for the modular architecture
established during Sprint 2.

## React

### Purpose

React is the frontend framework used to build Aurora Overlay Framework's user interface.

It provides a component-based architecture that enables reusable, maintainable, and interactive user interface elements.

### Why React

Aurora is an interactive application consisting of configurable views, editors, and reusable interface components such
as widgets, property panels, theme editors, and project management screens.

React supports this architecture by providing:

- A component-based architecture that encourages reusable UI elements.
- Efficient rendering for highly interactive user interfaces.
- Predictable state-driven rendering.
- Excellent integration with TypeScript.
- A mature ecosystem with long-term community support.
- A solid foundation for building scalable frontend applications.

## Vite

### Purpose

Vite is the build tool and development server used for Aurora Overlay Framework.

It provides a fast development environment and an optimized production build process.

### Why Vite

Aurora is expected to grow into a large frontend application with multiple modules, editors, and reusable components.
Fast startup times and efficient incremental builds improve the overall development experience and support rapid
iteration.

Vite supports these goals by providing:

- Fast project startup through native ES modules.
- Instant Hot Module Replacement (HMR).
- Optimized production builds.
- Excellent integration with React and TypeScript.
- A modern and lightweight development workflow.

## Tailwind CSS

### Purpose

Tailwind CSS is the utility-first CSS framework used to build Aurora Overlay Framework's user interface.

It enables consistent, maintainable, and responsive styling throughout the application.

### Why Tailwind CSS

Aurora contains a large number of reusable interface components, including editors, configuration panels, dialogs,
toolbars, and preview windows. Maintaining a consistent visual design across these components is essential for usability
and long-term maintainability.

Tailwind CSS supports these goals by providing:

- A utility-first approach that encourages reusable styling patterns.
- Consistent spacing, typography, and color usage.
- Responsive design without complex custom CSS.
- Easy customization through a centralized design configuration.
- Reduced CSS duplication and improved maintainability.

## React Router

### Purpose

React Router is used to manage navigation within Aurora Overlay Framework.

It enables the application to function as a Single Page Application (SPA) while providing clear navigation between
different views.

### Why React Router

Aurora consists of multiple functional areas, including project management, scene editing, theme customization, overlay
configuration, and application settings. Managing these features within a Single Page Application provides a seamless
user experience while maintaining a consistent application state.

React Router supports these goals by providing:

- Client-side navigation without full page reloads.
- A clear and scalable routing structure.
- Better separation between application views.
- Deep linking to specific application sections.
- Excellent integration with React.

## Zustand

### Purpose

Zustand is the global state management library used by Aurora Overlay Framework.

It provides a simple and scalable solution for sharing application state across independent components.

### Why Zustand

Aurora contains multiple editors and configuration panels that need access to shared application data, such as the
active project, selected scene, current theme, user preferences, and editor state.

Zustand supports these architectural requirements by providing:

- Lightweight global state management.
- Minimal boilerplate and straightforward APIs.
- Efficient state updates with selective component re-rendering.
- Excellent integration with React and TypeScript.
- A scalable solution that remains easy to maintain as the application grows.

## Zod

### Purpose

Zod is the schema validation library used by Aurora Overlay Framework.

It validates external data and user input at runtime to ensure data integrity throughout the application.

### Why Zod

Aurora imports and exports project files, processes user input, and manages complex configuration objects. Since
TypeScript only provides compile-time type checking, runtime validation is required to verify that external data matches
the expected structure.

Zod supports these architectural requirements by providing:

- Runtime validation of external data.
- Type-safe schema definitions.
- Automatic TypeScript type inference.
- Clear and consistent validation rules.
- Improved application reliability by preventing invalid data from entering the system.

## Vitest

### Purpose

Vitest is the unit testing framework used by Aurora Overlay Framework.

It verifies the correctness of individual functions, components, and modules throughout the application.

### Why Vitest

Aurora consists of multiple independent modules that are expected to evolve over time. Automated unit testing helps
ensure that new changes do not introduce regressions and that individual components continue to behave as expected.

Vitest supports these goals by providing:

- Fast test execution.
- Excellent integration with Vite.
- Built-in TypeScript support.
- A familiar testing API.
- Reliable automated verification of application logic.

## Playwright

### Purpose

Playwright is the end-to-end testing framework used by Aurora Overlay Framework.

It validates complete user workflows by simulating real user interactions within the application.

### Why Playwright

Aurora provides an interactive user interface where multiple components work together. Features such as project
creation, scene editing, widget configuration, theme customization, and project export involve complete user workflows
that cannot be fully verified through unit tests alone.

Playwright supports these architectural requirements by providing:

- Automated end-to-end testing across the application.
- Reliable browser automation.
- Verification of complete user workflows.
- Cross-browser testing capabilities.
- Early detection of integration issues.

## ESLint

### Purpose

ESLint is the static code analysis tool used by Aurora Overlay Framework.

It helps enforce coding standards and detects potential issues before the application is built or deployed.

### Why ESLint

Aurora is designed as a long-term, maintainable project with a modular architecture. Consistent coding standards improve
readability, reduce defects, and make collaboration easier as the codebase grows.

ESLint supports these goals by providing:

- Automated detection of common programming errors.
- Consistent coding standards across the project.
- Early identification of potential issues.
- Improved code readability and maintainability.
- Excellent integration with TypeScript and React.

## Prettier

### Purpose

Prettier is the code formatting tool used by Aurora Overlay Framework.

It automatically formats source code according to a consistent set of styling rules.

### Why Prettier

Aurora is intended to remain maintainable as the project grows and potentially accepts contributions from multiple
developers. Consistent code formatting improves readability, reduces unnecessary differences in version control, and
allows developers to focus on functionality rather than formatting.

Prettier supports these goals by providing:

- Automatic and consistent code formatting.
- Improved readability across the codebase.
- Reduced formatting-related merge conflicts.
- Better collaboration between contributors.
- Seamless integration with ESLint and modern development tools.

## npm

### Purpose

npm is the package manager used by Aurora Overlay Framework.

It manages project dependencies, development tools, and build scripts required to develop, test, and maintain the
application.

### Why npm

Aurora relies on a modern frontend ecosystem consisting of numerous third-party libraries and development tools.
Managing these dependencies consistently is essential for reproducible builds and efficient collaboration.

npm supports these goals by providing:

- Centralized dependency management.
- Reproducible project installations.
- Standardized project scripts.
- Access to a large ecosystem of open-source packages.
- Seamless integration with the modern JavaScript and TypeScript ecosystem.

## Git & GitHub

### Purpose

Git is the version control system used by Aurora Overlay Framework, while GitHub serves as the central platform for
source code hosting, collaboration, and project management.

Together, they provide a structured and traceable development workflow throughout the project lifecycle.

### Why Git & GitHub

Aurora is developed using a structured workflow that emphasizes incremental development, documentation, and
maintainability. Version control is essential for tracking architectural decisions, managing feature development, and
maintaining a reliable project history.

Git and GitHub support these goals by providing:

- Distributed version control.
- Traceable commit history.
- Branch-based development workflows.
- Pull requests and code review support.
- Secure cloud-based repository hosting.
- Integrated project documentation and issue tracking.

## GitHub Actions

### Purpose

GitHub Actions is the continuous integration (CI) platform used by Aurora Overlay Framework.

It automates quality assurance tasks such as building, testing, and validating the project whenever changes are pushed
to the repository.

### Why GitHub Actions

Aurora follows a structured development workflow where code quality and maintainability are essential. Automating
repetitive development tasks helps ensure that every change is validated consistently before becoming part of the
project's history.

GitHub Actions supports these goals by providing:

- Automated build verification.
- Automated test execution.
- Consistent quality checks.
- Integration with GitHub pull requests.
- A scalable foundation for future deployment pipelines.