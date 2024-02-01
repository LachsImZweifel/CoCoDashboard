let bitmapFont;
let dataHandler;
let fullRows = []
let columnDummy = [5,24,6];
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
    const inputStringArray = ["Richtung", "Linie", "Abfahrt"];
    const bitPatterns = createRow(inputStringArray);
    console.log(bitPatterns);
    createRowOutput(fullRows);
    background(0);
    dataSource = true;

}
function draw() {
    background(0);

}

// Function to get the bit pattern for a character
function getCharBitPattern(char) {
    const defaultPattern = ["00000", "00000", "00000", "00000", "00000", "00000", "00000"];
    return bitmapFont[char] || defaultPattern;
}

function createRowOutput(rowArray) {
    console.log(rowArray);
    let resultRows = Array(7).fill('');
    let columnSpacing = '';
    for (let i = 0; i < Constants.columnSpacingInLamps; i++) {
        columnSpacing += '0';
    }
    for (let i = 0; i < rowArray.length; i++) {
        resultRows = resultRows.map((row, idx) => row + trimRows(rowArray[i][idx],columnDummy[i]*Constants.charWidthInLamps));
        if (i < rowArray.length - 1) {
            resultRows = resultRows.map(row => row + columnSpacing);
        }
    }
    let margin = '';
    for (let i = 0; i < Constants.marginInLamps; i++) {
        margin += '0';
    }
    resultRows = resultRows.map(row => margin + row + margin );
    console.log(resultRows);

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
    console.log(fullRows);

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

function trimRows(rows, maxWidth) {
    rows = fullFillRow(rows).slice(0, maxWidth);
    return rows;
}

function fullFillRow(row){
    let zeros = '';
    for (let i = 0; i < row.length; i++) {
        zeros += '0';
    }
    let newRow = row + zeros;
    return newRow.slice(1) + newRow[0];
}

function keyPressed() {
    if (key === 'x' || key === 'X') {
        dataSource = !dataSource;
    }
}