let dataHandler;
let displayBuilder;
let dataSource = true;
let coffeeLoader;




function preload() {
  Constants.bitmapFont = loadJSON('BitMapCharSet.json');
  dataHandler = new DataHandler();
  coffeeLoader = new loadCoffee();
  coffeeLoader.startTranslation();

  //cleaningLoader = new CleaningLoader();
  //cleaningLoader.load();
  let footerStrings = [" "];

  //footerStrings.push(cleaningLoader.getCleanersSentence(1));
  footerStrings.push(coffeeLoader.displaySentences());
  // --- add data here
  dataHandler.setTrainInfoData(loadJSON('http://cocos01.gm.fh-koeln.de:1880/stations/get/all'));
  dataHandler.setFooterStrings(footerStrings);
  // ---
}
function setup() {
    displayBuilder = new DisplayBuilder(dataHandler.getTrainInfoArray(), dataHandler.getFooterStrings(),[4,23,8,6]);
    displayBuilder2 = new DisplayBuilder(dataHandler.getCalendarArray(), dataHandler.getFooterStrings(),[8,25,8]);
    dataSource = true;
    displayBuilder.fillTextBoxes();
    displayBuilder.fillDisplayWithDots();
    displayBuilder2.fillTextBoxes();
    displayBuilder2.fillDisplayWithDots();
    background(0);
    createCanvas(Constants.canvasWidth, Constants.canvasHeight);
    displayBuilder.fillDisplayWithDots();

}
function draw() {
    if (dataSource) {
        displayBuilder.displayDraw();
    } else {
       displayBuilder2.displayDraw();
    }
}
function keyPressed() {
  if (key === 'x' || key === 'X') {
    dataSource = !dataSource;
    if (dataSource){
        displayBuilder.fillDisplayWithDots();
        displayBuilder.redrawAllTextBoxes()
    } else {
        displayBuilder2.fillDisplayWithDots();
        displayBuilder2.redrawAllTextBoxes();
    }
  }
}