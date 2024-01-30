class Layouter {
    constructor(columns) {
        this.columns = columns;
        this.data = [];
        this.footerText = "";
        this.headerText = "";
    }

    // ... rest of the class ...

    setHeaderText(newHeaderText) {
        this.headerText = newHeaderText;
    }


    setFooterText(newFooterText) {
        this.footerText = newFooterText;
    }

    addData(dataArray) {
        this.data.push(dataArray);
    }

    lineLayouter(row){
        let xMargin = Constants.charWidthTotalInPixels * Constants.margin;
        let yMargin = Constants.charHeightInPixels + Constants.lineHeightPixel;
        let x = xMargin;
        let y = yMargin + yMargin * row;
        for (let i = 0; i < this.data[row].length; i++){
            this.drawTextBox(this.data[row][i], this.columns[i], x, y);
            x += this.columns[i] * Constants.charWidthTotalInPixels;
            x += Constants.columnsSpacing * Constants.charWidthTotalInPixels;
        }
    }

    footerLayouter(){
        if (this.footerText.trim() === "") {
            return;
        }
        let text = "** " + this.footerText + " **";
        let xMargin = Constants.charWidthTotalInPixels * Constants.margin;
        let yMargin = Constants.charHeightInPixels + Constants.lineHeightPixel;
        let x = xMargin;
        let y = (Constants.lineCount+Constants.margin+ Constants.footerLine) * yMargin;
        this.drawTextBox(text, this.columns[0] + this.columns[1] + this.columns[2], x, y);
    }
    drawTextBox(string, columns, x, y){
        string = string || ""; // Set string to an empty string if it's undefined
        let textBoxWidth = columns * Constants.charWidthTotalInPixels;
        if (TextDrawer.getTextWidth(string) > textBoxWidth){
            TextDrawer.drawScrollingText(string, y, textBoxWidth, x);
        } else {
            TextDrawer.drawStaticText(string, x, y);
        }
    }


    draw() {
        let startRow = 0;
        if (this.headerText.trim() !== "") {
            this.headerLayouter();
            startRow = 1; // Shift the content down by one row if a header is set
        }
        for (let i = 0; i < this.data.length; i++){
            if(i + startRow > Constants.lineCount){
                break;
            }
            this.lineLayouter(i + startRow);
        }
        this.footerLayouter();
        console.log(this.data);
    }
    getTotalWidth() {
        let totalWidth = 0;
        for (let column of this.columns) {
            totalWidth += column * Constants.charWidthTotalInPixels;
        }
        totalWidth += Constants.columnsSpacing * Constants.charWidthTotalInPixels;
        totalWidth += 2 * Constants.charWidthTotalInPixels;
        return totalWidth;
    }

    headerLayouter(){
        if (this.headerText.trim() === "") {
            return;
        }
        let text = "** " + this.headerText + " **";
        let xMargin = Constants.charWidthTotalInPixels * Constants.margin;
        let yMargin = Constants.charHeightInPixels + Constants.lineHeightPixel;
        let x = xMargin;
        let y = yMargin;
        this.drawTextBox(text, this.columns[0] + this.columns[1] + this.columns[2], x, y);
    }



}