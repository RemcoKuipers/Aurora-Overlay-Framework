import "./WidgetLibrary.css";
import type {WidgetType} from "../../../../widgets/model/WidgetType.ts";
import {useState} from "react";

interface WidgetLibraryItem {
    type: WidgetType;
    label: string;
}

const availableWidgets: WidgetLibraryItem[] = [
    {type: "text", label: "Text"},
    {type: "image", label: "Image"},
    {type: "camera-frame", label: "Camera Frame"},
    {type: "goal-bar", label: "Goal Bar"},
    {type: "chat-box", label: "Chat Box"},
];

export function WidgetLibrary() {
    const [selectedWidgetType, setSelectedWidgetType] =
    useState<WidgetType | null>(null);

    return (
        <section className="widget-library">
            <h2>Widget Library</h2>

            <ul className="widget-library-list">
                {availableWidgets.map((widget) => (
                    <li key={widget.type}>
                        <button
                            type="button"
                            className={`widget-library-button ${
                                selectedWidgetType === widget.type ? "selected" : ""
                            }`}
                            onClick={() => setSelectedWidgetType(widget.type)}
                            aria-pressed={selectedWidgetType === widget.type}
                        >
                            {widget.label}
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    );
}