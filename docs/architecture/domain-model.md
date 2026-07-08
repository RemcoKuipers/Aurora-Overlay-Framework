# Domain Model

## Purpose

This document defines the core domain objects of Aurora and the relationships between them.

The domain model describes the business concepts of Aurora and is independent of implementation details such as TypeScript classes or database tables.

---

# Core Domain Objects

Aurora consists of the following core domain objects:

- Project
- Scene
- Widget
- Widget Instance
- Theme
- Asset
- Export Profile

---

# Project

The Project is the root object of Aurora.

Every Aurora project represents a complete overlay workspace and contains all resources required to create and export overlays.

## Relationships

Project
├── 1 Theme
├── 0..* Assets
├── 0..* Scenes
├── 0..* Widgets
└── 1..* Export Profiles

### Theme

Every project has exactly one active theme.

Projects are created with the default Aurora theme, which can be customized or replaced by the user.

### Assets

Projects may contain zero or more assets.

Assets include external resources such as images, videos, fonts and audio files.

### Scenes

Projects may contain zero or more scenes.

This allows users to start a project without immediately creating overlay scenes.

### Widgets

Widgets are created on project level.

The same widget can be reused across multiple scenes.

### Export Profiles

Projects support one or more export profiles.

This allows the same project to be exported for different streaming platforms without duplicating the project.

---

# Scene

A Scene represents a single overlay composition within an Aurora Project.

A Scene groups Widget Instances together for a specific purpose such as:

- Starting Soon
- Live
- Be Right Back
- Ending
- Chatting

## Relationships

Scene
└── 0..* Widget Instances

### Widget Instances

A Scene contains zero or more Widget Instances.

A Widget Instance references a Widget and stores scene-specific information such as:

- Position
- Size
- Layer
- Visibility
- Opacity

This allows the same Widget to be reused across multiple scenes while maintaining independent placement and appearance.

---

# Widget

A Widget is a reusable building block that provides a single piece of functionality within an Aurora Project.

Widgets are created at project level and can be reused across multiple scenes.

Widgets define **what** they are and **how** they behave.

They do not define where they are placed inside a scene.

## Relationships

Widget
└── 0..* Widget Instances

### Widget Instances

A Widget can be reused in multiple scenes through Widget Instances.

Each Widget Instance stores scene-specific properties such as:

- Position
- Size
- Layer
- Visibility
- Opacity

## Core Properties

Every Widget contains:

- Id
- Name
- Type
- Configuration
- Data Source (optional)

## Supported MVP Widget Types

Aurora 1.0 supports:

- Text
- Image
- Camera Frame
- Goal Bar
- Chat Box
- Latest Follower
- Latest Subscriber
- Latest Donation
- Alert

Future widget types can be added without changing the core architecture.

# Theme

A Theme defines the visual identity of an Aurora Project.

Every project contains exactly one active theme.

Themes provide a consistent appearance across all widgets within a project.

## Responsibilities

A Theme defines:

- Colors
- Typography
- Shapes
- Borders
- Shadows
- Transparency
- Background styles
- Gradients
- Animation styles

A Theme may reference project assets such as images or icons but does not own them.

## Built-in Themes (MVP)

Aurora ships with four built-in themes:

- Aurora Default
- Dark
- Light
- Christmas

These themes demonstrate the capabilities of the framework while allowing users to create and customize their own themes.

# Asset

An Asset is an external resource that can be referenced by widgets and themes within an Aurora Project.

Assets are stored once per project and can be reused multiple times.

## Relationships

Asset
◄──────── Widget
◄──────── Theme

## Supported Asset Types

Aurora 1.0 supports:

- Images
- Icons
- Fonts
- Audio
- Video

Assets are shared resources and are never duplicated within a project.

# Export Profile

An Export Profile defines how an Aurora Project is exported for a specific streaming platform.

Each Export Profile contains the settings required to generate production-ready output.

## Core Properties

Every Export Profile contains:

- Name
- Target Platform
- Output Format
- Export Settings

## MVP Target Platforms

Aurora 1.0 supports:

- OBS Browser Source
- Mix It Up

The architecture allows additional export targets to be added in future releases.