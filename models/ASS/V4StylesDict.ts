import V4Style from "./V4Style";

class V4StylesDict {

    /** 样式表字典 */
    styles: Map<string, V4Style> = new Map<string, V4Style>();

    /**
     * 解析样式
     * @param line 样式表行
     */
    parse(line: string): V4StylesDict {
        let [title, ...content] = line.split(": ", 2);
        switch (title) {
            case "Style":
                let v4Style = V4Style.load(content.join(": "));
                this.styles.set(v4Style.Name, v4Style);
                break;
            default:
                break;
        }
        return this;
    }

}

export default V4StylesDict;