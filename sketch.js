let dataHandler;
let displayBuilder;
let dataSource = true;

function preload() {
  Constants.bitmapFont = loadJSON('BitMapCharSet.json');
  dataHandler = new DataHandler();
  // --- add data here
  dataHandler.setTrainInfoData(loadJSON('http://cocos01.gm.fh-koeln.de:1880/stations/get/all'));
  dataHandler.setFooterStrings(["Aufräumliste: Diese Woche stehen Jan und Hendrik auf dem Plan","Unser Teevorrat ist bei 100%", "Der Kaffee müsste bald aufgefüllt werden, es sind nur noch 20 % verfügbar"]);
  // ---
}
function setup() {
    displayBuilder = new DisplayBuilder(dataHandler.getTrainInfoArray(), dataHandler.getFooterStrings(),[3,20,8,6]);
    displayBuilder2 = new DisplayBuilder(dataHandler.getCalendarArray(), dataHandler.getFooterStrings(),[7,24,8]);
    displayBuilder.setupDisplay();
    dataSource = true;
}
function draw() {
  background(0);

  // #### draw the display
    if (dataSource) {
        displayBuilder.displayDraw();
        displayBuilder.updatingForAnimation();
    } else {
        displayBuilder2.displayDraw();
        displayBuilder2.updatingForAnimation();
    }
  // console.log(frameRate());
}
function keyPressed() {
  if (key === 'x' || key === 'X') {
    dataSource = !dataSource;
    if (dataSource){
        displayBuilder.setupDisplay();
    } else {
        displayBuilder2.setupDisplay();
    }
  }
}