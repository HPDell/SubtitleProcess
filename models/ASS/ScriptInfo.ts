class ScriptInfo {
    
    /** 注释 */
    Comments?: string[];

    /** 标题, 如果没有提供, 则自动使用<untitled> */
    Title?: string = "<untitled>";

    /** 剧本的最初作者, 若没有提供则自动使用<unknown> */
    OriginalScript?: string = "<unknown>";

    /** 原剧本的翻译者, 若没有提供则该行不显示 */
    OriginalTranslation?: string;

    /** 原剧本的编者和校对, 若没有提供则该行不显示 */
    OriginalEditing?: string;

    /** 原剧本的时间轴人员, 若没有提供则该行不显示 */
    OriginalTiming?: string;

    /** 从哪个时间点开始加载字幕, 若没有提供则该行不显示 */
    SynchPoint?: number;

    /** 对原剧本的修改/更新人员, 若没有提供则该行不显示 */
    ScriptUpdated?: string;

    /** 更新的具体信息, 若没有提供则该行不显示 */
    UpdateDetails?: string;

    /** SSA的版本信息, ASS的版本为"v4.00+" */
    ScriptType?: string;

    /** 当字幕时间重叠时, 前后字幕的堆叠方式.  */
    Collisions?: ScriptInfoCollisionsType;

    /** 
     * 文件所使用的视频高度参考标准.
     * 如果只提供了PlayResX, PlayResY其中一种, 那另一种会按实际视频的像素值为准. 
     */
    PlayResY?: number;

    /**
     * 文件所使用的视频宽度参考标准.
     * 如果只提供了PlayResX, PlayResY其中一种, 那另一种会按实际视频的像素值为准. 
     */
    PlayResX?: number;

    /** 加载字幕时使用的色深(颜色的数目) */
    PlayDepth?: string;

    /** 字幕加载的速度调整, 数值为百分数 */
    Timer?: number;

    /**
     * 定义默认的换行方式,  
     * 0: 智能换行, 行分得较平均, 上面的行较长
     * 1: 一行结束后从行尾的词分行
     * 2: 不换行. 此模式下只有\n, \N才换行
     * 3: 与模式0相同, 但下面的行分得比较长
     */
    WrapStyle?: number;

    /** 原剧本的编者和校对, 若没有提供则该行不显示 */
    ScaledBorderAndShadow?: boolean;

    /**
     * 解析行
     * @param line Script Info 行
     */
    parse(line: string): ScriptInfo {
        if (line.charAt(0) === ";") {
            this.Comments.push(line.replace("; // ", ""));
        } else {
            let [key, value] = line.split(":");
            switch (key) {
                case "PlayResY":
                case "PlayResX":
                case "WrapStyle":
                    this[key] = parseInt(value);
                    break;
                case "SynchPoint":
                case "Timer":
                    this[key] = parseFloat(value);
                    break;
                case "ScaledBorderAndShadow":
                    this[key] = value === "yes" ? true : false;
                    break;
                default:
                    this[key] = value;
                    break;
            }
        }
        return this;
    }
}


/**
 * 当字幕时间重叠时, 前后字幕的堆叠方式. 
 */
enum ScriptInfoCollisionsType {

    /** 后一条字幕出现在前一条字幕的上方 */
    Normal = "Normal",

    /** 前一条字幕往上移动给后一条字幕让位 */
    Reverse = "Reverse"

}

export default ScriptInfo;