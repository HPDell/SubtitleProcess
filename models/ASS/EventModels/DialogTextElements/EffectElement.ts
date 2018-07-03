import DialogTextElement from "../DialogTextElement";

/**
 * 特效代码元素
 */
export class EffectElement extends DialogTextElement {

    /** 特效代码列表 */
    content: EffectCode[];

    /**
     * 构造函数
     * @param effect 特效代码段
     */
    constructor(effect: string) {
        super();
        this.content = [];
        if (effect.match(/{\\\S+?}/g).length > 1) {
            let effectItemList = effect.match(/{\\\S+?}/g);
            for (const item of effectItemList) {
                this.content = this.content.concat(this.splitEffectCode(item));
            }
        } else {
            this.content = this.content.concat(this.splitEffectCode(effect));
        }
    }

    toString(): string {
        return this.content.join("");
    }

    splitEffectCode(item: string): EffectCode[] {
        return item.substring(1, item.length - 1).split("\\").filter(value => {
            return value != "";
        }).map(code => {
            let reg = /^[0-9]?[a-z]+/;
            if (reg.test(code)) {
                let name = code.match(reg)[0];
                let value = code.substring(name.length);
                return {
                    name: name,
                    value: value
                }
            } else {
                return {
                    name: code,
                    value: ""
                }
            }
        })
    }

    /**
     * 找到特效代码中所用到的字体
     */
    findFont(): Set<string> {
        return new Set<string>(this.content.filter(item => {
            return item.name == "fn";
        }).map(item => {
            return item.value;
        }))
    }
}

class EffectCode {
    name: string;
    value: string;
}