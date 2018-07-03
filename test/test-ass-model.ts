import AssSubtitle from "../models/AssSubtitle";

function testAssModel(ass: string) {
    let assSubtitle = new AssSubtitle();
    assSubtitle.parse(ass);
    console.log(JSON.stringify(assSubtitle));
}

testAssModel("C:\\Users\\HuYG0\\Documents\\Temp\\test-data\\test.ass");