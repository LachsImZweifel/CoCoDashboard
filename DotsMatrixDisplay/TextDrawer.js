class TextDrawer {
    static drawStaticText(string, x, y) {
        for (let char of string) {
            this.drawChar(char, x, y);
            x += Constants.charPixelWidth + Constants.blankPixel;
        }
    }

    static drawScrollingText(string, y, textBoxWidth, startX) {
        string = " ".repeat(textBoxWidth/32)+string;
        let posY = y;
        let totalTextWidth = this.getTextWidth(string);
        let posX = startX + textBoxWidth;
        stroke(255);

        let scrollText = totalTextWidth > textBoxWidth;
        Constants.offset = frameCount * Constants.scrollSpeed % totalTextWidth + textBoxWidth;
        posX -= Constants.offset;
        string = string.toUpperCase();

        // Draw the text within the specified text box width
        for (let char of string) {
            this.drawScrollingChar(char, posX, posY, startX, startX + textBoxWidth);
            posX += Constants.charPixelWidth + Constants.blankPixel;
        }
    }

    static drawChar(char, x, y) {
        char = char.toUpperCase();
        // check if char is in bitmapFont
        if (!bitmapFont[char]) {
            char = '?';
        }
        let rows = bitmapFont[char];
        for (let i = 0; i < rows.length; i++) {
            for (let j = 0; j < rows[i].length; j++) {
                if (rows[i][j] === '1') {
                    fill(Constants.color1); // Turn on the LED
                } else {
                    fill(0); // Turn off the LED
                }
                noStroke();
                square(Constants.ledSpacing + x + j * (Constants.ledSize + Constants.ledSpacing), Constants.ledSpacing + y + i * (Constants.ledSize + Constants.ledSpacing), Constants.ledSize);
            }
        }
    }

    static drawScrollingChar(char, x, y, startX1, startX2) {
        char = char.toUpperCase();
        let rows = bitmapFont[char];
        for (let i = 0; i < rows.length; i++) {
            let pixelX = x * (Constants.ledSize + Constants.ledSpacing);
            for (let j = 0; j < rows[i].length; j++) {
                if (rows[i][j] === '1') {
                    fill(Constants.color1); // Turn on the LED
                } else {
                    fill(0); // Turn off the LED
                }
                noStroke();
                let xSquare = Constants.ledSpacing + x + j * (Constants.ledSize + Constants.ledSpacing);
                let ySquare = Constants.ledSpacing + y + i * (Constants.ledSize + Constants.ledSpacing);
                if ( xSquare > startX1 && xSquare < startX2) {
                    square(xSquare, ySquare, Constants.ledSize);
                }
            }
        }
    }

    static getTextWidth(text) {
        return text.length * (Constants.charPixelWidth + Constants.blankPixel);
    }
}