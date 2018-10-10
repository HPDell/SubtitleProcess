import Subtitle from "./Subtitle";
import ScriptInfo from "./ASS/ScriptInfo";
import V4StylesDict from "./ASS/V4StylesDict";
import Events from "./ASS/Events";
import readline = require("n-readlines");
import { EffectElement } from "./ASS/EventModels/DialogTextElements/EffectElement";

class AssSubtitle implements Subtitle {

    /** [Script Info] 标签 */
    scriptInfo: ScriptInfo;

    /** [V4+ Styles] 标签 */
    v4Styles: V4StylesDict;

    /** [Events] 标签 */
    events: Events;

    constructor(scriptInfo?: ScriptInfo, v4Styles?: V4StylesDict, events?: Events) {
        this.scriptInfo = scriptInfo ? scriptInfo : new ScriptInfo();
        this.v4Styles = v4Styles ? v4Styles : new V4StylesDict();
        this.events = events ? events : new Events();
    }

    parse(filename: string): AssSubtitle {
        let reader = new readline(filename);
        let line = "";
        while (line = reader.next()) {
            line = line.toString().trim();
            switch (line) {
                case "[Script Info]":
                    while ((line = reader.next())) {
                        line = line.toString().trim();
                        if (line == "" || line == "[V4+ Styles]" || line == "[Events]") {
                            break;
                        } else {
                            this.scriptInfo.parse(line);
                        }
                    }
                    break;
                case "[V4+ Styles]":
                    reader.next();
                    while (line = reader.next()) {
                        line = line.toString().trim();
                        if (line == "" || line == "[Script Info]" || line == "[Events]") {
                            break;
                        } else {
                            this.v4Styles.parse(line);
                        }
                    }
                    break;
                case "[Events]":
                    reader.next();
                    while (line = reader.next()) {
                        line = line.toString().trim();
                        if (line == "" || line == "[Script Info]" || line == "[V4+ Styles]") {
                            break;
                        } else {
                            this.events.parse(line);
                        }
                    }
                    break;
                default:
                    break;
            }
        }
        return this;
    }

    save(filename?: string) {
        throw new Error("Method not implemented.");
    }

    findFont(): Set<string> {
        let fontSet = new Set<string>();
        this.v4Styles.styles.forEach(v4Style => {
            fontSet.add(v4Style.Fontname);
        });
        for (const dialogue of this.events.lines) {
            for (const text of dialogue.Text.contents) {
                if (text instanceof EffectElement) {
                    (text as EffectElement).findFont().forEach(font => {
                        fontSet.add(font);
                    });
                }
            }
        }
        return fontSet;
    }

    replaceFont(fontMap: Map<string, string>) {
        this.v4Styles.styles.forEach(style => {
            if (style.Fontname in fontMap.keys()) {
                style.Fontname = fontMap[style.Fontname];
            }
        });
        for (const dialogue of this.events.lines) {
            for (const text of dialogue.Text.contents) {
                if (text instanceof EffectElement) {
                    for (const item of text.content) {
                        // if (item.name == "fn" && item.value in fontMap.keys()) {
                        //     item.value = fontMap[item.value];
                        // }
                    }
                }
            }
        }
    }
}

export default AssSubtitle;