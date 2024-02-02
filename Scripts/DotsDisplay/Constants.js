class Constants {
    // Color Settings
    static colorOn = '#ffae00';
    static colorOff = '#363636';

    static tuewas(){
        return 'tuewas';
    }

    // LED Settings (will change the size of the dots/pixels and have impact on the canvas size)
    static ledLampSize = 3;
    static ledSpacing = 1;
    static led = Constants.ledLampSize + Constants.ledSpacing;

    // Height Settings in Dots
    static charWidthDots = 5;
    static spacesBetweenCharsDots = 1;
    static columnWidthDots = this.charWidthDots + this.spacesBetweenCharsDots;
    static textBoxSpacingDots = this.columnWidthDots;
    static marginLeftRightDots = this.columnWidthDots;

    // Width Settings in Dots
    static charHeightDots = 7;
    static rowHeightDots = this.charHeightDots;
    static spaceBetweenRowsDots = 3;
    static marginTopBottomDots = this.marginLeftRightDots;

    // Counts of Rows
    static contentRowCount = 7
    static emptyLineBetweenContentAndFooter = 1;
    static footerRows = 1;
    static totalRowCount = this.contentRowCount + this.emptyLineBetweenContentAndFooter + this.footerRows;

    // Calculation of canvas height
    static heightOfContentDots = ((this.totalRowCount-1) * (this.rowHeightDots + this.spaceBetweenRowsDots) + this.rowHeightDots );
    static heightOfFooterDots = this.footerRows;
    static canvasHeight = (this.heightOfContentDots + this.heightOfFooterDots + this.spacesBetweenCharsDots * 7) * this.led;

    // Calculation of canvas width
    static canvasWidth = 800;

    // Animation
    static displayUpdatingRate = 20;

    // Data
    static fullRows = [];
    static bitmapFont;
}
