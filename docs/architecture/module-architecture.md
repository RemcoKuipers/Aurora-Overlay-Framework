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

### Theme Engine

#### Purpose

The Theme Engine manages the visual appearance of Aurora Overlay Framework by providing centralized design tokens that
define the application's look and feel.

Rather than allowing individual widgets to define their own styling, the Theme Engine provides a consistent visual
language that can be applied across the entire project.

#### Responsibilities

The Theme Engine is responsible for:

- Managing available themes.
- Providing design tokens.
- Resolving theme values.
- Applying theme changes.
- Maintaining visual consistency.
- Supporting future custom themes.

#### Out of Scope

The Theme Engine is **not** responsible for:

- Rendering widgets.
- Managing widget behavior.
- Managing project data.
- Exporting overlays.

These responsibilities belong to their respective modules.

#### Dependencies

The Theme Engine communicates through the Core and should remain independent from feature-specific implementations.

#### Public API

The Theme Engine exposes services for:

- Theme loading
- Theme switching
- Design token resolution
- Theme validation

#### Future Extensions

Future versions of the Theme Engine may provide:

- User-created themes
- Theme packages
- Theme marketplace
- Theme inheritance
- Live theme editing

#### Design Principle

Widgets never own their visual style. Instead, they consume design tokens provided by the Theme Engine.

This ensures visual consistency throughout the application, simplifies theme management and allows complete visual
customization without modifying individual widgets.

### Project Workspace

#### Purpose

The Project Workspace manages the active overlay project and maintains the user's working environment throughout the
editing session.

It provides the context in which projects are created, edited and organized while coordinating project-specific state
through the Core.

#### Responsibilities

The Project Workspace is responsible for:

- Managing the active project.
- Managing scenes within the project.
- Tracking the current selection.
- Managing editor state.
- Tracking unsaved changes.
- Supporting project persistence.
- Coordinating workspace-related state.

#### Out of Scope

The Project Workspace is **not** responsible for:

- Rendering the user interface.
- Managing widget behavior.
- Applying themes.
- Exporting overlays.

These responsibilities belong to their dedicated modules.

#### Dependencies

The Project Workspace communicates through the Core and remains independent from feature-specific implementations.

#### Public API

The Project Workspace exposes services for:

- Project creation
- Project loading
- Project saving
- Workspace state
- Selection management

#### Future Extensions

Future versions of the Project Workspace may provide:

- Autosave
- Workspace recovery
- Recent projects
- Multiple open projects
- Workspace snapshots

#### Design Principle

The Project Workspace owns the editing session, not the visual presentation of that session.

Editor state should remain independent from the user interface to ensure flexibility and maintainability.

### Asset Library

#### Purpose

The Asset Library provides centralized management for all reusable project assets within Aurora Overlay Framework.

It stores, organizes and provides access to resources that can be used throughout the application while remaining
independent of the modules that consume them.

#### Responsibilities

The Asset Library is responsible for:

- Managing project assets.
- Importing external resources.
- Organizing assets.
- Providing asset metadata.
- Maintaining asset references.
- Supporting asset reuse across projects.

#### Out of Scope

The Asset Library is **not** responsible for:

- Rendering assets.
- Managing widget behavior.
- Applying themes.
- Exporting projects.

These responsibilities belong to their respective modules.

#### Dependencies

The Asset Library communicates through the Core and remains independent from feature-specific modules.

#### Public API

The Asset Library exposes services for:

- Asset import
- Asset retrieval
- Asset organization
- Asset metadata
- Asset validation

#### Future Extensions

Future versions of the Asset Library may provide:

- Asset collections
- Asset tagging
- Asset search
- Cloud asset libraries
- Asset optimization

#### Design Principle

Assets are passive resources.

The Asset Library owns the lifecycle of assets, while other modules consume them through stable references rather than
direct ownership.

### Export Engine

#### Purpose

The Export Engine is responsible for transforming Aurora projects into distributable output formats.

It provides a standardized export pipeline that ensures every export follows the same validation and transformation
process while allowing different output formats to implement their own final export stage.

#### Responsibilities

The Export Engine is responsible for:

- Validating export requests.
- Transforming project data.
- Preparing export packages.
- Executing format-specific exporters.
- Reporting export results.
- Providing a consistent export workflow.

#### Out of Scope

The Export Engine is **not** responsible for:

- Managing projects.
- Managing widgets.
- Applying themes.
- Rendering the editor.

These responsibilities belong to their dedicated modules.

#### Dependencies

The Export Engine communicates through the Core and remains independent from project-specific implementations.

#### Public API

The Export Engine exposes services for:

- Export validation
- Export execution
- Export status
- Export formats
- Export reporting

#### Future Extensions

Future versions of the Export Engine may provide:

