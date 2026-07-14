# Coding Standards

## Purpose

This document defines the coding conventions and architectural rules used throughout the Aurora Overlay Framework.

The purpose of these standards is to keep the codebase consistent, maintainable, and easy to understand.

---

# General Principles

- Keep implementations simple.
- Prefer readability over cleverness.
- Build in small, reviewable steps.
- Follow the established project architecture.
- Every change should have a single responsibility.

---

# TypeScript

## Imports

Use `import type` when importing interfaces or types.

Example:

```typescript
import type { Project } from "../model/Project";
```

Use normal imports for functions, classes and constants.

```typescript
import { createProject } from "./ProjectService";
```

---

# React

## Components

React components use **named exports**.

```tsx
export function Sidebar() {
    return <aside>Sidebar</aside>;
}
```

Avoid default exports for components.

---

## Component Structure

Each component lives inside its own directory.

Example:

```
Sidebar/
├── Sidebar.tsx
└── Sidebar.css
```

---

## Naming

Use PascalCase for:

- Component names
- Component directories
- Component CSS files

Example:

```
Sidebar/
├── Sidebar.tsx
└── Sidebar.css
```

---

# Services

Services contain business logic.

Services:

- are stateless;
- do not render UI;
- do not manipulate the DOM;
- do not depend on React.

---

# Models

Models describe domain objects only.

They do not contain business logic.

---

# Architecture

Aurora follows a layered architecture.

```
React UI
↓
Services
↓
Domain Models
```

Business logic belongs inside services.

Presentation belongs inside React components.

Domain models describe the application state.