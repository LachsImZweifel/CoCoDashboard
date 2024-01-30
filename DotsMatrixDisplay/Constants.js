class Constants {
    static ledSize = 3;
    static ledSpacing = 1;
    static led = Constants.ledSize + Constants.ledSpacing;
    static charHeight = 7;
    static charWidth = 5;
    static lineHeight = 3;
    static blank = 1;
    static blankPixel = (Constants.ledSize + Constants.ledSpacing) * Constants.blank;
    static charPixelHeight = (Constants.ledSize + Constants.ledSpacing) * Constants.charHeight;
    static charPixelWidth = (Constants.ledSize + Constants.ledSpacing) * Constants.charWidth;
    static charPixelSizeX = Constants.charPixelWidth + Constants.blankPixel;
    static lineHeightPixel = (Constants.ledSize + Constants.ledSpacing) * Constants.lineHeight;
    static color1 = '#ffae00'; // Color of the LEDs
    static columns = [5,24,6];
    static columnsSpacing = 1;
    static margin = 1;
    static footerLine = 1;
    static canvasWidth = (Constants.columns[0] + Constants.columns[1] + Constants.columns[2] + Constants.columnsSpacing + Constants.margin*2) * (Constants.charPixelWidth + Constants.blankPixel);
    static lineCount = 12;
    static canvasHeight = (Constants.lineCount + Constants.margin*3 + Constants.footerLine) * (Constants.charPixelHeight + Constants.lineHeightPixel);
    static offset = 0; // Define offset outside the drawScrollingText function
    static scrollSpeed = 1.5; // Adjust the speed of scrolling
}
