interface V4StyleOption {
    Name: string;
    Fontname: string;
    Fontsize: number;
    PrimaryColour: string;
    SecondaryColour: string;
    OutlineColour: string;
    BackColour: string;
    Bold: BoldStyle;
    Italic: ItalicSytle;
    Underline: UnderlineStyle;
    StrikeOut: StrikeoutStyle;
    ScaleX: number;
    ScaleY: number;
    Spacing: number;
    Angle: number;
    BorderStyle: BorderStyle;
    Outline: number;
    Shadow: number;
    Alignment: AlignmentStyle;
    MarginL: number;
    MarginR: number;
    MarginV: number;
    Encoding: number;
}

/**
 * V4+ Styles 样式表
 */
class V4Style implements V4StyleOption {
    Name: string;
    Fontname: string;
    Fontsize: number;
    PrimaryColour: string;
    SecondaryColour: string;
    OutlineColour: string;
    BackColour: string;
    Bold: BoldStyle;
    Italic: ItalicSytle;
    Underline: UnderlineStyle;
    StrikeOut: StrikeoutStyle;
    ScaleX: number;
    ScaleY: number;
    Spacing: number;
    Angle: number;
    BorderStyle: BorderStyle;
    Outline: number;
    Shadow: number;
    Alignment: AlignmentStyle;
    MarginL: number;
    MarginR: number;
    MarginV: number;
    Encoding: number;
    constructor(option?: V4StyleOption) {
        this.Name = "";
        this.Fontname = "";
        this.Fontsize = 0;
        this.PrimaryColour = "";
        this.SecondaryColour = "";
        this.OutlineColour = "";
        this.BackColour = "";
        this.Bold = BoldStyle.Normal;
        this.Italic = ItalicSytle.Normal;
        this.Underline = UnderlineStyle.Normal;
        this.StrikeOut = StrikeoutStyle.Normal;
        this.ScaleX = 0;
        this.ScaleY = 0;
        this.Spacing = 0;
        this.Angle = 0;
        this.BorderStyle = BorderStyle.BorderAndShadow;
        this.Outline = 0;
        this.Shadow = 0;
        this.Alignment = AlignmentStyle.BottomCenter;
        this.MarginL = 0;
        this.MarginR = 0;
        this.MarginV = 0;
        this.Encoding = 0;
        if (option) {
            this.Name = option.Name;
            this.Fontname = option.Fontname;
            this.Fontsize = option.Fontsize;
            this.PrimaryColour = option.PrimaryColour;
            this.SecondaryColour = option.SecondaryColour;
            this.OutlineColour = option.OutlineColour;
            this.BackColour = option.BackColour;
            this.Bold = option.Bold;
            this.Italic = option.Italic;
            this.Underline = option.Underline;
            this.StrikeOut = option.StrikeOut;
            this.ScaleX = option.ScaleX;
            this.ScaleY = option.ScaleY;
            this.Spacing = option.Spacing;
            this.Angle = option.Angle;
            this.BorderStyle = option.BorderStyle;
            this.Outline = option.Outline;
            this.Shadow = option.Shadow;
            this.Alignment = option.Alignment;
            this.MarginL = option.MarginL;
            this.MarginR = option.MarginR;
            this.MarginV = option.MarginV;
            this.Encoding = option.Encoding;
        }
    }

    /**
     * 解析样式字符串
     * @param style 样式字符串
     */
    parse(style: string) {
        let items = style.split(",");
        this.Name = items[0];
        this.Fontname = items[1];
        this.Fontsize = parseFloat(items[2]);
        this.PrimaryColour = items[3];
        this.SecondaryColour = items[4];
        this.OutlineColour = items[5];
        this.BackColour = items[6];
        this.Bold = parseInt(items[7]);
        this.Italic = parseInt(items[8]);
        this.Underline = parseInt(items[9]);
        this.StrikeOut = parseInt(items[10]);
        this.ScaleX = parseFloat(items[11]);
        this.ScaleY = parseFloat(items[12]);
        this.Spacing = parseFloat(items[13]);
        this.Angle = parseFloat(items[14]);
        this.BorderStyle = parseInt(items[15]);
        this.Outline = parseFloat(items[16]);
        this.Shadow = parseFloat(items[17]);
        this.Alignment = parseInt(items[18]);
        this.MarginL = parseFloat(items[19]);
        this.MarginR = parseFloat(items[20]);
        this.MarginV = parseFloat(items[21]);
        this.Encoding = parseInt(items[22]);
        return this;
    }

    static load(style: string): V4Style {
        return (new V4Style()).parse(style);
    }
}

export enum BoldStyle {
    Bold = -1,
    Normal = 0
}

export enum ItalicSytle {
    Italic = -1,
    Normal = 0
}

export enum UnderlineStyle {
    Underline = -1,
    Normal = 0
}

export enum StrikeoutStyle {
    StrikeOut = -1,
    Normal = 0
}

export enum BorderStyle {
    BorderAndShadow = 1,
    Background = 3
}

export enum AlignmentStyle {
    BottomLeft = 1,
    BottomCenter = 2,
    BottomRight = 3,
    MiddleLeft = 4,
    MiddleCenter = 5,
    MiddleRight = 6,
    TopLeft = 7,
    TopCenter = 8,
    TopRight = 9
}

export default V4Style;