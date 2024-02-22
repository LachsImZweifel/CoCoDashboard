class TextBox {
    constructor(x,y,maxWidth) {
        this.animated = false;
        this.lastUpdateTime = millis();
        this.isDrawn = false;
        this.bitmap = [];
        this.startXInLeds = x;
        this.startYInLeds = y;
        this.maxWidth = maxWidth;
        this.offset = 0;
        this.direction = 1;
    }

    draw() {
        if (this.animated) {
            this.drawAnimated();
        } else {
            this.drawStatic();
        }
    }
    drawStatic() {
        if (!this.isDrawn) {
            let y = this.startYInLeds * Constants.led;
            for (const row of this.bitmap) {
                let x = this.startXInLeds * Constants.led
                for (const char of row) {
                    if (char === '1') {
                        fill(Constants.colorOn); // Turn on the LED
                    } else {
                        fill(Constants.colorOff); // Turn off the LED
                    }
                    noStroke();
                    square(x, y, Constants.ledLampSize);
                    x += Constants.led;
                }
                y += Constants.led;
            }
            this.isDrawn = true;
        }
    }
    drawAnimated() {
        if(!this.isDrawn) {
            let y = this.startYInLeds * Constants.led;
            for (const row of this.bitmap) {
                let x = this.startXInLeds * Constants.led;
                for( let i = 0; i < this.maxWidth; i++) {
                    if (row[i+this.offset] === '1') {
                        fill(Constants.colorOn); // Turn on the LED
                    } else {
                        fill(Constants.colorOff); // Turn off the LED
                    }
                    noStroke();
                    square(x, y, Constants.ledLampSize);
                    console.log(this.startYInLeds);
                    x += Constants.led;
                }
                y += Constants.led;
                this.isDrawn = true;
            }
        }
        if (this.offset >= this.maxWidth || this.offset < 0) {
            this.direction *= -1;
        }
        let currentTime = millis();
        if (currentTime - this.lastUpdateTime >= Constants.displayUpdatingRate) {
            this.offset += this.direction ;
            this.lastUpdateTime = currentTime;
            this.isDrawn = false;
        }

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
        this.bitmap = resultRows;
        this.checkIfAnimationIsNeeded();
    }
    getCharBitPattern(char) {
        const defaultPattern = ["00000", "00000", "00000", "00000", "00000", "00000", "00000"];
        return Constants.bitmapFont[char] || defaultPattern;
    }
    checkIfAnimationIsNeeded() {
        let width = this.bitmap[0].length;
        if (width > this.maxWidth) {
            this.animated = true;
        }
    }
}