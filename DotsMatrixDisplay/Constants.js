class Constants {
    static ledSize = 3;
    static ledSpacing = 1;
    static led = Constants.ledSize + Constants.ledSpacing;
    static charHeight = 7;
    static charWidth = 5;
    static lineHeight = 3;
    static blank = 1;
    static blankPixel = (Constants.led) * Constants.blank;
    static charPixelHeight = (Constants.ledSize + Constants.ledSpacing) * Constants.charHeight;
    static charPixelWidth = (Constants.ledSize + Constants.ledSpacing) * Constants.charWidth;
    static charPixelSizeX = Constants.charPixelWidth + Constants.blankPixel;
    static lineHeightPixel = (Constants.ledSize + Constants.ledSpacing) * Constants.lineHeight;
    static margin = 1;
    static columnSpacing = 1;
    static lineCount = 12;
    static color1 = '#ffae00'; // Color of the LEDs
    // static columns = [2, 2, 2];
}
