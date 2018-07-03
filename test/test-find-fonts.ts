import AssSubtitle from "../models/AssSubtitle";

function testFindFonts(ass: string) {
    let subtitle = (new AssSubtitle()).parse(ass);
    let fontSet = subtitle.findFont();
    fontSet.forEach(value => {
        console.log(value);
    })
}

testFindFonts("C:\\Users\\HuYG0\\Documents\\Temp\\test-data\\test.ass");