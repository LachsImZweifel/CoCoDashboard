
let dataHandler;
let columnDummy = [5,17,5];
let x = 0;
let lastUpdateTime = 0;
function preload() {
    Constants.bitmapFont = loadJSON('BitMapCharSet.json');
    dataHandler = new DataHandler();
    // add data here
    dataHandler.setTrainInfoData(loadJSON('staticKvBData.json'));
}

function setup() {
    setupDisplay();
}

function draw() {
    DisplayDrawer.displayDraw();
    updatingForAnimation();
}

function setupDisplay() {

    Constants.canvasWidth = Constants.led *(Constants.marginLeftRightDots*2 + Constants.columnWidthDots*(columnDummy[0]+columnDummy[1]+columnDummy[2]) + Constants.textBoxSpacingDots*2);
    createCanvas(Constants.canvasWidth, Constants.canvasHeight);
    for (let i = 0; i < Constants.contentRowCount; i++){
        createRow(dataHandler.getTrainInfoArray()[i]);
    }
    background(0);
}

function updatingForAnimation(){
    let currentTime = millis();
    if (currentTime - lastUpdateTime >= Constants.displayUpdatingRate) {
        x += 1;
        lastUpdateTime = currentTime;
    }
}

// Function to get the bit pattern for a character
function getCharBitPattern(char) {
    const defaultPattern = ["00000", "00000", "00000", "00000", "00000", "00000", "00000"];
    return Constants.bitmapFont[char] || defaultPattern;
}


function createRowOutput(rowArray) {
    let resultRows = Array(7).fill('');
    let columnSpacing = '';
    if (rowArray.length !== 1) {
        for (let i = 0; i < Constants.columnWidthDots; i++) {
            columnSpacing += '0';
        }
        for (let i = 0; i < rowArray.length; i++) {
            resultRows = resultRows.map((row, idx) => row + trimRows(rowArray[i][idx],columnDummy[i]*(Constants.columnWidthDots))); //Breite der Textbox
            if (i < rowArray.length -1) {
                resultRows = resultRows.map(row => row + columnSpacing);
            }
        }
        let margin = '';
        for (let i = 0; i < Constants.marginLeftRightDots; i++) {
            margin += '0';
        }
        resultRows = resultRows.map(row => margin + row + margin );
        return resultRows;
    } else {
        return rowArray[0];
    }

}

function createBlankRows() {
    let blankRows = Array(Constants.spaceBetweenRowsDots).fill('');
    for (let i = 0; i < Constants.spaceBetweenRowsDots; i++) {
        blankRows[i] = '0'.repeat(Constants.canvasWidth);
    }
    let arrayAroundBlankRows = [];
    arrayAroundBlankRows.push(blankRows);
    Constants.fullRows.push(arrayAroundBlankRows);
}

function createRow(stringArray) {
    let resultRows = Array(7).fill('');
    let fullRow = [];
    let columnSpacing = '';
    for (let i = 0; i < Constants.textBoxSpacingDots; i++) {
        columnSpacing += '0';
    }
    for (let i = 0; i < stringArray.length; i++) {
        let textCell = createTextCell(stringArray[i]);
        resultRows = resultRows.map((row, idx) => row + textCell[idx]);
        fullRow.push(resultRows);
        resultRows = Array(7).fill('');
    }
    Constants.fullRows.push(fullRow);
    createBlankRows(); // create a line spacing
}

function createTextCell(str) {
    let resultRows = Array(7).fill('');
    for (let char of str) {
        let pattern = getCharBitPattern(char.toUpperCase());
        pattern.forEach((row, idx) => {
            let distanceToNextChar ='';
            for (let i = 0; i < Constants.spacesBetweenCharsDots; i++) {
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
    if (row.length <= width) {
        return row
    }
    row = animateTextInCell(row).slice(0, width);
    return row;
}
function animateTextInCell(row){
    let zeros = '';

    for (let i = 0; i < (Constants.columnWidthDots); i++) {
        zeros += '0';
    }
    let newRow = row + zeros;

    let offset = x % newRow.length;

    if (x > 2147483647) { // Reset if x get to big ?
        x = 0;
    }
    return newRow.slice(offset) + newRow.substring(0, offset);
}