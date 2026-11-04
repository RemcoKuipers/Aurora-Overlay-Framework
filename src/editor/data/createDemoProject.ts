import type { Project } from "../../project/model/Project";
import { createProject } from "../../project/service/ProjectService";

export function createDemoProject(): Project {
    const project = createProject("Aurora Demo");

    const widgetId = crypto.randomUUID();

    project.widgets.push({
        id: widgetId,
        name: "Welcome Text",
        type: "text",
        configuration: "Welcome to my stream!",
    });

    project.scenes.push({
        id: crypto.randomUUID(),
        name: "Starting Soon",
        widgetInstances: [
            {
                id: crypto.randomUUID(),
                widgetId,
                position: {
                    x: 100,
                    y: 200,
                },
                size: {
                    width: 600,
                    height: 100,
                },
                layer: 1,
                visible: true,
                opacity: 1,
            },
        ],
    });

    return project;
}