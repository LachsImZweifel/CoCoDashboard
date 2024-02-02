/*let bitmapFont;
let dataHandler;

function preload() {
  bitmapFont = loadJSON('BitMapCharSet.json');
  dataHandler = new DataHandler();
  // add data here
  dataHandler.setTrainInfoData(loadJSON('staticKvBData.json'));
}

let fahrplanLayouter = new Layouter([5,24,6]);
let calendarLayouter = new Layouter([4,24,8]);



function setup() {
  Constants.canvasWidth = fahrplanLayouter.getTotalWidth();
  createCanvas(Constants.canvasWidth, Constants.canvasHeight);
  background(0);

  // ####### ADD DATA HERE #######
  fahrplanLayouter.addDataArray(dataHandler.getTrainInfoArray());
  calendarLayouter.addDataArray(dataHandler.getCalendarArray());

  dataSource = true;

}
function draw() {
  background(0);
  fahrplanLayouter.footerText = "Diese Woche kümmern sich Hendrik und Jakob um die Ordnung hier ** Unser Tolleyball-Grand-Champion ist ... trommelwirbel ... Jan!! ** so langsam lässt die Kreativleistung nach, der Kafeestand müsste nachgefüllt werden";
  // fahrplanLayouter.setHeaderText("Abfahrtsplan");
  if (dataSource) {
    fahrplanLayouter.draw();
  } else {
    calendarLayouter.draw();
  }
}
function keyPressed() {
  if (key === 'x' || key === 'X') {
    dataSource = !dataSource;
  }
} */