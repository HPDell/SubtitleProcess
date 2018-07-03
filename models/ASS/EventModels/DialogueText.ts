import DialogTextElement from "./DialogTextElement";
import { TextELement } from "./DialogTextElements/TextElement";
import { EffectElement } from "./DialogTextElements/EffectElement";

/**
 * 对话内容
 */
class DialogueText {
    /** 对话内容列表。包含文字和特效代码。 */
    contents: DialogTextElement[];
    constructor() {
        this.contents = [];
    }

    /**
     * 解析对话内容
     * @param dialogue 对话内容
     */
    parse(dialogue: string): DialogueText {
        const matchRegEpr = /{\\\S+?}/g;
        if (matchRegEpr.test(dialogue)) {
            let effects = dialogue.match(matchRegEpr);
            let texts = dialogue.split(matchRegEpr).filter((value) => {
                return value != "";
            });
            let lastIndex = 0;
            let textIndex = 0;
            if (dialogue.indexOf(effects[0]) > 0) {
                this.contents.push(new TextELement(texts[textIndex]));
                textIndex++;
                lastIndex += texts[0].length;
            }
            let concatEffectCode = "";
            for (const effectCode of effects) {
                let index = dialogue.indexOf(effectCode);
                if (lastIndex === index) {
                    concatEffectCode += effectCode;
                    lastIndex += effectCode.length;
                } else {
                    this.contents.push(new EffectElement(concatEffectCode));
                    while (textIndex < texts.length && lastIndex < index) {
                        this.contents.push(new TextELement(texts[textIndex]));
                        lastIndex += texts[textIndex].length;
                        textIndex++;
                    }
                    concatEffectCode = effectCode;
                    lastIndex += effectCode.length;
                }
            }
            this.contents.push(new EffectElement(concatEffectCode));
            while (textIndex < texts.length) {
                this.contents.push(new TextELement(texts[textIndex]));
                textIndex++;
            }
        } else {
            this.contents.push(new TextELement(dialogue));
        }
        return this;
    }

    /**
     * 从对话内容行加载
     * @param dialog 对话内容
     */
    static load(dialog: string): DialogueText {
        let dialogText = new DialogueText();
        dialogText.parse(dialog);
        return dialogText;
    }

}

export default DialogueText;