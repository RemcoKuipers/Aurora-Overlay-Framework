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

Shared functionality such as common types, utilities and reusable components is provided by the Shared module. These
resources may be used by other modules where appropriate, while avoiding unnecessary dependencies.

```text
                    Aurora Overlay Framework

                          +-------------+
                          |    Core     |
                          +------+------+ 
                                 |
     -------------------------------------------------------------------
     |              |              |              |             |      |
     ▼              ▼              ▼              ▼             ▼      ▼
Designer UI   Widget Engine  Theme Engine  Project Workspace  Asset Library  Export Engine

────────────────────────────────────────────────────────────────────────────

                           Shared Components
             (types, utilities, constants, design tokens)
```

## Module Descriptions

### Core

#### Purpose

The Core is the central orchestration layer of Aurora Overlay Framework. It coordinates communication between modules,
manages the application lifecycle and provides shared infrastructure services.

Rather than implementing feature-specific functionality itself, the Core ensures that specialized modules work together
in a
predictable and consistent manner.

#### Responsibilities

The Core is responsible for:

- Initializing the application.
- Registering and managing application services.
- Coordinating communication between modules.
- Managing the application lifecycle.
- Routing application events.
- Providing shared infrastructure services.

#### Out of Scope

The Core is **not** responsible for:

- Rendering the user interface.
- Managing widgets.
- Managing themes.
- Managing projects.
- Managing assets.
- Exporting overlays.

These responsibilities belong to their dedicated modules.

#### Dependencies

The Core should remain as independent as possible.

Feature modules depend on the Core, but the Core should avoid depending directly on feature-specific implementations.

#### Public API

The Core exposes common infrastructure services through stable interfaces, allowing other modules to interact without
knowing implementation details.

Examples include infrastructure services such as:

- Application lifecycle
- Event system
- Service registration
- Configuration access

#### Future Extensions

Future versions of the Core may provide:

- Dependency injection
- Plugin discovery
- Extension loading
- Logging infrastructure
- Telemetry

### Designer UI

#### Purpose

The Designer UI provides the visual workspace where users create, configure and manage overlay projects.

It offers an intuitive interface that allows streamers to build overlays without writing code while interacting with the
underlying application through the Core.

#### Responsibilities

The Designer UI is responsible for:

- Providing the visual editing environment.
- Displaying the project canvas.
- Managing user interactions.
- Presenting project properties and settings.
- Managing selections within the workspace.
- Providing access to editing tools and commands.
- Previewing overlay changes in real time.

#### Out of Scope

The Designer UI is **not** responsible for:

- Managing application state.
- Storing project data.
- Managing widgets internally.
- Applying themes.
- Exporting overlays.

These responsibilities belong to their dedicated modules.

#### Dependencies

The Designer UI communicates with the Core to perform application actions.

It should not depend directly on other feature modules.

#### Public API

The Designer UI exposes user interactions and editor events through the Core, allowing other modules to respond without
creating direct dependencies.

#### Future Extensions

Future versions of the Designer UI may provide:

- Dockable panels
- Custom workspace layouts
- Multi-window editing
- Accessibility improvements
- Keyboard shortcut customization

### Widget Engine

#### Purpose

The Widget Engine manages the complete lifecycle of widgets within Aurora Overlay Framework.

It is responsible for registering, configuring and coordinating widgets while remaining independent of individual widget
implementations.

#### Responsibilities

The Widget Engine is responsible for:

- Registering available widgets.
- Creating widget instances.
- Managing widget lifecycle.
- Providing widget metadata.
- Coordinating widget configuration.
- Validating widget compatibility.
- Managing widget registration from built-in and future external sources.

#### Out of Scope

The Widget Engine is **not** responsible for:

- Rendering the user interface.
- Managing project state.
- Applying themes.
- Exporting overlays.
- Storing project data.

These responsibilities belong to their respective modules.

#### Dependencies

The Widget Engine communicates through the Core and should not directly depend on the Designer UI or other feature
modules.

#### Public API

The Widget Engine exposes services for:

- Widget registration
- Widget discovery
- Widget creation
- Widget configuration
- Widget lifecycle management

#### Future Extensions

Future versions of the Widget Engine may provide:

- Plugin widgets
- Widget marketplace support
- Widget versioning
- Widget dependency validation
- Remote widget packages