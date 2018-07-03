"use strict";
exports.__esModule = true;
var LineByLine = require("n-readlines");
function testLineRead(file) {
    var reader = new LineByLine(file);
    var line = "";
    var lineNumber = 0;
    while (line = reader.next()) {
        console.log(lineNumber + 1 + ": " + line);
        lineNumber++;
    }
    console.log("[END]");
}
testLineRead("C:\\Users\\HuYG0\\Documents\\Temp\\test-data\\test.ass");
