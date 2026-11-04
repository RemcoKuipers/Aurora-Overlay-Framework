import type { Scene } from "./Scene";
import type { Widget } from "../../widgets/model/Widget";
import type { Asset } from "../../assets/model/Asset";
import type { Theme } from "../../themes/model/Theme";
import type { ExportProfile } from "../../export/model/ExportProfile";

export interface Project {
    id: string;
    name: string;
    scenes: Scene[];
    widgets: Widget[];
    assets: Asset[];
    activeTheme: Theme;
    exportProfiles: ExportProfile[];
}