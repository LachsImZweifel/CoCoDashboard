let bitmapFont;
let dataHandler;
let fullRows = []
let columnDummy = [5,24,6];
let x = 0;
function preload() {
    bitmapFont = loadJSON('BitMapCharSet.json');
    dataHandler = new DataHandler();
    // add data here
    dataHandler.setTrainInfoData(loadJSON('staticKvBData.json'));
}

let fahrplanLayouter = new Layouter([5,24,6]);
let calendarLayouter = new Layouter([4,24,8]);




function setup() {
    Constants.canvasWidth = fahrplanLayouter.getTotalWidth();
    createCanvas(Constants.canvasWidth, Constants.canvasHeight);
    const inputStringArray = ["S6", "Flughafen Düsseldorf", "Abfahrt"];
    createRow(inputStringArray);

    background(0);
    dataSource = true;


}
let x2 =1;
function draw() {
    background(0);

    // Example for se animation
    /*let testString = 'TestString';
    x3 = x2 % testString.length;
    console.log(testString.slice(x3)+testString.substring(0,x3))
    x2 ++;*/
    let y = 0;
    for (const row of createRowOutput(fullRows)) {
        let x = 0;
        for (const char of row) {
            if (char === '1') {
                fill(Constants.color1); // Turn on the LED
            } else {
                fill(Constants.color2); // Turn off the LED
                }
            noStroke();
            //square(x, y, Constants.ledLampSize);
            circle(x, y, Constants.ledLampSize);
            x += Constants.ledLampSize + Constants.ledSpacing;
        }
        y+= Constants.ledLampSize + Constants.ledSpacing;
    }
}

// Function to get the bit pattern for a character
function getCharBitPattern(char) {
    const defaultPattern = ["00000", "00000", "00000", "00000", "00000", "00000", "00000"];
    return bitmapFont[char] || defaultPattern;
}

function createRowOutput(rowArray) {
    let resultRows = Array(7).fill('');
    let columnSpacing = '';
    for (let i = 0; i < Constants.columnSpacingInLamps; i++) {
        columnSpacing += '0';
    }
    for (let i = 0; i < rowArray.length; i++) {
        resultRows = resultRows.map((row, idx) => row + trimRows(rowArray[i][idx],columnDummy[i]*(Constants.charWidthInLamps+Constants.distanceInLamps)));
        if (i < rowArray.length - 1) {
            resultRows = resultRows.map(row => row + columnSpacing);
        }
    }
    let margin = '';
    for (let i = 0; i < Constants.marginInLamps; i++) {
        margin += '0';
    }
    resultRows = resultRows.map(row => margin + row + margin );
    return resultRows;
}

function createRow(stringArray) {
    let resultRows = Array(7).fill('');
    let columnSpacing = '';
    for (let i = 0; i < Constants.columnSpacingInLamps; i++) {
        columnSpacing += '0';
    }
    for (let i = 0; i < stringArray.length; i++) {
        let textCell = createTextCell(stringArray[i]);
        resultRows = resultRows.map((row, idx) => row + textCell[idx]);
        fullRows.push(resultRows);
        resultRows = Array(7).fill('');
    }
}

function createTextCell(str) {
    let resultRows = Array(7).fill('');
    for (let char of str) {
        let pattern = getCharBitPattern(char.toUpperCase());
        pattern.forEach((row, idx) => {
            let distanceToNextChar ='';
            for (let i = 0; i < Constants.distanceInLamps; i++) {
                distanceToNextChar += '0';
            }
            resultRows[idx] += row + distanceToNextChar;
        });
    }
    return resultRows;
}

function trimRows(row, width) {
    let zeros = '';
    for (let i = 0; i < width - row.length ; i++) {
        zeros += '0';
    }
    row = row + zeros;
    row = fullFillRow(row).slice(0, width);
    return row;
}
let lastUpdateTime = 0;
let updateRate = 20; // in millis
function fullFillRow(row){
    let zeros = '';
    for (let i = 0; i < (Constants.charWidthInLamps+Constants.distanceInLamps); i++) {
        zeros += '0';
    }
    let newRow = row + zeros;
    // TODO x is running infitely
    let offset = x % newRow.length;
    let currentTime = millis(); // Aktuelle Zeit in Millisekunden seit Start
    if (currentTime - lastUpdateTime >= updateRate) { // Prüft, ob eine Sekunde vergangen ist
        x += 1; // Erhöht x um 1
        lastUpdateTime = currentTime; // Aktualisiert die Zeit der letzten Erhöhung
    }
    return newRow.slice(offset) + newRow.substring(0, offset);
}

function keyPressed() {
    if (key === 'x' || key === 'X') {
        dataSource = !dataSource;
    }
}