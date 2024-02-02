let dataHandler;
let displayBuilder;
let dataSource;

function preload() {
  Constants.bitmapFont = loadJSON('BitMapCharSet.json');
  dataHandler = new DataHandler();
  // --- add data here
  dataHandler.setTrainInfoData(loadJSON('staticKvBData.json'));
  dataHandler.setFooterStrings(["Diese Woche kümmern sich Hendrik und Jakob um die Ordnung hier", "Unser Tolleyball-Grand-Champion ist ... trommelwirbel ... Jan!!","So langsam lässt die Kreativleistung nach, der Kaffeestand müsste nachgefüllt werden"]);
  // ---
  displayBuilder = new DisplayBuilder(dataHandler,[10,20,6]);
}



function setup() {
    displayBuilder.setupDisplay();
    dataSource = true;
}
function draw() {
  background(0);
  displayBuilder.displayDraw();
  displayBuilder.updatingForAnimation();
  //fahrplanLayouter.footerText = "Diese Woche kümmern sich Hendrik und Jakob um die Ordnung hier ** Unser Tolleyball-Grand-Champion ist ... trommelwirbel ... Jan!! ** so langsam lässt die Kreativleistung nach, der Kafeestand müsste nachgefüllt werden";
  // fahrplanLayouter.setHeaderText("Abfahrtsplan");
  /*if (dataSource) {
    fahrplanLayouter.draw();
  } else {
    calendarLayouter.draw();
  }*/
}
function keyPressed() {
  if (key === 'x' || key === 'X') {
    dataSource = !dataSource;
  }
}