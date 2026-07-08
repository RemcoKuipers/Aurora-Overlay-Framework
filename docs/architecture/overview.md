# Architecture Overview

## Purpose

This document defines the high-level architecture of Aurora before implementation begins.

Aurora follows a modular architecture focused on maintainability, scalability and user experience.

---

# Product Philosophy

Aurora is not simply an overlay framework.

Aurora is a **Visual Workspace** that allows streamers to design, manage and export complete streaming overlay projects.

Technology should never become a barrier for creativity.

---

# User Mental Model

Aurora is designed around how streamers already think.

Users think in:

- Projects
- Scenes
- Widgets
- Themes

They should never need to think about:

- HTML
- CSS
- JavaScript
- Browser Sources

These implementation details are automatically generated during export.

---

# Architectural Principles

## Everything is a Project

Every workflow starts with an Aurora Project.

A project contains every resource required for an entire streaming setup.

---

## Users think in Scenes

A project consists of one or more scenes.

Typical scenes include:

- Starting Soon
- Live
- BRB
- Ending
- Chat
- Custom

Each scene contains widgets.

---

## Widgets are independent

Widgets describe functionality.

They do not know anything about OBS or Mix It Up.

Platform-specific behavior belongs to the Export Engine.

---

## Separation of Concerns

Each system module has one responsibility.

Designer → User interface

Project Manager → Project data

Scene Manager → Scene hierarchy

Widget Engine → Widget lifecycle

Theme Engine → Styling

Preview Renderer → Live preview

Export Engine → Production output

Runtime → Overlay execution

---

# High-Level System

Aurora

├── Designer

├── Project Manager

├── Scene Manager

├── Widget Engine

├── Theme Engine

├── Preview Renderer

├── Export Engine

└── Runtime

---

# Domain Structure

Aurora Project

├── Global Settings

├── Assets

├── Themes

├── Scenes

│ ├── Widgets

│ ├── Widgets

│ └── Widgets

├── Export Profiles

└── Plugins

---

# User Workflow

Create Project

↓

Create Scene

↓

Add Widgets

↓

Configure Widgets

↓

Preview

↓

Export

↓

Use in OBS & Mix It Up

---

# Core Modules

## Designer

Visual application used by streamers.

Responsibilities:

- Project creation
- Scene management
- Widget configuration
- Theme editing
- Live preview

---

## Project Manager

Responsible for:

- Project loading
- Project saving
- Validation
- Version management

---

## Scene Manager

Responsible for:

- Scene organization
- Scene hierarchy
- Widget placement

---

## Widget Engine

Responsible for:

- Widget creation
- Widget lifecycle
- Widget configuration

---

## Theme Engine

Responsible for:

- Themes
- Colors
- Typography
- Styling

---

## Preview Renderer

Provides a real-time preview of the current scene.

---

## Export Engine

Generates production-ready output.

Supported exports:

- OBS Browser Sources
- Mix It Up overlays

---

## Runtime

Executes generated overlays inside the target platform.

---

# Core Architectural Goal

Aurora exists to remove technical barriers.

Every architectural decision should answer one question:

**Does this make life easier for streamers?**

If the answer is no, the design should be reconsidered.