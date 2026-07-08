# System Context

## Purpose

This document describes Aurora's relationship with its users and external systems.

It defines the system boundary and shows how Aurora interacts with the streaming ecosystem.

---

# System Boundary

Aurora is the central workspace for creating, managing and exporting streaming overlays.

Aurora does **not** replace OBS Studio or Mix It Up.

Instead, Aurora simplifies the creation of overlays that integrate seamlessly with both platforms.

---

# Primary Actor

## Streamer

The streamer creates and manages overlay projects using Aurora.

Typical activities include:

- Creating projects
- Creating scenes
- Configuring widgets
- Applying themes
- Previewing overlays
- Exporting overlays

Aurora should remove as much technical complexity as possible.

---

# External Systems

## OBS Studio

Aurora exports Browser Source compatible overlays.

OBS is responsible for displaying the generated overlays.

Aurora never controls OBS directly.

---

## Mix It Up

Mix It Up provides events, variables and stream interactions.

Aurora exports overlays that respond to these events.

Aurora does not replace Mix It Up.

---

## Local File System

Stores:

- Aurora Projects
- Assets
- Exported overlays
- Themes

---

## Community

The Aurora community contributes:

- Themes
- Widgets
- Plugins
- Templates

---

# Context Diagram

                         Community
                  Themes • Widgets • Plugins
                              │
                              │
                              ▼
                    +------------------+
                    |      Aurora      |
                    |  Visual Workspace|
                    +------------------+
                      ▲      ▲      ▲
                      │      │      │
                      │      │      │
                Streamer    OBS   Mix It Up
                      │
                      ▼
                 Live Stream

---

# Responsibilities

Aurora is responsible for:

- Managing overlay projects
- Managing scenes
- Managing widgets
- Managing themes
- Live preview
- Exporting production-ready overlays

Aurora is NOT responsible for:

- Streaming
- Scene switching
- Chat bot functionality
- Broadcasting
- Video encoding

---

# Design Principles

Aurora always acts as the bridge between creators and streaming software.

Users interact with Aurora.

Aurora interacts with exported files.

OBS and Mix It Up remain independent systems.

---

# Architectural Decisions

Aurora follows these principles:

- Streamer First
- Visual First
- Everything is a Project
- Users think in Scenes
- Loose Coupling
- Separation of Concerns

---

# Future Considerations

The architecture should support:

- Plugin Marketplace
- Theme Marketplace
- Cloud Synchronization
- Community Widgets
- Team Collaboration