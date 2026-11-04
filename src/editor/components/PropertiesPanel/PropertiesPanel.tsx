import {useEditorStore} from "../../store/useEditorStore";
import "./PropertiesPanel.css";
import {PropertyLabel} from "./PropertyLabel/PropertyLabel.tsx";
import {NumberPropertyInput} from "./NumberPropertyInput/NumberPropertyInput.tsx";

export function PropertiesPanel() {
    const project = useEditorStore((state) => state.project);

    const selectedWidgetInstanceId = useEditorStore(
        (state) => state.selectedWidgetInstanceId
    );

    const updateWidgetPosition = useEditorStore(
        (state) => state.updateWidgetPosition);

    const selectedInstance = project.scenes
        .flatMap((scene) => scene.widgetInstances)
        .find((instance) => instance.id === selectedWidgetInstanceId);

    const selectedWidget = project.widgets.find(
        (widget) => widget.id === selectedInstance?.widgetId
    );

    if (!selectedInstance || !selectedWidget) {
        return (
            <aside className="properties-panel">
                <h2>Properties</h2>
                <p>Select a widget to view its properties.</p>
            </aside>
        );
    }

    return (
        <aside className="properties-panel">
            <h2>Properties</h2>

            <div className="properties-panel-content">
                <section className="properties-section">
                    <h3>General</h3>
                    <div className="property">
                        <PropertyLabel
                            label="Widget name"
                            description="The name used to identify this widget in Aurora."
                        />
                        <span>{selectedWidget.name}</span>
                    </div>

                    <div className="property">
                        <PropertyLabel
                            label="Widget type"
                            description="The type of content this widget displays."
                        />
                        <span>{selectedWidget.type}</span>
                    </div>
                </section>
                <section className="properties-section">
                    <h3>Position &amp; Size</h3>
                    <div className="property">
                        <PropertyLabel label="Horizontal position"
                                       description="Move this widget left or right. A higher value moves it furter to the right."
                        />
                        <NumberPropertyInput
                            value={selectedInstance.position.x}
                            max={Math.max(0, 1920 - selectedInstance.size.width)}
                            onChange={(newX) => {
                                updateWidgetPosition(
                                    selectedInstance.id,
                                    newX,
                                    selectedInstance.position.y
                                );
                            }}
                        />
                    </div>

                    <div className="property">
                        <PropertyLabel
                            label="Vertical position"
                            description="Move this widget up or down. A higher value moves it further down."
                        />


                        <NumberPropertyInput
                            value={selectedInstance.position.y}
                            max={Math.max(0, 1080 - selectedInstance.size.height)}
                            onChange={(newY) => {
                                updateWidgetPosition(
                                    selectedInstance.id,
                                    selectedInstance.position.x,
                                    newY
                                );
                            }}
                        />

                    </div>

                    <div className="property">
                        <PropertyLabel
                            label="Width"
                            description="Controls how wide this widget appears on your stream."
                        />
                        <span>{selectedInstance.size.width}</span>
                    </div>

                    <div className="property">
                        <PropertyLabel
                            label="Height"
                            description="Controls how tall this widget appears on your stream."
                        />
                        <span>{selectedInstance.size.height}</span>
                    </div>
                </section>
                <section className="properties-section">
                    <h3>Appearence</h3>
                    <div className="property">
                        <PropertyLabel
                            label="Display order"
                            description="Controls which widgets appear in front of others. Higher values appear on top."
                        />
                        <span>{selectedInstance.layer}</span>
                    </div>

                    <div className="property">
                        <PropertyLabel
                            label="Opacity"
                            description="Controls how visible the widget is. 100% is fully visible, while 0% is completely transparent."
                        />
                        <span>{Math.round(selectedInstance.opacity * 100)}%</span>
                    </div>
                </section>
            </div>
        </aside>
    );
}