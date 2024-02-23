// for handling data
let dataHandler;

// loader Objects
let coffeeLoader;
let cleaningLoader;
let isSetupFinished = false;

// for drawing
let display1;
let display2;
let dataSource;



function preload() {
    Constants.bitmapFont = loadJSON('BitMapCharSet.json');

    const loadDataPromise = new Promise(async (resolve) => {
        dataHandler = new DataHandler();
        calendarLoader = new CalendarLoader;
        coffeeLoader = new loadCoffee();
        cleaningLoader = new CleaningLoader();

        let SheetId = '1U71TdEqhEcNnCbI8gDZZnA7Pmmq9fDy_FmoafrTGvmM'
        let SheetTitle = 'Coffee'
        let SheetRange1 = 'C1:F2'
        dataHandler.setCoffeeSpreadSheetFullURl('https://docs.google.com/spreadsheets/d/' + SheetId + '/gviz/tq?sheet=' + SheetTitle + '&range=' +SheetRange1);

        let footerStrings = [];

        await coffeeLoader.startTranslation();
        const coffeeInformation = await coffeeLoader.displaySentences();
        footerStrings.push(coffeeInformation);

        await cleaningLoader.load();
        const cleaningInformation = await cleaningLoader.getCleanersSentence(2);
        footerStrings.push(cleaningInformation);
        dataHandler.setFooterStrings(footerStrings);

        const trainInfoData = await loadJSON('http://cocos01.gm.fh-koeln.de:1880/stations/get/all');
        dataHandler.setTrainInfoData(trainInfoData);

        const calendarArray = await calendarLoader.getCalendarArray();
        dataHandler.setCalendarArray(calendarArray);

        const windowPreloadEvent = new Event('windowPreload');
        window.dispatchEvent(windowPreloadEvent);

        resolve();
    });

    return loadDataPromise;
}
function setup() {
    // Warte auf den `windowPreload`-Event, bevor das eigentliche Setup beginnt
    window.addEventListener('windowPreload', () => {
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
        isSetupFinished = true;
    });
}
function draw() {
    if(isSetupFinished){
        if (dataSource) {
            display1.displayDraw();
        } else {
            display2.displayDraw();
        }
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