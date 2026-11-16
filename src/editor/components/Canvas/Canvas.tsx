import {WidgetRenderer} from "../../../widgets/components/WidgetRenderer/WidgetRenderer";
import "./Canvas.css";
import {useEditorStore} from "../../store/useEditorStore.ts";
import type {PointerEvent, DragEvent} from "react";
import {useRef} from "react";
import {snapToGrid} from "../../utils/snapToGrid.ts";
import {CanvasToolbar} from "../CanvasToolbar/CanvasToolbar.tsx";
import type {WidgetType} from "../../../widgets/model/WidgetType.ts";
import {useWidgetDrag} from "../../hooks/useWidgetDrag.ts";

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
    const project = useEditorStore((state) => state.project);
    const selectedWidgetInstanceId = useEditorStore(
        (state) => state.selectedWidgetInstanceId
    );

    const canvasSettings = useEditorStore(
        (state) => state.canvasSettings);

    const selectWidgetInstance = useEditorStore(
        (state) => state.selectWidgetInstance
    );

    const clearSelection = useEditorStore(
        (state) => state.clearSelection
    );

    const updateWidgetSize = useEditorStore(
        (state) => state.updateWidgetSize
    );

    const addWidget = useEditorStore(
        (state) => state.addWidget
    );

    const resizeRef = useRef<{
        instanceId: string;
        startPointerX: number;
        startPointerY: number;
        startWidth: number;
        startHeight: number;
        stageWidth: number;
        stageHeight: number;
    } | null>(null);

    const {
        handleWidgetPointerDown,
        handleWidgetPointerMove,
        handleWidgetPointerUp,
        handleWidgetPointerCancel,
    } = useWidgetDrag(resizeRef);

    const activeScene = project.scenes[0];

    function handleResizePointerDown(
        event: PointerEvent<HTMLDivElement>,
        instanceId: string
    ) {

        if (event.button !== 0) {
            return;
        }
        event.stopPropagation();

        const instance = activeScene?.widgetInstances.find(
            (instance) => instance.id === instanceId
        );
        const stage = event.currentTarget.closest(".canvas-stage");

        if (!instance || !(stage instanceof HTMLElement)) {
            return;
        }
        const stageRect = stage.getBoundingClientRect();

        if (stageRect.width === 0 || stageRect.height === 0) {
            return;
        }

        resizeRef.current = {
            instanceId,
            startPointerX: event.clientX,
            startPointerY: event.clientY,
            startWidth: instance.size.width,
            startHeight: instance.size.height,
            stageWidth: stageRect.width,
            stageHeight: stageRect.height
        }

        event.currentTarget.setPointerCapture(event.pointerId);

    }

    function handleResizePointerMove(
        event: PointerEvent<HTMLDivElement>
    ) {
        const resize = resizeRef.current;

        if (!resize) {
            return;
        }

        const deltaX = event.clientX - resize.startPointerX;
        const deltaY = event.clientY - resize.startPointerY;

        const scaleX = CANVAS_WIDTH / resize.stageWidth;
        const scaleY = CANVAS_HEIGHT / resize.stageHeight;

        const newWidth = Math.round(
            resize.startWidth + deltaX * scaleX
        );

        const newHeight = Math.round(
            resize.startHeight + deltaY * scaleY
        );

        const minWidth = 40;
        const minHeight = 40;

        const constrainedWidth = Math.max(minWidth, newWidth);
        const constrainedHeight = Math.max(minHeight, newHeight);

        const finalWidth = canvasSettings.snapToGrid
            ? Math.max(
                minWidth,
                snapToGrid(constrainedWidth, canvasSettings.gridSize)
            )
            : constrainedWidth;

        const finalHeight = canvasSettings.snapToGrid
            ? Math.max(
                minHeight,
                snapToGrid(constrainedHeight, canvasSettings.gridSize)
            )
            : constrainedHeight;

        updateWidgetSize(
            resize.instanceId,
            finalWidth,
            finalHeight
        );
    }

    function handleResizePointerUp(
        event: PointerEvent<HTMLDivElement>
    ) {
        if (!resizeRef.current) {
            return;
        }

        resizeRef.current = null;

        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
        }
    }

    function handleResizePointerCancel() {
        resizeRef.current = null;
    }

    function handleCanvasDragOver(event: DragEvent<HTMLDivElement>) {
        event.preventDefault();
        event.dataTransfer.dropEffect = "copy";
    }

    function handleCanvasDrop(event: DragEvent<HTMLDivElement>) {
        event.preventDefault();

        const widgetType = event.dataTransfer.getData("text/plain");
        if (!isWidgetType(widgetType)) {
            return;
        }
        const stageRect = event.currentTarget.getBoundingClientRect();

        const mouseX = event.clientX - stageRect.left;
        const mouseY = event.clientY - stageRect.top;

        const scaleX = CANVAS_WIDTH / stageRect.width;
        const scaleY = CANVAS_HEIGHT / stageRect.height;

        const virtualX = Math.round(mouseX * scaleX)
        const virtualY = Math.round(mouseY * scaleY)

        const finalX = canvasSettings.snapToGrid
            ? snapToGrid(virtualX, canvasSettings.gridSize)
            : virtualX;
        const finalY = canvasSettings.snapToGrid
            ? snapToGrid(virtualY, canvasSettings.gridSize)
            : virtualY;


        addWidget(widgetType, {
            x: finalX,
            y: finalY
        });

    }

    return (
        <main className="canvas">
            <CanvasToolbar/>
            <div
                className={`canvas-stage ${
                    canvasSettings.showGrid ? "" : "canvas-stage--no-grid"
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
                        (widget) => widget.id === instance.widgetId
                    );

                    if (!widget || !instance.visible) {
                        return null;
                    }

                    return (
                        <div
                            key={instance.id}
                            className={`canvas-widget ${
                                selectedWidgetInstanceId === instance.id ? "canvas-widget--selected" : ""
                            }`}
                            onPointerDown={(event) => {
                                handleWidgetPointerDown(event, instance.id);
                            }}
                            onPointerMove={handleWidgetPointerMove}
                            onPointerUp={handleWidgetPointerUp}
                            onPointerCancel={handleWidgetPointerCancel}
                            onClick={(event) => {
                                event.stopPropagation();
                                selectWidgetInstance(instance.id);
                            }}
                            style={{
                                left: `${(instance.position.x / CANVAS_WIDTH) * 100}%`,
                                top: `${(instance.position.y / CANVAS_HEIGHT) * 100}%`,
                                width: `${(instance.size.width / CANVAS_WIDTH) * 100}%`,
                                height: `${(instance.size.height / CANVAS_HEIGHT) * 100}%`,
                                zIndex: instance.layer,
                                opacity: instance.opacity,
                            }}
                        >
                            <WidgetRenderer widget={widget}/>

                            {selectedWidgetInstanceId === instance.id && (
                                <div
                                    className="canvas-resize-handle"
                                    onPointerDown={(event) => {
                                        handleResizePointerDown(event, instance.id);
                                    }}
                                    onPointerMove={(event) => {
                                        event.stopPropagation();
                                        handleResizePointerMove(event);
                                    }}
                                    onPointerUp={(event) => {
                                        event.stopPropagation();
                                        handleResizePointerUp(event);
                                    }}
                                    onPointerCancel={(event) => {
                                        event.stopPropagation();
                                        handleResizePointerCancel();
                                    }}
                                    onClick={(event) => event.stopPropagation()}
                                />
                            )}
                        </div>

                    );
                })}
            </div>
        </main>
    );
}