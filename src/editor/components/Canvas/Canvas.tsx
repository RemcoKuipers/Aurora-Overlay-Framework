import {WidgetRenderer} from "../../../widgets/components/WidgetRenderer/WidgetRenderer";
import "./Canvas.css";
import {useEditorStore} from "../../store/useEditorStore.ts";
import type {PointerEvent} from "react";
import {useRef} from "react";
import {snapToGrid} from "../../utils/snapToGrid.ts";
import {CanvasToolbar} from "../CanvasToolbar/CanvasToolbar.tsx";

const CANVAS_WIDTH = 1920;
const CANVAS_HEIGHT = 1080;

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

    const updateWidgetPosition = useEditorStore(
        (state) => state.updateWidgetPosition);

    const dragRef = useRef<{
        instanceId: string;
        startPointerX: number;
        startPointerY: number;
        startWidgetX: number;
        startWidgetY: number;
        stageWidth: number;
        stageHeight: number;
    } | null>(null);

    const activeScene = project.scenes[0];

    function handleWidgetPointerDown(
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

        selectWidgetInstance(instanceId);

        dragRef.current = {
            instanceId,
            startPointerX: event.clientX,
            startPointerY: event.clientY,
            startWidgetX: instance.position.x,
            startWidgetY: instance.position.y,
            stageWidth: stageRect.width,
            stageHeight: stageRect.height,
        };

        event.currentTarget.setPointerCapture(event.pointerId);
    }

    function handleWidgetPointerMove(
        event: PointerEvent<HTMLDivElement>
    ) {
        const drag = dragRef.current;

        if (!drag) {
            return;
        }

        const deltaX = event.clientX - drag.startPointerX;
        const deltaY = event.clientY - drag.startPointerY;

        const scaleX = CANVAS_WIDTH / drag.stageWidth;
        const scaleY = CANVAS_HEIGHT / drag.stageHeight;

        const newX = Math.round(
            drag.startWidgetX + deltaX * scaleX
        );

        const newY = Math.round(
            drag.startWidgetY + deltaY * scaleY
        );

        const finalX = canvasSettings.snapToGrid
            ? snapToGrid(newX, canvasSettings.gridSize)
            : newX;

        const finalY = canvasSettings.snapToGrid
            ? snapToGrid(newY, canvasSettings.gridSize)
            : newY;

        updateWidgetPosition(
            drag.instanceId,
            finalX,
            finalY
        );
    }

    function handleWidgetPointerUp(
        event: PointerEvent<HTMLDivElement>
    ) {
        if (!dragRef.current) {
            return;
        }

        dragRef.current = null;

        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
        }
    }

    function handleWidgetPointerCancel() {
        dragRef.current = null;
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
                        </div>
                    );
                })}
            </div>
        </main>
    );
}