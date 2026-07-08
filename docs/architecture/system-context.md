# System Context

## Purpose

This document describes Aurora's relationship with users and external systems.

---

# Primary Actor

Streamer

Aurora is designed primarily for streamers who want to create professional overlays without writing code.

---

# External Systems

## OBS Studio

Displays exported Browser Sources.

Aurora generates compatible output but does not control OBS.

---

## Mix It Up

Provides interactive events and variables.

Aurora exports overlays compatible with Mix It Up.

---

## Community

Contributes themes, widgets and plugins.

---

## Local File System

Stores Aurora projects and exported overlays.

---

# System Boundary

Aurora acts as the central workspace between streamers and streaming software.

Aurora does not replace OBS or Mix It Up.

Instead, it simplifies the process of creating overlays that work with both platforms.

---

# Context Diagram

(Streamer)

↓

Aurora

↓

OBS Studio

↓

Live Stream

Mix It Up ↔ Aurora

Community ↔ Aurora