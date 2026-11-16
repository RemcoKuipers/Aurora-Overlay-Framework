import {useEffect, useRef} from "react";
import type {PointerEvent, RefObject} from "react";

import {useEditorStore} from "../store/useEditorStore.ts";
import {snapToGrid} from "../utils/snapToGrid.ts";
import type {CanvasInteraction} from "../model/CanvasInteraction.ts";

type DragState = {
    instanceId: string;
    startPointerX: number;
    startPointerY: number;
    startWidgetX: number;
    startWidgetY: number;
    stageWidth: number;
    stageHeight: number;
};

type PendingDragPosition = {
    instanceId: string;
    x: number;
    y: number;
};

const CANVAS_WIDTH = 1920;
const CANVAS_HEIGHT = 1080;

export function useWidgetDrag(
    interactionRef: RefObject<CanvasInteraction>
) {
    const project = useEditorStore(
        (state) => state.project
    );

    const selectedWidgetInstanceId = useEditorStore(
        (state) => state.selectedWidgetInstanceId
    );

    const selectWidgetInstance = useEditorStore(
        (state) => state.selectWidgetInstance
    );

    const canvasSettings = useEditorStore(
        (state) => state.canvasSettings
    );

    const updateWidgetPosition = useEditorStore(
        (state) => state.updateWidgetPosition
    );

    const activeScene = project.scenes[0];

    const dragRef = useRef<DragState | null>(null);

    const dragFrameRef = useRef<number | null>(null);

    const pendingDragPositionRef =
        useRef<PendingDragPosition | null>(null);

    function handleWidgetPointerDown(
        event: PointerEvent<HTMLDivElement>,
        instanceId: string
    ) {
        if (event.button !== 0) {
            return;
        }

        // Voorkom gelijktijdig dragging en resizing
        if (interactionRef.current !== "idle") {
            return;
        }

        event.stopPropagation();

        const instance = activeScene?.widgetInstances.find(
            (instance) => instance.id === instanceId
        );

        const stage = event.currentTarget.closest(
            ".canvas-stage"
        );

        if (!instance || !(stage instanceof HTMLElement)) {
            return;
        }

        const stageRect = stage.getBoundingClientRect();

        if (
            stageRect.width === 0 ||
            stageRect.height === 0
        ) {
            return;
        }

        // Selecteer de widget
        if (selectedWidgetInstanceId !== instanceId) {
            selectWidgetInstance(instanceId);
        }

        // Bewaar de oorspronkelijke positie
        dragRef.current = {
            instanceId,
            startPointerX: event.clientX,
            startPointerY: event.clientY,
            startWidgetX: instance.position.x,
            startWidgetY: instance.position.y,
            stageWidth: stageRect.width,
            stageHeight: stageRect.height,
        };

        // Markeer de actieve interactie
        interactionRef.current = "dragging";

        // Blijf pointer-events ontvangen tijdens dragging
        event.currentTarget.setPointerCapture(
            event.pointerId
        );
    }

    function handleWidgetPointerMove(
        event: PointerEvent<HTMLDivElement>
    ) {
        // Alleen uitvoeren tijdens dragging
        if (interactionRef.current !== "dragging") {
            return;
        }

        const drag = dragRef.current;

        if (!drag) {
            return;
        }

        // Controleer of de linkermuisknop ingedrukt is
        if (event.buttons !== 1) {
            handleWidgetPointerCancel();
            return;
        }

        // Bereken de muisverplaatsing
        const deltaX =
            event.clientX - drag.startPointerX;

        const deltaY =
            event.clientY - drag.startPointerY;

        // Zet schermpixels om naar virtuele Canvas-pixels
        const scaleX =
            CANVAS_WIDTH / drag.stageWidth;

        const scaleY =
            CANVAS_HEIGHT / drag.stageHeight;

        const newX = Math.round(
            drag.startWidgetX + deltaX * scaleX
        );

        const newY = Math.round(
            drag.startWidgetY + deltaY * scaleY
        );

        // Pas eventueel Snap to Grid toe
        const finalX = canvasSettings.snapToGrid
            ? snapToGrid(
                newX,
                canvasSettings.gridSize
            )
            : newX;

        const finalY = canvasSettings.snapToGrid
            ? snapToGrid(
                newY,
                canvasSettings.gridSize
            )
            : newY;

        // Bewaar de meest recente positie
        pendingDragPositionRef.current = {
            instanceId: drag.instanceId,
            x: finalX,
            y: finalY,
        };

        // Voorkom meerdere updates binnen hetzelfde frame
        if (dragFrameRef.current !== null) {
            return;
        }

        dragFrameRef.current = requestAnimationFrame(
            () => {
                dragFrameRef.current = null;

                const pendingPosition =
                    pendingDragPositionRef.current;

                pendingDragPositionRef.current = null;

                if (
                    !pendingPosition ||
                    interactionRef.current !== "dragging"
                ) {
                    return;
                }

                updateWidgetPosition(
                    pendingPosition.instanceId,
                    pendingPosition.x,
                    pendingPosition.y
                );
            }
        );
    }

    function handleWidgetPointerUp(
        event: PointerEvent<HTMLDivElement>
    ) {
        if (interactionRef.current !== "dragging") {
            return;
        }

        // Annuleer een ingepland animation frame
        if (dragFrameRef.current !== null) {
            cancelAnimationFrame(
                dragFrameRef.current
            );

            dragFrameRef.current = null;
        }

        // Haal de laatste berekende positie op
        const pendingPosition =
            pendingDragPositionRef.current;

        pendingDragPositionRef.current = null;

        // Beëindig de drag-operatie
        dragRef.current = null;
        interactionRef.current = "idle";

        // Sla de definitieve positie op
        if (pendingPosition) {
            updateWidgetPosition(
                pendingPosition.instanceId,
                pendingPosition.x,
                pendingPosition.y
            );
        }

        // Geef Pointer Capture vrij
        if (
            event.currentTarget.hasPointerCapture(
                event.pointerId
            )
        ) {
            event.currentTarget.releasePointerCapture(
                event.pointerId
            );
        }
    }

    function handleWidgetPointerCancel() {
        if (dragFrameRef.current !== null) {
            cancelAnimationFrame(
                dragFrameRef.current
            );

            dragFrameRef.current = null;
        }

        pendingDragPositionRef.current = null;
        dragRef.current = null;

        if (interactionRef.current === "dragging") {
            interactionRef.current = "idle";
        }
    }

    // Cleanup wanneer de component verdwijnt
    useEffect(() => {
        return () => {
            if (dragFrameRef.current !== null) {
                cancelAnimationFrame(
                    dragFrameRef.current
                );

                dragFrameRef.current = null;
            }

            pendingDragPositionRef.current = null;
            dragRef.current = null;

            if (
                interactionRef.current === "dragging"
            ) {
                interactionRef.current = "idle";
            }
        };
    }, [interactionRef]);

    return {
        handleWidgetPointerDown,
        handleWidgetPointerMove,
        handleWidgetPointerUp,
        handleWidgetPointerCancel,
    };
}