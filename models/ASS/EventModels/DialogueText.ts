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
        const matchRegEpr = /{\\\S+}/g;
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
            for (const effectCode of effects) {
                let index = dialogue.indexOf(effectCode);
                if (lastIndex === index) {
                    this.contents.push(new EffectElement(effectCode));
                    lastIndex += effectCode.length;
                } else {
                    while (textIndex < texts.length && lastIndex < index) {
                        this.contents.push(new TextELement(texts[textIndex]));
                        lastIndex += texts[textIndex].length;
                        textIndex++;
                    }
                    this.contents.push(new EffectElement(effectCode));
                    lastIndex += effectCode.length;
                }
            }
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


/**
 * 对话文本元素基类
 */
abstract class DialogTextElement {

    /** 返回文本内容字符串 */
    abstract toString();

}


/**
 * 文本元素
 */
export class TextELement extends DialogTextElement{

    /** 文本内容 */
    content: string;

    /**
     * 构造函数
     * @param text 对话文本
     */
    constructor(text) {
        super()
        this.content = text;
    }

    toString() {
        return this.content;
    }
    
}


/**
 * 特效代码元素
 */
export class EffectElement extends DialogTextElement {

    /** 特效代码列表 */
    content: string[];

    /**
     * 构造函数
     * @param effect 特效代码段
     */
    constructor(effect: string) {
        super();
        this.content = [];
        if (effect.search(/{\\\S*?}/) > 1) {
            this.content = this.content.concat(/{\\\S+?}/.exec(effect));
        } else {
            this.content.push(effect);
        }
    }

    toString() {
        return this.content.join("");
    }
}

export default DialogueText;