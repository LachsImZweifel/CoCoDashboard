class SymbolDrawer {
    /*
    constructor(symbolArray) {
        this.symbolArray = symbolArray;
    }

    drawSymbol(x, y) {
        for (let i = 0; i < this.symbolArray.length; i++) {
            for (let j = 0; j < this.symbolArray[i].length; j++) {
                if (this.symbolArray[i][j] === 1) {
                    fill(Constants.color1); // Turn on the LED
                    noStroke();
                    square(x + j * (Constants.ledLampSize + Constants.ledSpacing), y + i * (Constants.ledLampSize + Constants.ledSpacing), Constants.ledLampSize);
                }
            }
        }
    }
    drawTrain(x, y) {
        const train = [
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x00, 0x00, 0x00, 0xe8, 0x00, 0x00, 0x00, 0x68,
            0x00, 0x00, 0x00, 0x78, 0x00, 0x00, 0x00, 0xf8, 0x00, 0x00, 0x00, 0x68, 0x00, 0x00, 0x00, 0x68,
            0x00, 0x00, 0x00, 0xe8, 0x00, 0x00, 0x00, 0x78, 0x00, 0x00, 0x00, 0x20, 0x00, 0x00, 0x00, 0x78,
            0x00, 0x00, 0x00, 0xe8, 0x00, 0x00, 0x00, 0x68, 0x00, 0x00, 0x00, 0x68, 0x00, 0x00, 0x00, 0xe8,
            0x00, 0x00, 0x00, 0x78, 0x00, 0x00, 0x00, 0x20, 0x00, 0x00, 0x00, 0x78, 0x00, 0x00, 0x00, 0xe8,
            0x00, 0x00, 0x00, 0x68, 0x00, 0x00, 0x00, 0x68, 0x00, 0x00, 0x00, 0xe8, 0x00, 0x00, 0x00, 0x78,
            0x00, 0x00, 0x00, 0x20, 0x00, 0x00, 0x00, 0x78, 0x00, 0x00, 0x00, 0xe8, 0x00, 0x00, 0x00, 0x68,
            0x00, 0x00, 0x00, 0x68, 0x00, 0x00, 0x00, 0xe8, 0x00, 0x00, 0x00, 0x78, 0x00, 0x00, 0x00, 0x00
        ];

        // Convert the hexadecimal data into a 2D array of 0s and 1s
        let binaryData = train.map(value => value.toString(2).padStart(8, '0').split('').map(Number));

        // Create an instance of the SymbolDrawer class with the 2D array
        let trainDrawer = new SymbolDrawer(binaryData);

        // Draw the train symbol
        trainDrawer.drawSymbol(x, y);
    }
    */
}