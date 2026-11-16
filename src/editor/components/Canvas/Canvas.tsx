import {useRef} from "react";
import type {DragEvent} from "react";

import {WidgetRenderer} from "../../../widgets/components/WidgetRenderer/WidgetRenderer";

import {useEditorStore} from "../../store/useEditorStore.ts";
import {snapToGrid} from "../../utils/snapToGrid.ts";

import {CanvasToolbar} from "../CanvasToolbar/CanvasToolbar.tsx";

import {useWidgetDrag} from "../../hooks/useWidgetDrag.ts";
import {useWidgetResize} from "../../hooks/useWidgetResize.ts";

import type {WidgetType} from "../../../widgets/model/WidgetType.ts";
import type {CanvasInteraction} from "../../model/CanvasInteraction.ts";

import "./Canvas.css";

const CANVAS_WIDTH = 1920;
const CANVAS_HEIGHT = 1080;

function isWidgetType(value: string): value is WidgetType {
    return [
        "text",
        "image",
        "camera-frame",
        "goal-bar",
        "chat-box",
    ].includes(value);
}

export function Canvas() {
    // Zustand-selectors
    const project = useEditorStore(
        (state) => state.project
    );

    const selectedWidgetInstanceId = useEditorStore(
        (state) => state.selectedWidgetInstanceId
    );

    const canvasSettings = useEditorStore(
        (state) => state.canvasSettings
    );

    const selectWidgetInstance = useEditorStore(
        (state) => state.selectWidgetInstance
    );

    const clearSelection = useEditorStore(
        (state) => state.clearSelection
    );

    const addWidget = useEditorStore(
        (state) => state.addWidget
    );

    // Gedeelde interactiestatus
    const interactionRef = useRef<CanvasInteraction>("idle");

    // Drag-hook
    const {
        handleWidgetPointerDown,
        handleWidgetPointerMove,
        handleWidgetPointerUp,
        handleWidgetPointerCancel,
    } = useWidgetDrag(interactionRef);

    // Resize-hook
    const {
        handleResizePointerDown,
        handleResizePointerMove,
        handleResizePointerUp,
        handleResizePointerCancel,
    } = useWidgetResize(interactionRef);

    const activeScene = project.scenes[0];

    // Widget vanuit de library boven het Canvas slepen
    function handleCanvasDragOver(
        event: DragEvent<HTMLDivElement>
    ) {
        event.preventDefault();

        event.dataTransfer.dropEffect = "copy";
    }

    // Widget vanuit de library op het Canvas plaatsen
    function handleCanvasDrop(
        event: DragEvent<HTMLDivElement>
    ) {
        event.preventDefault();

        const widgetType =
            event.dataTransfer.getData("text/plain");

        if (!isWidgetType(widgetType)) {
            return;
        }

        const stageRect =
            event.currentTarget.getBoundingClientRect();

        if (
            stageRect.width === 0 ||
            stageRect.height === 0
        ) {
            return;
        }

        // Bereken de muispositie binnen het Canvas
        const mouseX =
            event.clientX - stageRect.left;

        const mouseY =
            event.clientY - stageRect.top;

        // Zet schermpixels om naar virtuele Canvas-pixels
        const scaleX =
            CANVAS_WIDTH / stageRect.width;

        const scaleY =
            CANVAS_HEIGHT / stageRect.height;

        const virtualX = Math.round(
            mouseX * scaleX
        );

        const virtualY = Math.round(
            mouseY * scaleY
        );

        // Pas eventueel Snap to Grid toe
        const finalX = canvasSettings.snapToGrid
            ? snapToGrid(
                virtualX,
                canvasSettings.gridSize
            )
            : virtualX;

        const finalY = canvasSettings.snapToGrid
            ? snapToGrid(
                virtualY,
                canvasSettings.gridSize
            )
            : virtualY;

        // Voeg de widget toe aan het project
        addWidget(widgetType, {
            x: finalX,
            y: finalY,
        });
    }

    return (
        <main className="canvas">
            <CanvasToolbar/>

            <div
                className={`canvas-stage ${
                    canvasSettings.showGrid
                        ? ""
                        : "canvas-stage--no-grid"
                }`}
                style={{
                    backgroundSize: `${
                        (canvasSettings.gridSize / CANVAS_WIDTH) * 100
                    }% ${
                        (canvasSettings.gridSize / CANVAS_HEIGHT) * 100
                    }%`,
                }}
                onClick={clearSelection}
                onDragOver={handleCanvasDragOver}
                onDrop={handleCanvasDrop}
            >
                <span className="canvas-stage-label">
                    1920 × 1080
                </span>

                {activeScene?.widgetInstances.map((instance) => {
                    const widget = project.widgets.find(
                        (widget) =>
                            widget.id === instance.widgetId
                    );

                    if (!widget || !instance.visible) {
                        return null;
                    }

                    return (
                        <div
                            key={instance.id}

                            className={`canvas-widget ${
                                selectedWidgetInstanceId === instance.id
                                    ? "canvas-widget--selected"
                                    : ""
                            }`}

                            // Widget verplaatsen
                            onPointerDown={(event) => {
                                handleWidgetPointerDown(
                                    event,
                                    instance.id
                                );
                            }}

                            onPointerMove={
                                handleWidgetPointerMove
                            }

                            onPointerUp={
                                handleWidgetPointerUp
                            }

                            onPointerCancel={
                                handleWidgetPointerCancel
                            }

                            // Widget selecteren
                            onClick={(event) => {
                                event.stopPropagation();

                                if (
                                    selectedWidgetInstanceId !==
                                    instance.id
                                ) {
                                    selectWidgetInstance(instance.id);
                                }
                            }}

                            // Positie en afmetingen
                            style={{
                                left: `${
                                    (instance.position.x / CANVAS_WIDTH) * 100
                                }%`,

                                top: `${
                                    (instance.position.y / CANVAS_HEIGHT) * 100
                                }%`,

                                width: `${
                                    (instance.size.width / CANVAS_WIDTH) * 100
                                }%`,

                                height: `${
                                    (instance.size.height / CANVAS_HEIGHT) * 100
                                }%`,

                                zIndex: instance.layer,
                                opacity: instance.opacity,
                            }}
                        >
                            <WidgetRenderer widget={widget}/>

                            {/* Resize handle voor geselecteerde widgets */}
                            {selectedWidgetInstanceId === instance.id && (
                                <div
                                    className="canvas-resize-handle"

                                    onPointerDown={(event) => {
                                        handleResizePointerDown(
                                            event,
                                            instance.id
                                        );
                                    }}

                                    onPointerMove={(event) => {
                                        event.stopPropagation();

                                        handleResizePointerMove(
                                            event
                                        );
                                    }}

                                    onPointerUp={(event) => {
                                        event.stopPropagation();

                                        handleResizePointerUp(
                                            event
                                        );
                                    }}

                                    onPointerCancel={(event) => {
                                        event.stopPropagation();

                                        handleResizePointerCancel();
                                    }}

                                    onClick={(event) => {
                                        event.stopPropagation();
                                    }}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </main>
    );
}