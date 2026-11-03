import "./Sidebar.css";
import {WidgetLibrary} from "./WidgetLibrary/WidgetLibrary.tsx";


export function Sidebar() {
    return (
        <aside className="sidebar">
            <WidgetLibrary />
        </aside>
    );
}