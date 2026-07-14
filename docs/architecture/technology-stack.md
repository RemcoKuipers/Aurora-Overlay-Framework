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