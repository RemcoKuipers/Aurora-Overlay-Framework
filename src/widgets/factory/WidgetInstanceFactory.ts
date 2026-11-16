import type {WidgetInstance} from "../model/WidgetInstance.ts";
import type {WidgetType} from "../model/WidgetType.ts";

export function createWidgetInstance(
    widgetId: string,
    widgetType: WidgetType
): WidgetInstance {

    let width = 400;
    let height = 200;

    switch (widgetType) {
        case "text":
            width = 600;
            height = 100;
            break;

        case "image":
            width = 400;
            height = 300;
            break;

        case "camera-frame":
            width = 480;
            height = 270;
            break;

        case "goal-bar":
            width = 500;
            height = 80;
            break;

        case "chat-box":
            width = 400;
            height = 600;
            break;
    }

    return {
        id: crypto.randomUUID(),
        widgetId,
        position: {
            x: 100,
            y: 100,
        },
        size: {
            width,
            height,
        },
        layer: 1,
        visible: true,
        opacity: 1
    };
}