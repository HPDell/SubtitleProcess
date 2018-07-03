import DialogueText from "./DialogueText";

class Dialogue {
    Layer: number;
    Start: string;
    End: string;
    Style: string;
    Name: string;
    MarginL: number;
    MarginR: number;
    MarginV: number;
    Effect: string;
    Text: DialogueText;
    constructor() {
        this.Layer = 0;
        this.Start = "0:00:00.00";
        this.End = "0:00:00.00";
        this.Style = "Default";
        this.Name = "NTP";
        this.MarginL = 0;
        this.MarginR = 0;
        this.MarginV = 0;
        this.Effect = "";
        this.Text = null;
    }

    /**
     * 解析对话行
     * @param dialog 对话行
     */
    parse(dialog: string): Dialogue {
        let items = dialog.split(",", 10);
        this.Layer = parseInt(items[0]);
        this.Start = items[1];
        this.End = items[2];
        this.Style = items[3];
        this.Name = items[4];
        this.MarginL = parseFloat(items[5]);
        this.MarginR = parseFloat(items[6]);
        this.MarginV = parseFloat(items[7]);
        this.Effect = items[8];
        this.Text = DialogueText.load(items[9]);
        return this;
    }

    /**
     * 加载对话行
     * @param text 对话行
     */
    static load(text: string): Dialogue {
        let dialog = new Dialogue();
        dialog.parse(text)
        return dialog;
    }
}

export default Dialogue;