import LineByLine = require("n-readlines");

function testLineRead(file: string) {
    const reader = new LineByLine(file)
    let line = "";
    let lineNumber = 0;
    while (line = reader.next()) {
        console.log(`${lineNumber + 1}: ${line}`);
        lineNumber++;
    }
    console.log("[END]");
}

testLineRead("C:\\Users\\HuYG0\\Documents\\Temp\\test-data\\test.ass")