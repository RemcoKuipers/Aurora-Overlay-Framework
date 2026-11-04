import type { Widget } from "../../model/Widget";
import { TextWidget } from "../TextWidget/TextWidget";

interface WidgetRendererProps {
    widget: Widget;
}

export function WidgetRenderer({ widget }: WidgetRendererProps) {
    switch (widget.type) {
        case "text":
            return <TextWidget text={widget.configuration} />;

        default:
            return null;
    }
}