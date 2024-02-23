let calendarLoader;
let coffeeLoader;
let cleaningLoader;
let dataHandler;
let displayBuilder;
let displayBuilder2;
let dataSource;
let isSetupFinished = false;

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
        await coffeeLoader.startTranslation();
        const coffeeInformation = await coffeeLoader.displaySentences();
        console.log(coffeeInformation);

        await cleaningLoader.load();
        const cleaningInformation = await cleaningLoader.getCleanersSentence(3);
        console.log(cleaningInformation);

        const trainInfoData = await loadJSON('http://cocos01.gm.fh-koeln.de:1880/stations/get/all');
        dataHandler.setTrainInfoData(trainInfoData);

        const calendarArray = await calendarLoader.getCalendarArray();
        console.log("(preload): "+ calendarArray.length)
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
        console.log("setup started")
        //displayBuilder = new DisplayBuilder(dataHandler.getTrainInfoArray(), dataHandler.getFooterStrings(),[3,20,8,6]);
        displayBuilder2 = new DisplayBuilder(dataHandler.getCalendarArray(), dataHandler.getFooterStrings(),[5,25,6]);
        //displayBuilder.setupDisplay();
        displayBuilder2.setupDisplay();
        dataSource = true;
        isSetupFinished = true;
        console.log("Setup finished");
    });
}
function draw() {
    if(isSetupFinished){
        background(0);

        // #### draw the display
        displayBuilder2.displayDraw();
        displayBuilder2.updatingForAnimation();
        // ####

        // console.log(frameRate());
    }
}
function keyPressed() {
    if (key === 'x' || key === 'X') {
        dataSource = !dataSource;
    }
}