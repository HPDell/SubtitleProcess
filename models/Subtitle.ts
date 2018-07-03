/**
 * 字幕文件基类
 */
interface Subtitle {

    /**
     * 解析字幕文件
     * @param filename 文件名
     */
    parse(filename: string);

    /**
     * 保存字幕文件。
     * @param filename 文件名。如果缺失，则保存到原文件。
     */
    save(filename?: string);

}

export default Subtitle;