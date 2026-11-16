import {useEffect, useRef} from "react";
import type {PointerEvent, RefObject} from "react";

import {useEditorStore} from "../store/useEditorStore.ts";
import {snapToGrid} from "../utils/snapToGrid.ts";
import type {CanvasInteraction} from "../model/CanvasInteraction.ts";

type ResizeState = {
    instanceId: string;
    startPointerX: number;
    startPointerY: number;
    startWidth: number;
    startHeight: number;
    stageWidth: number;
    stageHeight: number;
};

type PendingResizeSize = {
    instanceId: string;
    width: number;
    height: number;
};

const CANVAS_WIDTH = 1920;
const CANVAS_HEIGHT = 1080;

const MIN_WIDTH = 40;
const MIN_HEIGHT = 40;

export function useWidgetResize(
    interactionRef: RefObject<CanvasInteraction>
) {
    const project = useEditorStore(
        (state) => state.project
    );

    const canvasSettings = useEditorStore(
        (state) => state.canvasSettings
    );

    const updateWidgetSize = useEditorStore(
        (state) => state.updateWidgetSize
    );

    const activeScene = project.scenes[0];

    const resizeRef = useRef<ResizeState | null>(null);

    const resizeFrameRef = useRef<number | null>(null);

    const pendingResizeSizeRef =
        useRef<PendingResizeSize | null>(null);

    function handleResizePointerDown(
        event: PointerEvent<HTMLDivElement>,
        instanceId: string
    ) {
        if (event.button !== 0) {
            return;
        }

        event.stopPropagation();

        // Voorkom gelijktijdig dragging en resizing
        if (interactionRef.current !== "idle") {
            return;
        }

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

        // Bewaar de oorspronkelijke afmetingen
        resizeRef.current = {
            instanceId,
            startPointerX: event.clientX,
            startPointerY: event.clientY,
            startWidth: instance.size.width,
            startHeight: instance.size.height,
            stageWidth: stageRect.width,
            stageHeight: stageRect.height,
        };

        // Markeer de actieve interactie
        interactionRef.current = "resizing";

        // Blijf pointer-events ontvangen
        event.currentTarget.setPointerCapture(
            event.pointerId
        );
    }

    function handleResizePointerMove(
        event: PointerEvent<HTMLDivElement>
    ) {
        if (interactionRef.current !== "resizing") {
            return;
        }

        const resize = resizeRef.current;

        if (!resize) {
            return;
        }

        if (event.buttons !== 1) {
            handleResizePointerCancel();
            return;
        }

        // Bereken de muisverplaatsing
        const deltaX =
            event.clientX - resize.startPointerX;

        const deltaY =
            event.clientY - resize.startPointerY;

        // Zet schermpixels om naar virtuele Canvas-pixels
        const scaleX =
            CANVAS_WIDTH / resize.stageWidth;

        const scaleY =
            CANVAS_HEIGHT / resize.stageHeight;

        // Bereken de nieuwe afmetingen
        const newWidth = Math.round(
            resize.startWidth + deltaX * scaleX
        );

        const newHeight = Math.round(
            resize.startHeight + deltaY * scaleY
        );

        // Voorkom te kleine widgets
        const constrainedWidth = Math.max(
            MIN_WIDTH,
            newWidth
        );

        const constrainedHeight = Math.max(
            MIN_HEIGHT,
            newHeight
        );

        // Pas eventueel Snap to Grid toe
        const finalWidth = canvasSettings.snapToGrid
            ? Math.max(
                MIN_WIDTH,
                snapToGrid(
                    constrainedWidth,
                    canvasSettings.gridSize
                )
            )
            : constrainedWidth;

        const finalHeight = canvasSettings.snapToGrid
            ? Math.max(
                MIN_HEIGHT,
                snapToGrid(
                    constrainedHeight,
                    canvasSettings.gridSize
                )
            )
            : constrainedHeight;

        // Bewaar de meest recente afmetingen
        pendingResizeSizeRef.current = {
            instanceId: resize.instanceId,
            width: finalWidth,
            height: finalHeight,
        };

        // Voorkom meerdere updates binnen hetzelfde frame
        if (resizeFrameRef.current !== null) {
            return;
        }

        resizeFrameRef.current = requestAnimationFrame(
            () => {
                resizeFrameRef.current = null;

                const pendingSize =
                    pendingResizeSizeRef.current;

                pendingResizeSizeRef.current = null;

                if (
                    !pendingSize ||
                    interactionRef.current !== "resizing"
                ) {
                    return;
                }

                updateWidgetSize(
                    pendingSize.instanceId,
                    pendingSize.width,
                    pendingSize.height
                );
            }
        );
    }

    function handleResizePointerUp(
        event: PointerEvent<HTMLDivElement>
    ) {
        if (interactionRef.current !== "resizing") {
            return;
        }

        // Annuleer een ingepland animation frame
        if (resizeFrameRef.current !== null) {
            cancelAnimationFrame(
                resizeFrameRef.current
            );

            resizeFrameRef.current = null;
        }

        // Haal de definitieve afmetingen op
        const pendingSize =
            pendingResizeSizeRef.current;

        pendingResizeSizeRef.current = null;

        // Beëindig resizing
        resizeRef.current = null;
        interactionRef.current = "idle";

        // Sla de laatste afmetingen op
        if (pendingSize) {
            updateWidgetSize(
                pendingSize.instanceId,
                pendingSize.width,
                pendingSize.height
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

    function handleResizePointerCancel() {
        if (resizeFrameRef.current !== null) {
            cancelAnimationFrame(
                resizeFrameRef.current
            );

            resizeFrameRef.current = null;
        }

        pendingResizeSizeRef.current = null;
        resizeRef.current = null;

        if (interactionRef.current === "resizing") {
            interactionRef.current = "idle";
        }
    }

    // Cleanup wanneer de component verdwijnt
    useEffect(() => {
        return () => {
            if (resizeFrameRef.current !== null) {
                cancelAnimationFrame(
                    resizeFrameRef.current
                );

                resizeFrameRef.current = null;
            }

            pendingResizeSizeRef.current = null;
            resizeRef.current = null;

            if (
                interactionRef.current === "resizing"
            ) {
                interactionRef.current = "idle";
            }
        };
    }, [interactionRef]);

    return {
        handleResizePointerDown,
        handleResizePointerMove,
        handleResizePointerUp,
        handleResizePointerCancel,
    };
}