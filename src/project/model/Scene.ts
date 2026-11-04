import type { WidgetInstance } from "../../widgets/model/WidgetInstance";

export interface Scene {
    id: string;
    name: string;
    widgetInstances: WidgetInstance[];
}