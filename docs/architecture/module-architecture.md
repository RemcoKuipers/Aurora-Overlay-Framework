# Module Architecture

## Purpose

The Module Architecture describes how Aurora Overlay Framework is divided into independent software modules and how
these modules collaborate to form the complete application.

Unlike the Domain Model, which focuses on business concepts such as Projects, Scenes, Widgets and Themes, the Module
Architecture focuses on the technical structure of the software itself.

The goals of this architecture are to:

- Separate responsibilities into well-defined modules.
- Reduce coupling between different parts of the application.
- Increase maintainability and testability.
- Enable future extensibility through plugins and additional modules.
- Provide a clear foundation for implementation and future growth.

Each module has a single primary responsibility and communicates with other modules through clearly defined interfaces.
This approach keeps the architecture modular, scalable and easier to evolve over time.

## Architectural Principles

The architecture of Aurora Overlay Framework is guided by a small set of architectural principles. These principles
provide consistency throughout the project and serve as the foundation for future design and implementation decisions.

### Modularity

The application is divided into independent modules, each with a clearly defined responsibility. Modules should remain
focused on their own domain and avoid unnecessary knowledge of other modules.

### Single Responsibility

Each module should have one primary purpose. Changes to a module should be driven by changes to a single area of
functionality rather than multiple unrelated concerns.

### Low Coupling

Modules should minimize direct dependencies on one another. Communication between modules should occur through
well-defined interfaces or services whenever possible.

### High Cohesion

Related functionality should be grouped together within the same module. Responsibilities that belong together should
evolve together.

### Extensibility

The architecture should allow new functionality to be added without modifying existing modules whenever possible. Future
extensions such as plugins, exporters, widgets or themes should integrate through defined extension points.

### Interface-Driven Design

Modules depend on contracts rather than concrete implementations. This improves maintainability, testability and
flexibility while reducing implementation dependencies.

### Developer Experience

The project should remain approachable for contributors by maintaining a clear project structure, consistent naming
conventions and predictable coding patterns. Readability and maintainability are considered first-class design goals.

## High-Level Module Diagram

Aurora Overlay Framework is organized around a central Core module that coordinates communication between the
application's functional modules.

Each module is responsible for a specific area of the application and focuses on a single concern. This separation
reduces coupling, improves maintainability and allows individual modules to evolve independently.

The Core acts as the central coordination layer. User interactions, project operations and system events are routed
through the Core, which delegates work to the appropriate module.

Shared functionality such as common types, utilities and reusable components is provided through the Shared module and
can be used by all other modules.