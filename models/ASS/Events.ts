import Dialogue from "./EventModels/Dialogue";

class Events {

    /** 对话行 */
    lines: Dialogue[] = [];

    /**
     * 解析对话行
     * @param line 对话行
     */
    parse(line: string): Events {
        let [key, ...value] = line.split(": ");
        switch (key) {
            case "Dialogue":
                this.lines.push(Dialogue.load(value.join(": ")));
                break;
            default:
                break;
        }
        return this;
    }

}

export default Events;