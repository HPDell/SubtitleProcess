/**
 * 字幕文件基类
 */
abstract class Subtitle {

    /**
     * 解析字幕文件
     * @param filename 文件名
     */
    abstract parse(filename: string);

    /**
     * 保存字幕文件。
     * @param filename 文件名。如果缺失，则保存到原文件。
     */
    abstract save(filename?: string);

}

export default Subtitle;