class Constants {
    static color1 = '#ffae00'; // Color of the LEDs
    static ledLampSize = 3; // will resize the size of the dots/squares
    static ledSpacing = 1;
    static led = Constants.ledLampSize + Constants.ledSpacing;
    static charHeightInLamps = 7; static charHeightInPixels = (Constants.ledLampSize + Constants.ledSpacing) * Constants.charHeightInLamps;
    static charWidthInLamps = 5; static charWidthInPixels = (Constants.ledLampSize + Constants.ledSpacing) * Constants.charWidthInLamps;
    static distanceInLamps = 1; static distanceInPixels = (Constants.ledLampSize + Constants.ledSpacing) * Constants.distanceInLamps;
    static charWidthTotalInPixels = Constants.charWidthInPixels + Constants.distanceInPixels;
    static lineHeightInLamps = 3; static lineHeightPixel = (Constants.ledLampSize + Constants.ledSpacing) * Constants.lineHeightInLamps;



    static columns = [5,24,6];
    static columnsSpacing = 1;
    static columnSpacingInLamps = Constants.columnsSpacing * (Constants.charWidthInLamps + Constants.distanceInLamps);
    static margin = 1;
    static marginInLamps = this.margin * (Constants.charWidthInLamps + Constants.distanceInLamps);
    static footerLine = 1;
    static canvasWidth = (Constants.columns[0] + Constants.columns[1] + Constants.columns[2] + Constants.columnsSpacing + Constants.margin*2) * (Constants.charWidthInPixels + Constants.distanceInPixels);
    static lineCount = 12;
    static canvasHeight = (Constants.lineCount + Constants.margin*3 + Constants.footerLine) * (Constants.charHeightInPixels + Constants.lineHeightPixel);
    static offset = 0; // Define offset outside the drawScrollingText function
    static scrollSpeed = 1.5; // Adjust the speed of scrolling
}
