let bitmapFont;
let dataHandler;
let fullRows = []
let columnDummy = [5,17,5];
let x = 0;
let lastUpdateTime = 0;
let updateRate = 20; // in millis (20 läuft flüssig)
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
    const inputStringArray = ["S6", "Flughafen Düsseldorf", "06:00"];
    createRow(inputStringArray);
    createRow(["S1", "Flughafen Bahamas", "21:00"]);
    for (i = 0; i < 6; i++){
        createRow(dataHandler.getTrainInfoArray()[i]);
    }
    background(0);
    dataSource = true;

    console.log(fullRows);
}

let x2 =1;
function draw() {
    background(0);
    let y = 0;
    for (const element of fullRows) {
        for (const row of createRowOutput(element)) {
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
        console.log(frameRate());
    }

    // TODO: noch in function übergeben
    let currentTime = millis();
    if (currentTime - lastUpdateTime >= updateRate) {
        x += 1;
        lastUpdateTime = currentTime;
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
    if (rowArray.length !== 1) {
        for (let i = 0; i < Constants.columnSpacingInLamps; i++) {
            columnSpacing += '0';
        }
        for (let i = 0; i < rowArray.length; i++) {
            resultRows = resultRows.map((row, idx) => row + trimRows(rowArray[i][idx],columnDummy[i]*(Constants.charWidthInLamps+Constants.distanceInLamps)));
            if (i < rowArray.length -1) {
                resultRows = resultRows.map(row => row + columnSpacing);
            }
        }
        let margin = '';
        for (let i = 0; i < Constants.marginInLamps; i++) {
            margin += '0';
        }
        resultRows = resultRows.map(row => margin + row + margin );
        return resultRows;
    } else {
        return rowArray[0];
    }

}

function createBlankRows() {
    let blankRows = Array(Constants.lineHeightInLamps).fill('');
    for (let i = 0; i < Constants.lineHeightInLamps; i++) {
        blankRows[i] = '0'.repeat(Constants.canvasWidth);
    }
    let arrayArroundBlankRows = [];
    arrayArroundBlankRows.push(blankRows);
    fullRows.push(arrayArroundBlankRows);
}

function createRow(stringArray) {
    let resultRows = Array(7).fill('');
    let fullRow = [];
    let columnSpacing = '';
    for (let i = 0; i < Constants.columnSpacingInLamps; i++) {
        columnSpacing += '0';
    }
    for (let i = 0; i < stringArray.length; i++) {
        let textCell = createTextCell(stringArray[i]);
        resultRows = resultRows.map((row, idx) => row + textCell[idx]);
        fullRow.push(resultRows);
        resultRows = Array(7).fill('');
    }
    fullRows.push(fullRow);
    createBlankRows(); // create a line spacing
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
    if (row.length <= width) {
        return row
    }
    row = animateTextInCell(row).slice(0, width);
    return row;
}
function animateTextInCell(row){
    let zeros = '';
    for (let i = 0; i < (Constants.charWidthInLamps+Constants.distanceInLamps); i++) {
        zeros += '0';
    }
    let newRow = row + zeros;
    // TODO x is running infitely
    let offset = x % newRow.length;
    return newRow.slice(offset) + newRow.substring(0, offset);
}

function keyPressed() {
    if (key === 'x' || key === 'X') {
        dataSource = !dataSource;
    }
}