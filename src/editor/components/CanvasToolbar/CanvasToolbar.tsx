import { useEditorStore } from "../../store/useEditorStore";
import "./CanvasToolbar.css";

export function CanvasToolbar() {
    const canvasSettings = useEditorStore(
        (state) => state.canvasSettings
    );

    const setShowGrid = useEditorStore(
        (state) => state.setShowGrid
    );

    const setSnapToGrid = useEditorStore(
        (state) => state.setSnapToGrid
    );

    const setGridSize = useEditorStore(
        (state) => state.setGridSize
    );

    return (
        <div className="canvas-toolbar">
            <label className="canvas-toolbar-option">
                <input
                    type="checkbox"
                    checked={canvasSettings.showGrid}
                    onChange={(event) =>
                        setShowGrid(event.target.checked)
                    }
                />
                Show Grid
            </label>

            <label className="canvas-toolbar-option">
                <input
                    type="checkbox"
                    checked={canvasSettings.snapToGrid}
                    onChange={(event) =>
                        setSnapToGrid(event.target.checked)
                    }
                />
                Snap to Grid
            </label>

            <label className="canvas-toolbar-option">
                Grid Size

                <select
                    className="canvas-toolbar-select"
                    value={canvasSettings.gridSize}
                    onChange={(event) =>
                        setGridSize(Number(event.target.value))
                    }
                >
                    <option value={10}>10 px</option>
                    <option value={20}>20 px</option>
                    <option value={40}>40 px</option>
                    <option value={80}>80 px</option>
                </select>
            </label>
        </div>
    );
}