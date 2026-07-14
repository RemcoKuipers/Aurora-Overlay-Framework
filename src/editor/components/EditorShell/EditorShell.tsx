import "./EditorShell.css"

import {Header} from "../Header/Header.tsx";
import {Sidebar} from "../Sidebar/Sidebar.tsx";
import {Canvas} from "../Canvas/Canvas.tsx";
import {PropertiesPanel} from "../Propertiespanel/PropertiesPanel.tsx";
import {StatusBar} from "../StatusBar/StatusBar.tsx";

export function EditorShell() {
    return (
        <div className="editor-shell">
            <Header/>
            <Sidebar/>
            <Canvas/>
            <PropertiesPanel/>
            <StatusBar/>

        </div>
    );
}