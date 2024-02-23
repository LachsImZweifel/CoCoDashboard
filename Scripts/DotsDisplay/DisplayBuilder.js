class DisplayBuilder {
    constructor(contentArray, footerContentArray, columnArray) {
        this.contentArray = contentArray;
        this.textBoxArray = [];
        this.footerArray = footerContentArray;
        this.footerTextBox;
        this.columns = columnArray;
        this.innerCanvasWidthDots = Constants.columnWidthDots * this.sumArray(this.columns) + Constants.textBoxSpacingDots * (this.columns.length-2);
    }

    displayDraw()  {
        // draw textFields on the display
        for (let i = 0; i < this.textBoxArray.length; i++) {
            this.textBoxArray[i].draw();
        }
        this.footerTextBox.draw();
    }

    fillTextBoxes() {
        let y = Constants.marginTopBottomDots;
        for (let i = 0; i < this.contentArray.length && i < Constants.contentRowCount; i++) {
            let x = Constants.marginLeftRightDots;
            for (let j = 0; j < this.contentArray[i].length; j++) {
                let textBox = new TextBox(x, y, Constants.columnWidthDots*this.columns[j]);
                textBox.createTextCell(this.contentArray[i][j]);
                this.textBoxArray.push(textBox);
                let dist = Constants.columnWidthDots * this.columns[j] + Constants.columnWidthDots;
                x += dist;
            }
            // Aktualisiere y für die nächste Zeile
            y += Constants.rowHeightDots + Constants.spaceBetweenRowsDots;
        }
        this.fillFooter();
    }
    fillDisplayWithDots() {
        background(0);
        for (let i = 0; i < Constants.canvasWidth; i += Constants.led) {
            for (let j = 0; j < Constants.canvasHeight; j += Constants.led) {
                fill(Constants.colorOff);
                noStroke();
                square(i, j, Constants.ledLampSize);
            }
        }
    }
    redrawAllTextBoxes(){
        for (const textBox of this.textBoxArray) {
            textBox.isDrawn = false;
        }
    }
    fillFooter() {
        let y = Constants.canvasHeightInDots - Constants.marginTopBottomDots - Constants.rowHeightDots;
        let x = Constants.marginLeftRightDots;
        let footerString = '* ';
        for (let i = 0; i < this.footerArray.length; i++) {
            if (i === this.footerArray.length - 1) {
                footerString += this.footerArray[i]
                break;
            }
            footerString += this.footerArray[i] + ' * ';
        }
        this.footerTextBox = new TextBox(x, y, this.innerCanvasWidthDots);
        this.footerTextBox.createTextCell(footerString);
    }
    sumArray(arr) {
        let sum = 0;
        for (let i = 0; i < arr.length; i++) {
            sum += arr[i];
        }
        return sum;
    }
}