- Custom exporters
- Batch exports
- Export profiles
- Cloud publishing
- Scheduled exports

#### Design Principle

Every export follows the same export pipeline.

Format-specific exporters are only responsible for generating their own output while relying on the shared pipeline for
validation, transformation and packaging.

### Shared

#### Purpose

The Shared module provides reusable building blocks that are used across multiple modules within Aurora Overlay
Framework.

It contains generic resources that promote consistency and reduce duplication while remaining independent from
feature-specific implementations.

#### Responsibilities

The Shared module is responsible for:

- Providing shared types.
- Providing reusable interfaces.
- Providing utility functions.
- Providing shared constants.
- Providing common icons and assets.
- Providing design token definitions.

#### Out of Scope

The Shared module is **not** responsible for:

- Business logic.
- Project management.
- Widget management.
- Theme management.
- Export functionality.

Feature-specific logic must remain within its own module.

#### Dependencies

The Shared module should remain independent of all feature modules.

Feature modules may depend on Shared, but Shared must never depend on them.

#### Public API

The Shared module exposes reusable resources including:

- Shared types
- Interfaces
- Constants
- Utility functions
- Design token definitions

#### Future Extensions

Future versions of the Shared module may provide:

- Shared validation helpers
- Localization resources
- Common animations
- Accessibility utilities

#### Design Principle

The Shared module exists to eliminate duplication, not to centralize unrelated functionality.

Only resources that are generic, reusable and feature-independent belong in the Shared module.

## Module Dependencies

Aurora Overlay Framework follows a strict dependency model to maintain low coupling and high modularity.

Feature modules do not communicate directly with one another. Instead, all module interactions are coordinated through
the Core.

The Shared module provides reusable resources that may be consumed by other modules, but it remains completely
independent of feature-specific functionality.

### Dependency Matrix

| Module            | Core | Shared | Feature Modules |
|-------------------|:----:|:------:|:---------------:|
| Core              |  —   |   ✅    |        ❌        |
| Designer UI       |  ✅   |   ✅    |        ❌        |
| Widget Engine     |  ✅   |   ✅    |        ❌        |
| Theme Engine      |  ✅   |   ✅    |        ❌        |
| Project Workspace |  ✅   |   ✅    |        ❌        |
| Asset Library     |  ✅   |   ✅    |        ❌        |
| Export Engine     |  ✅   |   ✅    |        ❌        |
| Shared            |  ❌   |   —    |        ❌        |

### Dependency Rules

The following architectural rules apply throughout the project:

- Dependencies should always point toward more generic modules, never toward more specialized modules.
- The Core coordinates communication between feature modules.
- Feature modules must never depend directly on other feature modules.
- Shared provides reusable resources but never contains feature-specific logic.
- Shared must never depend on any other module.
- The Core may depend on Shared.
- Circular dependencies are not permitted.

## Design Rationale

Aurora Overlay Framework has been designed around a modular architecture that prioritizes maintainability, extensibility
and developer experience.

Rather than optimizing for rapid feature development, the architecture establishes a strong foundation that allows the
framework to evolve without requiring major structural changes.

The following design decisions form the basis of the architecture.

### Central Core

A central Core module acts as the orchestration layer of the application.

Instead of allowing feature modules to communicate directly, the Core coordinates interactions between modules. This
reduces coupling, simplifies maintenance and provides a single point for application-wide coordination.

### Specialized Modules

Each module has a single, clearly defined responsibility.

Modules focus on one area of functionality, allowing them to evolve independently while reducing implementation
complexity.

### Design Tokens

Visual styling is centralized within the Theme Engine through design tokens.

Widgets never define their own visual appearance directly. Instead, they consume design tokens, allowing themes to
change the entire visual identity of a project without modifying individual widgets.

### Project Workspace

The editing session is managed separately from the user interface.

Keeping editor state independent from presentation enables future features such as autosave, workspace recovery and
undo/redo while maintaining a clean separation of concerns.

### Export Pipeline

All exports follow the same standardized export pipeline.

Validation, transformation and packaging are shared across every export format, while format-specific exporters remain
responsible only for generating their own output.

### Shared Resources

Reusable resources are centralized within the Shared module.

Only generic, feature-independent resources belong in Shared. This reduces duplication while preventing feature-specific
logic from spreading throughout the application.

### Long-Term Maintainability

The architecture is designed to support long-term growth.

Future capabilities such as plugins, additional exporters, new widgets and custom themes can be introduced through
existing extension points without requiring fundamental architectural changes.

### Architectural Philosophy

Aurora Overlay Framework is designed around the principle that complexity should be handled by the framework, not by the
streamer.

The architecture favors clear responsibilities, modular design and predictable extension points so that both developers
and end users can work efficiently as the project continues to grow.