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
        let effectCodeList = [];
        let effect: EffectCode | null = null;
        let flagReadEffect = false;
        let flagReadValue = false;
        let flagValueArray = false;
        let leftParenthesisNum = 0;
        let temp = "";
        for (let i = 0; i < item.length; i++) {
            let char = item[i];
            if (char == "\\") {
                if (flagReadEffect == true) {
                    if (flagReadValue == true && flagValueArray == true) {
                        let subEffects = this.splitEffectCode(item.slice(i));
                        if (subEffects.length > 0) {
                            let firstSubEffect = subEffects[0]
                            effect.pushValue(firstSubEffect);
                            let firstSubEffectLength = firstSubEffect.toString().length;
                            i += firstSubEffectLength - 1;
                        }
                    } else {
                        if (effect) {
                            effect.pushValue(temp);
                            temp = "";
                            effectCodeList.push(effect);
                            flagReadValue = false;
                        }
                        flagReadEffect = false;
                        i--;
                    }
                } else {
                    effect = new EffectCode();
                    flagReadEffect = true;
                }
            } else if (char == "(") {
                if (!flagReadValue) {
                    flagReadValue = true;
                    if (!flagValueArray) {
                        flagValueArray = true;
                        if (effect) {
                            effect.name = temp;
                            temp = "";
                        }
                    } 
                    leftParenthesisNum++;
                } else {
                    if (flagValueArray) {
                        temp += char;
                    }
                }
            } else if (char == ")") {
                if (flagReadValue && flagValueArray) {
                    if (leftParenthesisNum > 1) {
                        leftParenthesisNum --;
                    } else if (leftParenthesisNum == 1) {
                        effect.pushValue(temp);
                        flagValueArray = false;
                        temp = "";
                        leftParenthesisNum --;
                    }
                } else {
                    flagReadEffect = false;
                    effectCodeList.push(effect);
                    effect = new EffectCode();
                    return effectCodeList;
                }
            } else if (/[0-9&\u4e00-\u9fa5]/.test(char)) {
                if (item[i - 1] == "\\") {
                    temp += char;
                } else {
                    if (flagReadValue) {
                        temp += char;
                    } else {
                        if (effect) {
                            effect.name = temp;
                            temp = "";
                        }
                        flagReadValue = true;
                        temp += char;
                    }
                }
            } else if (char == ",") {
                if (flagReadEffect && flagReadValue) {
                    effect.pushValue(temp)
                    temp = "";
                } else {
                    return effectCodeList;
                }
            } else if (char == "{") {
                continue;
            } else if (char == "}") {
                if (temp != "") {
                    effect.value.push(temp);
                    temp = "";
                }
                effectCodeList.push(effect);
                break;
            } else {
                temp += char;
            }
        }
        return effectCodeList;
    }
}

export class EffectCode {
    name: string;
    value: Array<number | string | EffectCode>;

    constructor() {
        this.name = "";
        this.value = [];
    }

    toString() : string {
        let code = `\\${this.name}`;
        let values = this.value.map(value => value.toString()).join(",");
        if (this.value.length > 1) {
            return `${code}(${values})`;
        } else {
            return `${code}${values}`
        }
    }

    pushValue(value: string | number | EffectCode) {
        if (value == "") {
            return;
        }
        if (typeof value == "string") {
            if (/^[0-9]+$/.test(value.toString())) {
                this.value.push(parseInt(value.toString()));
            } else {
                this.value.push(value);
            }
        } else {
            this.value.push(value);
        }
    }

    setValue (value: string) {
        let valueItemList = value.split(",");
        for (let i = 0; i < valueItemList.length; i++) {
            const item = valueItemList[i];
            if (/^\\\S\(/.test(item)) {
                let closeItem = valueItemList.slice(i).findIndex((item) => {
                    return /\)/.test(item);
                });
            } else {
                if (/^[0-9]+$/.test(item)) {
                    this.value.push(parseInt(item));
                } else {
                    this.value.push(item);
                }
            }
        }
    }
}