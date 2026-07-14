import type { Project } from "../model/Project";

export function createProject(name: string): Project {
    return {
        id: crypto.randomUUID(),
        name,
    };
}