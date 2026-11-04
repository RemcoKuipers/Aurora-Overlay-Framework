import { useMemo } from "react";
import { createDemoProject } from "../../data/createDemoProject";
import { WidgetRenderer } from "../../../widgets/components/WidgetRenderer/WidgetRenderer";
import "./Canvas.css";

const CANVAS_WIDTH = 1920;
const CANVAS_HEIGHT = 1080;

export function Canvas() {
    const project = useMemo(() => createDemoProject(), []);

    const activeScene = project.scenes[0];

    return (
        <main className="canvas">
            <div className="canvas-stage">
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
                            className="canvas-widget"
                            style={{
                                left: `${(instance.position.x / CANVAS_WIDTH) * 100}%`,
                                top: `${(instance.position.y / CANVAS_HEIGHT) * 100}%`,
                                width: `${(instance.size.width / CANVAS_WIDTH) * 100}%`,
                                height: `${(instance.size.height / CANVAS_HEIGHT) * 100}%`,
                                zIndex: instance.layer,
                                opacity: instance.opacity,
                            }}
                        >
                            <WidgetRenderer widget={widget} />
                        </div>
                    );
                })}
            </div>
        </main>
    );
}