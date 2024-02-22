let dataHandler;
let displayBuilder;
let dataSource = true;
let cleaningLoader;
let week = 2;
let coffeeLoader;
//load Coffee Spreadsheet




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
  dataHandler.setTrainInfoData(loadJSON('staticKvbData.json'));
  dataHandler.setFooterStrings(footerStrings);
  // ---
}
function setup() {
    displayBuilder = new DisplayBuilder(dataHandler.getTrainInfoArray(), dataHandler.getFooterStrings(),[10,20,4,6]);
    displayBuilder2 = new DisplayBuilder(dataHandler.getCalendarArray(), dataHandler.getFooterStrings(),[7,24,8]);
    displayBuilder.setupDisplay();
    displayBuilder2.setupDisplay();
    dataSource = true;
    background(0);
    displayBuilder.fillTextBoxes();
    displayBuilder.fillDisplayWithDots();
    displayBuilder2.fillTextBoxes();
    displayBuilder2.fillDisplayWithDots();

}
function draw() {
  // #### draw the display
    if (dataSource) {
        displayBuilder.displayDraw();
    } else {
       displayBuilder2.displayDraw();
    }
  console.log(frameRate());
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