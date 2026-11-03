import type {WidgetType} from "./WidgetType.ts";

export interface Widget {
    id: string;
    name: string;
    type: WidgetType;
    configuration: string;
    dataSource?: string;
}