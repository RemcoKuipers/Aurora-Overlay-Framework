import type { Project } from "../model/Project";

export function createProject(name: string): Project {
    return {
        id: crypto.randomUUID(),
        name,
        scenes: [],
        widgets: [],
        assets: [],
        activeTheme: {
            id: "aurora-default",
            name: "Aurora Default",
        },
        exportProfiles: [
            {
                id: crypto.randomUUID(),
            },
        ],
    };
}