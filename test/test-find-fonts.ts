import AssSubtitle from "../models/AssSubtitle";
import { findFont } from "../operators/ASS/AssReplaceFont";


function testFindFonts(ass: string) {
    let subtitle = (new AssSubtitle()).parse(ass);
    let fontSet = findFont(subtitle);
    fontSet.forEach(value => {
        console.log(value);
    })
}

testFindFonts("test/data/test.ass");