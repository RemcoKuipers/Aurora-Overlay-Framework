import "./WidgetLibrary.css";
import type {WidgetType} from "../../../../widgets/model/WidgetType.ts";
import {useState} from "react";
import {useEditorStore} from "../../../store/useEditorStore.ts";

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
    const addWidget = useEditorStore(
        (state) => state.addWidget
    );

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
                            onClick={() => {
                                setSelectedWidgetType(widget.type);
                                addWidget(widget.type);
                            }}
                            draggable={true}
                            onDragStart={(event) => {
                                event.dataTransfer.setData("text/plain", widget.type);
                                event.dataTransfer.effectAllowed = "copy";
                            }}
                        >
                            {widget.label}
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    );
}