class DisplayDrawer {
  static displayDraw() {
      let y = Constants.ledSpacing;
      for (const element of Constants.fullRows) {
          for (const row of createRowOutput(element)) {
              let x = Constants.ledSpacing;
              for (const char of row) {
                  if (char === '1') {
                      fill(Constants.colorOn); // Turn on the LED

                  } else {
                      fill(Constants.colorOff); // Turn off the LED
                  }
                  noStroke();
                  square(x, y, Constants.ledLampSize);
                  //ellipseMode(CORNER);
                  //circle(x, y, Constants.ledLampSize);
                  x += Constants.led;
              }
              y+= Constants.led;
          }
          //console.log(frameRate());
      }
  }
}