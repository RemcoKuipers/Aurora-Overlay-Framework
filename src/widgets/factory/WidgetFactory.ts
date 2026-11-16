import type { Widget } from "../model/Widget.ts";
import type { WidgetType } from "../model/WidgetType.ts";

export function createWidget(type: WidgetType): Widget {
    switch (type) {
        case "text":
            return {
                id: crypto.randomUUID(),
                name: "Text Widget",
                type,
                configuration: "Your text here",
            };

        case "image":
            return {
                id: crypto.randomUUID(),
                name: "Image Widget",
                type,
                configuration: "",
            };

        case "camera-frame":
            return {
                id: crypto.randomUUID(),
                name: "Camera Frame",
                type,
                configuration: "",
            };

        case "goal-bar":
            return {
                id: crypto.randomUUID(),
                name: "Goal Bar",
                type,
                configuration: "",
            };

        case "chat-box":
            return {
                id: crypto.randomUUID(),
                name: "Chat Box",
                type,
                configuration: "",
            };

        default:
            throw new Error(`Widget type "${type}" is not supported yet.`);
    }
}