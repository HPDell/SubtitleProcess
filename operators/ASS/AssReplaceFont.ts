import AssSubtitle from "../../models/AssSubtitle";
import { EffectElement } from "../../models/ASS/EventModels/DialogTextElements/EffectElement";
import { EffectCode } from "../../models/ASS/EventModels/DialogTextElements/EffectElement";

export function assReplaceFont(subtitle: AssSubtitle) {
    
}

export function findFont(subtitle: AssSubtitle): Set<string> {
    let fontSet = new Set<string>();
    subtitle.v4Styles.styles.forEach(v4Style => {
        fontSet.add(v4Style.Fontname);
    });
    for (const dialogue of subtitle.events.lines) {
        for (const text of dialogue.Text.contents) {
            if (text instanceof EffectElement) {
                effectFindFont((text as EffectElement)).forEach(font => {
                    fontSet.add(font);
                });
            }
        }
    }
    return fontSet;
}



/**
 * 找到特效代码中所用到的字体
 */
function effectFindFont(effectElement: EffectElement): Set<string> {
    return new Set<string>(effectElement.content.filter(item => {
        return item.name == "fn";
    }).map(item => {
        return item.value[0] as string;
    }))
}

export function replaceFont(subtitle: AssSubtitle, fontMap: Map<string, string>) {
    subtitle.v4Styles.styles.forEach(style => {
        if (style.Fontname in fontMap.keys()) {
            style.Fontname = fontMap[style.Fontname];
        }
    });
    for (const dialogue of subtitle.events.lines) {
        for (const text of dialogue.Text.contents) {
            if (text instanceof EffectElement) {
                for (const item of text.content) {
                    effectCodeReplaceFont(item, fontMap);
                }
            }
        }
    }
}

function effectCodeReplaceFont(effectCode: EffectCode, fontMap: Map<string, string>) {
    if (effectCode.name == "fn") {
        if (effectCode.value) {
            effectCode.value = effectCode.value.map(value => {
                if (value instanceof EffectCode) {
                    return effectCodeReplaceFont(value, fontMap);
                } else {
                    return fontMap[value];
                }
            })
        }
    }
    return effectCode;
}