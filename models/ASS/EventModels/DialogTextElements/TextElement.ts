import DialogTextElement from "../DialogTextElement";

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