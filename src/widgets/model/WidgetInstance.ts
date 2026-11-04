export interface Position {
    x: number;
    y: number;
}

export interface Size {
    width: number;
    height: number;
}

export interface WidgetInstance {
    id: string;
    widgetId: string;
    position: Position;
    size: Size;
    layer: number;
    visible: boolean;
    opacity: number;
}