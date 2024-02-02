class DisplayBuilder {
    constructor(contentArray, footerContentArray, columnArray) {
        this.contentArray = contentArray;
        this.footerArray = footerContentArray;
        this.columns = columnArray;
        this.x = 0;
        this.lastUpdateTime = 0;
        this.innerCanvasWidthDots =Constants.columnWidthDots * (this.columns[0] + this.columns[1] + this.columns[2]) + Constants.textBoxSpacingDots * (this.columns.length-2);
        this.test=0;
    }
    setupDisplay() {
        Constants.canvasWidth = Constants.led * (Constants.marginLeftRightDots * 2 + this.innerCanvasWidthDots);
        createCanvas(Constants.canvasWidth, Constants.canvasHeight);
        this.createBlankRows(2);
        for (let i = 0; i < Constants.contentRowCount; i++) {
            if (i === this.contentArray.length) { // ca drei Jahre gebraucht um das rauszufinden
                break;
            }
            this.createRow(this.contentArray[i]);
        }
        this.createBlankRows(2);
        this.createRow(this.buildFooter());
        this.createBlankRows(1);
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
        let margin = '';
        for (let i = 0; i < Constants.marginLeftRightDots; i++) {
            margin += '0';
        }
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
            resultRows = resultRows.map(row => margin + row + margin);
            return resultRows;
        } else {
            if (rowArray[0].map(str => str !== "" && Number(str) === 0).every(value => value === true)){ // check if its a blank line
                return rowArray[0];
            } else { // it must be a footer line
                let combinedArray = Array(7).fill('');
                combinedArray = resultRows.map((item, index) => item + rowArray[0][index]);
                // wieso wird rowArray[0] nach einiger Zeit auf 100 bzw trim(width) gekürzt?
                for (let i = 0; i < resultRows.length; i++) {
                    combinedArray[i] = this.trimRows(combinedArray[i], this.innerCanvasWidthDots);
                }
                return combinedArray.map(row => margin + row + margin);
            }
        }

    }

    createBlankRows(times) {
        let blankRows = Array(Constants.spaceBetweenRowsDots).fill('');
        for (let i = 0; i < Constants.spaceBetweenRowsDots; i++) {
            blankRows[i] = '0'.repeat(Constants.canvasWidth);
        }
        let arrayAroundBlankRows = [];
        arrayAroundBlankRows.push(blankRows);
        for (let i = 0; i < (times || 1); i++) {
            Constants.fullRows.push(arrayAroundBlankRows);
        }
    }

    createRow(stringArray) {
        this.test++;
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
        let manipulatedRow = row + zeros;
        if (manipulatedRow.length <= width) {
            return manipulatedRow;
        }
        manipulatedRow = this.animateTextInCell(manipulatedRow).slice(0, width);
        return manipulatedRow;
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
    buildFooter() {
        let footerStrings = this.footerArray;
        let finalFooterString = '**';
        for (let i = 0; i < footerStrings.length; i++) {
            finalFooterString += ' ' + footerStrings[i] + " **";
        }
        return [finalFooterString];
    }
}