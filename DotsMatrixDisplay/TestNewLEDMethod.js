let bitmapFont;
let dataHandler;

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


    background(0);
    dataSource = true;

}
function draw() {
    background(0);
    const inputStringArray = ["Richtung"];
    const bitPatterns = createFullRow(inputStringArray);
    console.log(bitPatterns);
}

// Function to get the bit pattern for a character
function getCharBitPattern(char) {
    const defaultPattern = ["00000", "00000", "00000", "00000", "00000", "00000", "00000"];
    return bitmapFont[char] || defaultPattern;
}


function createFullRow(stringArray) {
    let resultRows = Array(7).fill('');
    let columnSpacing = '';
    for (let i = 0; i < Constants.columnSpacingInLamps; i++) {
        columnSpacing += '0';
    }
    for (let i = 0; i < stringArray.length; i++) {
        let textCell = trimRows(createTextCell(stringArray[i]),20);
        resultRows = resultRows.map((row, idx) => row + textCell[idx]);
        // Add columnSpacing to all but the last element
        if (i < stringArray.length - 1) {
            resultRows = resultRows.map(row => row + columnSpacing);
        }
    }
    let margin = '';
    for (let i = 0; i < Constants.marginInLamps; i++) {
        margin += '0';
    }
    // resultRows = resultRows.map(row => margin + row + margin );
    return resultRows.join('\n');
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
    for (let i = 0; i < rows.length; i++) {
        rows[i] = animateRow(rows[i]).slice(0, maxWidth);
    }
    return rows;
}

function animateRow(row){
    row = row.substring(1);
    for (let i = 0; i < row.length; i++){
        row += '0';
    }
    return row;
}

function keyPressed() {
    if (key === 'x' || key === 'X') {
        dataSource = !dataSource;
    }
}