let dataHandler;
let displayBuilder;
let displayBuilder2;
let dataSource;

function preload() {
  Constants.bitmapFont = loadJSON('BitMapCharSet.json');
  dataHandler = new DataHandler();
  // --- add data here
  dataHandler.setTrainInfoData(loadJSON('staticKvBData.json'));
  dataHandler.setFooterStrings(["Diese Woche kümmern sich Hendrik und Jakob um die Ordnung hier", "Unser Tolleyball-Grand-Champion ist ... trommelwirbel ... Jan!!","So langsam lässt die Kreativleistung nach, der Kaffeestand müsste nachgefüllt werden"]);
  // ---
}
function setup() {
    displayBuilder = new DisplayBuilder(dataHandler.getTrainInfoArray(), dataHandler.getFooterStrings(),[10,20,6]);
    displayBuilder2 = new DisplayBuilder(dataHandler.getCalendarArray(), dataHandler.getFooterStrings(),[10,20,6]);
    displayBuilder.setupDisplay();
    //displayBuilder2.setupDisplay();
    dataSource = true;
}
function draw() {
  background(0);

  // #### draw the display
  displayBuilder.displayDraw();
  displayBuilder.updatingForAnimation();
  // ####

  console.log(frameRate());
}
function keyPressed() {
  if (key === 'x' || key === 'X') {
    dataSource = !dataSource;
  }
}