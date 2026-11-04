import { create } from "zustand";
import type {Project} from "../../project/model/Project.ts";
import {createDemoProject} from "../data/createDemoProject.ts";
import type {CanvasSettings} from "../model/CanvasSettings.ts";

interface EditorState {
    project: Project;
    canvasSettings: CanvasSettings;
    setShowGrid: (enabled: boolean) => void;
    setSnapToGrid: (enabled: boolean) => void;
    setGridSize: (size: number) => void;
    selectedWidgetInstanceId: string | null;

    selectWidgetInstance: (id: string) => void;
    clearSelection: () => void;

    updateWidgetPosition: (
        instanceId: string,
        x: number,
        y: number
    )=> void;
}

export const useEditorStore = create<EditorState>((set) => ({
    project: createDemoProject(),

    canvasSettings: {
        showGrid: true,
        snapToGrid: true,
        gridSize: 40,
    },

    setShowGrid: (enabled) =>
        set((state) => ({
            canvasSettings: {
                ...state.canvasSettings,
                showGrid: enabled,
            },
        })),

    setSnapToGrid: (enabled) =>
        set((state) => ({
            canvasSettings: {
                ...state.canvasSettings,
                snapToGrid: enabled,
            },
        })),

    setGridSize: (size) =>
        set((state) => {
            if (!Number.isFinite(size) || size <= 0) {
                return state;
            }

            return {
                canvasSettings: {
                    ...state.canvasSettings,
                    gridSize: size,
                },
            };
        }),

    selectedWidgetInstanceId: null,

    selectWidgetInstance: (id) =>
        set({selectedWidgetInstanceId: id}),

    clearSelection: () =>
        set({selectedWidgetInstanceId: null}),

    updateWidgetPosition: (instanceId, x, y) =>
        set((state) => ({
            project: {
                ...state.project,

                scenes: state.project.scenes.map((scene) => ({
                    ...scene,

                    widgetInstances: scene.widgetInstances.map((instance) => {
                        if (instance.id !== instanceId) {
                            return instance;
                        }

                        if (!Number.isFinite(x) || !Number.isFinite(y)) {
                            return instance;
                        }

                        return {
                            ...instance,
                            position: {
                                x,
                                y,
                            },
                        };
                    }),
                })),
            },
        })),
}));
