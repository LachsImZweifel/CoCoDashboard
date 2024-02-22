class DisplayBuilder {
    constructor(contentArray, footerContentArray, columnArray) {
        this.contentArray = contentArray;
        this.footerArray = footerContentArray;
        this.columns = columnArray;
        this.x = 0;
        this.lastUpdateTime = 0;
        const sum = this.sumArray(this.columns);
        this.innerCanvasWidthDots =Constants.columnWidthDots * sum + Constants.textBoxSpacingDots * (this.columns.length-2);
        this.test=0;
        this.fullRows = [];
        this.textbox = new TextBox();
        this.textBoxArray = [];
    }
    sumArray(arr) {
        let sum = 0;
        for (let i = 0; i < arr.length; i++) {
            sum += arr[i];
        }
        return sum;
    }
    setupDisplay() {
        Constants.canvasWidth = Constants.led * (Constants.marginLeftRightDots * 2 + this.innerCanvasWidthDots);
        createCanvas(Constants.canvasWidth, Constants.canvasHeight);
        this.textbox.createTextCell('Warum die Idee super ist');
    }

    displayDraw() {
        // draw textFields on the display
        for (let i = 0; i < this.textBoxArray.length; i++) {
            this.textBoxArray[i].draw();
        }
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
                console.log(dist);
                x += dist;
            }
            // Aktualisiere y für die nächste Zeile
            y += Constants.rowHeightDots + Constants.spaceBetweenRowsDots;
        }
    }
    fillDisplayWithDots() {
        for (let i = 0; i < Constants.canvasWidth; i += Constants.led) {
            for (let j = 0; j < Constants.canvasHeight; j += Constants.led) {
                fill(Constants.colorOff);
                noStroke();
                square(i, j, Constants.ledLampSize);
            }
        }
    }
}