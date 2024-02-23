// for handling data
let dataHandler;

// loader Objects
let coffeeLoader;
let cleaningLoader;

// for drawing
let display1;
let display2;
let dataSource;


function preload() {
    // create instances
    dataHandler = new DataHandler();
    coffeeLoader = new loadCoffee();
    cleaningLoader = new CleaningLoader();


    // load data
    Constants.bitmapFont = loadJSON('BitMapCharSet.json');
    let trainInfoData = loadJSON('http://cocos01.gm.fh-koeln.de:1880/stations/get/all');
    //coffeeLoader.startTranslation();
    //cleaningLoader.load();


    // create footer Strings
    let footerStrings = [];
    //footerStrings.push(cleaningLoader.getCleanersSentence(1));
    //footerStrings.push(coffeeLoader.displaySentences());


    // add to DataHandler
    dataHandler.setTrainInfoData(trainInfoData);
    //dataHandler.setCalendarData();
    dataHandler.setFooterStrings(footerStrings);
    // ---
}
function setup() {
    dataSource = true;
    // display1
    display1 = new DisplayBuilder(dataHandler.getTrainInfoArray(), dataHandler.getFooterStrings(),[4,23,8,6]);
    display1.fillTextBoxes();
    display1.fillDisplayWithDots();
    //display2
    display2 = new DisplayBuilder(dataHandler.getCalendarArray(), dataHandler.getFooterStrings(),[8,25,8]);
    display2.fillTextBoxes();
    display2.fillDisplayWithDots();
    // setup
    background(0);
    createCanvas(Constants.canvasWidth, Constants.canvasHeight);
    display1.fillDisplayWithDots();
}
function draw() {
    if (dataSource) {
        display1.displayDraw();
    } else {
       display2.displayDraw();
    }
}
function keyPressed() {
  if (key === 'x' || key === 'X') {
    dataSource = !dataSource;
    if (dataSource){
        display1.fillDisplayWithDots();
        display1.redrawAllTextBoxes()
    } else {
        display2.fillDisplayWithDots();
        display2.redrawAllTextBoxes();
    }
  }
}