import AssSubtitle from "../models/AssSubtitle";
import { findFont, replaceFont } from "../operators/ASS/AssReplaceFont";


function testFindFonts(ass: string) {
    let subtitle = (new AssSubtitle()).parse(ass);
    let fontSet = findFont(subtitle);
    fontSet.forEach(value => {
        console.log(value);
    })

    let replaceMap = new Map<string, string>([
        ["方正黑体简体", "方正黑体_GBK"],
        ["方正准圆简体", "方正准圆_GBK"],
        ["方正综艺简体", "方正综艺_GBK"],
    ])
    subtitle = replaceFont(subtitle, replaceMap);
    fontSet = findFont(subtitle);
    fontSet.forEach(value => {
        console.log(value);
    })
}

testFindFonts("test/data/test.ass");