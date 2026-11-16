
import type {PointerEvent, RefObject} from "react";
import {useEditorStore} from "../store/useEditorStore.ts";
import {snapToGrid} from "../utils/snapToGrid.ts";
import {useEffect, useRef} from "react";

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
    resizeRef: RefObject<unknown>
) {

    const project = useEditorStore((state) => state.project);

    const selectWidgetInstance = useEditorStore(
        (state) => state.selectWidgetInstance
    );

    const activeScene = project.scenes[0];

    const canvasSettings = useEditorStore(
        (state) => state.canvasSettings
    );

    const updateWidgetPosition = useEditorStore(
        (state) => state.updateWidgetPosition
    );

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
        // Voorkom dragging tijdens resizing
        if (resizeRef.current) {
            return;
        }

        // Alleen verplaatsen zolang de linkermuisknop ingedrukt is
        if (event.buttons !== 1) {
            handleWidgetPointerCancel();
            return;
        }

        const drag = dragRef.current;

        if (!drag) {
            return;
        }

        // Bereken de muisverplaatsing
        const deltaX = event.clientX - drag.startPointerX;
        const deltaY = event.clientY - drag.startPointerY;

        // Zet schermpixels om naar virtuele Canvas-pixels
        const scaleX = CANVAS_WIDTH / drag.stageWidth;
        const scaleY = CANVAS_HEIGHT / drag.stageHeight;

        const newX = Math.round(
            drag.startWidgetX + deltaX * scaleX
        );

        const newY = Math.round(
            drag.startWidgetY + deltaY * scaleY
        );

        // Pas Snap to Grid toe wanneer ingeschakeld
        const finalX = canvasSettings.snapToGrid
            ? snapToGrid(newX, canvasSettings.gridSize)
            : newX;

        const finalY = canvasSettings.snapToGrid
            ? snapToGrid(newY, canvasSettings.gridSize)
            : newY;

        // Bewaar de laatst berekende positie
        pendingDragPositionRef.current = {
            instanceId: drag.instanceId,
            x: finalX,
            y: finalY,
        };

        // Er staat al een update gepland
        if (dragFrameRef.current !== null) {
            return;
        }

        // Werk Zustand maximaal één keer per animation frame bij
        dragFrameRef.current = requestAnimationFrame(() => {
            dragFrameRef.current = null;

            const pendingPosition = pendingDragPositionRef.current;
            pendingDragPositionRef.current = null;

            if (!pendingPosition) {
                return;
            }

            updateWidgetPosition(
                pendingPosition.instanceId,
                pendingPosition.x,
                pendingPosition.y
            );
        });
    }

    function handleWidgetPointerUp(
        event: PointerEvent<HTMLDivElement>
    ) {
        if (!dragRef.current) {
            return;
        }

        // Annuleer een eventueel ingepland animation frame
        if (dragFrameRef.current !== null) {
            cancelAnimationFrame(dragFrameRef.current);
            dragFrameRef.current = null;
        }

        // Haal de laatst berekende positie op
        const pendingPosition = pendingDragPositionRef.current;
        pendingDragPositionRef.current = null;

        // Beëindig de drag-operatie
        dragRef.current = null;

        // Sla de definitieve positie op
        if (pendingPosition) {
            updateWidgetPosition(
                pendingPosition.instanceId,
                pendingPosition.x,
                pendingPosition.y
            );
        }

        // Geef Pointer Capture vrij
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
        }
    }

    function handleWidgetPointerCancel() {
        if (dragFrameRef.current !== null) {
            cancelAnimationFrame(dragFrameRef.current);
            dragFrameRef.current = null;
        }

        pendingDragPositionRef.current = null;
        dragRef.current = null;
    }

    useEffect(() => {
        return () => {
            if (dragFrameRef.current !== null) {
                cancelAnimationFrame(dragFrameRef.current);
                dragFrameRef.current = null;
            }

            pendingDragPositionRef.current = null;
            dragRef.current = null;
        };
    }, []);

    return {
        handleWidgetPointerDown,
        handleWidgetPointerMove,
        handleWidgetPointerUp,
        handleWidgetPointerCancel,
    };
}