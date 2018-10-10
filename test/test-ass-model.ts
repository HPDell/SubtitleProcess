import AssSubtitle from "../models/AssSubtitle";
import fs = require("fs");

function testAssModel(ass: string) {
    let assSubtitle = new AssSubtitle();
    assSubtitle.parse(ass);
    fs.writeFileSync("../testass.json", JSON.stringify(assSubtitle));
}

testAssModel("test/data/test.ass");