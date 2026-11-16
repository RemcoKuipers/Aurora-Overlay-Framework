import {create} from "zustand";
import type {Project} from "../../project/model/Project.ts";
import {createDemoProject} from "../data/createDemoProject.ts";
import type {CanvasSettings} from "../model/CanvasSettings.ts";
import type {WidgetType} from "../../widgets/model/WidgetType.ts";
import {createWidget} from "../../widgets/factory/WidgetFactory.ts";
import {createWidgetInstance} from "../../widgets/factory/WidgetInstanceFactory.ts";

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
    ) => void;

    updateWidgetSize: (
        instanceId: string,
        width: number,
        height: number
    ) => void;


    addWidget: (widgetType: WidgetType,
                position?: { x: number, y: number }
    ) => void;
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
        set((state) => {
            if (!Number.isFinite(x) || !Number.isFinite(y)) {
                return state;
            }

            const instance = state.project.scenes
                .flatMap((scene) => scene.widgetInstances)
                .find((instance) => instance.id === instanceId);

            if (!instance) {
                return state;
            }

            if (
                instance.position.x === x &&
                instance.position.y === y
            ) {
                return state;
            }

            return {
                project: {
                    ...state.project,

                    scenes: state.project.scenes.map((scene) => ({
                        ...scene,

                        widgetInstances: scene.widgetInstances.map((instance) => {
                            if (instance.id !== instanceId) {
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
            };
        }),

    updateWidgetSize: (instanceId, width, height) =>
        set((state) => ({
            project: {
                ...state.project,

                scenes: state.project.scenes.map((scene) => ({
                    ...scene,

                    widgetInstances: scene.widgetInstances.map((instance) => {
                        if (instance.id !== instanceId) {
                            return instance;
                        }

                        if (!Number.isFinite(width) || !Number.isFinite(height)) {
                            return instance;
                        }

                        if (width <= 0 || height <= 0) {
                            return instance;
                        }

                        return {
                            ...instance,
                            size: {
                                width,
                                height,
                            },
                        };
                    }),
                })),
            },
        })),


    addWidget: (widgetType, position?: { x: number; y: number }) => {
        const newWidget = createWidget(widgetType);
        const newInstance = createWidgetInstance(newWidget.id, newWidget.type);

        if (position) {
            newInstance.position = position;
        }

        set((state) => ({
            project: {
                ...state.project,

                widgets: [
                    ...state.project.widgets,
                    newWidget,
                ],

                scenes: state.project.scenes.map((scene, index) => {
                    if (index !== 0) {
                        return scene;
                    }

                    return {
                        ...scene,
                        widgetInstances: [
                            ...scene.widgetInstances,
                            newInstance,
                        ],
                    }
                })
            },
            selectedWidgetInstanceId: newInstance.id,
        }));
    },
}));
