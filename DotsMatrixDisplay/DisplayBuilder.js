class DisplayBuilder {
    constructor(dataHandler, columnArray) {
        this.dataHandler = dataHandler;
        this.columns = columnArray;
        this.x = 0;
        this.lastUpdateTime = 0;
    }

    setupDisplay() {
        Constants.canvasWidth = Constants.led * (Constants.marginLeftRightDots * 2 + Constants.columnWidthDots * (this.columns[0] + this.columns[1] + this.columns[2]) + Constants.textBoxSpacingDots * 2);
        createCanvas(Constants.canvasWidth, Constants.canvasHeight);
        for (let i = 0; i < Constants.contentRowCount; i++) {
            this.createRow(dataHandler.getTrainInfoArray()[i]);
        }
        background(0);
    }


    displayDraw() {
        let y = Constants.ledSpacing;
        for (const element of Constants.fullRows) {
            for (const row of this.createRowOutput(element)) {
                let x = Constants.ledSpacing;
                for (const char of row) {
                    if (char === '1') {
                        fill(Constants.colorOn); // Turn on the LED

                    } else {
                        fill(Constants.colorOff); // Turn off the LED
                    }
                    noStroke();
                    square(x, y, Constants.ledLampSize);
                    //ellipseMode(CORNER);
                    //circle(x, y, Constants.ledLampSize);
                    x += Constants.led;
                }
                y+= Constants.led;
            }
            //console.log(frameRate());
        }
    }
    updatingForAnimation() {
        let currentTime = millis();
        if (currentTime - this.lastUpdateTime >= Constants.displayUpdatingRate) {
            this.x += 1;
            this.lastUpdateTime = currentTime;
        }
    }

// Function to get the bit pattern for a character


    getCharBitPattern(char) {
        const defaultPattern = ["00000", "00000", "00000", "00000", "00000", "00000", "00000"];
        return Constants.bitmapFont[char] || defaultPattern;
    }
    createRowOutput(rowArray) {
        let resultRows = Array(7).fill('');
        let columnSpacing = '';
        if (rowArray.length !== 1) {
            for (let i = 0; i < Constants.columnWidthDots; i++) {
                columnSpacing += '0';
            }
            for (let i = 0; i < rowArray.length; i++) {
                resultRows = resultRows.map((row, idx) => row + this.trimRows(rowArray[i][idx], this.columns[i] * (Constants.columnWidthDots))); //Breite der Textbox
                if (i < rowArray.length - 1) {
                    resultRows = resultRows.map(row => row + columnSpacing);
                }
            }
            let margin = '';
            for (let i = 0; i < Constants.marginLeftRightDots; i++) {
                margin += '0';
            }
            resultRows = resultRows.map(row => margin + row + margin);
            return resultRows;
        } else {
            return rowArray[0];
        }

    }

    createBlankRows() {
        let blankRows = Array(Constants.spaceBetweenRowsDots).fill('');
        for (let i = 0; i < Constants.spaceBetweenRowsDots; i++) {
            blankRows[i] = '0'.repeat(Constants.canvasWidth);
        }
        let arrayAroundBlankRows = [];
        arrayAroundBlankRows.push(blankRows);
        Constants.fullRows.push(arrayAroundBlankRows);
    }

    createRow(stringArray) {
        let resultRows = Array(7).fill('');
        let fullRow = [];
        let columnSpacing = '';
        for (let i = 0; i < Constants.textBoxSpacingDots; i++) {
            columnSpacing += '0';
        }
        for (let i = 0; i < stringArray.length; i++) {
            let textCell = this.createTextCell(stringArray[i]);
            resultRows = resultRows.map((row, idx) => row + textCell[idx]);
            fullRow.push(resultRows);
            resultRows = Array(7).fill('');
        }
        Constants.fullRows.push(fullRow);
        this.createBlankRows(); // create a line spacing
    }

    createTextCell(str) {
        let resultRows = Array(7).fill('');
        for (let char of str) {
            let pattern = this.getCharBitPattern(char.toUpperCase());
            pattern.forEach((row, idx) => {
                let distanceToNextChar = '';
                for (let i = 0; i < Constants.spacesBetweenCharsDots; i++) {
                    distanceToNextChar += '0';
                }
                resultRows[idx] += row + distanceToNextChar;
            });
        }
        return resultRows;
    }

    trimRows(row, width) {
        let zeros = '';
        for (let i = 0; i < width - row.length; i++) {
            zeros += '0';
        }
        row = row + zeros;
        if (row.length <= width) {
            return row
        }
        row = this.animateTextInCell(row).slice(0, width);
        return row;
    }

    animateTextInCell(row) {
        let zeros = '';

        for (let i = 0; i < (Constants.columnWidthDots); i++) {
            zeros += '0';
        }
        let newRow = row + zeros;

        let offset = this.x % newRow.length;

        if (this.x > 2147483647) { // Reset if x get to big ?
            this.x = 0;
        }
        return newRow.slice(offset) + newRow.substring(0, offset);
    }
}