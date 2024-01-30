let bitmapFont;
let abfahrtsplan;

function preload() {
  bitmapFont = loadJSON('http://localhost:63342/pe1-coco-dashboard-1/DotsMatrixDisplay/BitMapCharSet.json');
  abfahrtsplan = loadJSON('http://localhost:63342/pe1-coco-dashboard-1/DotsMatrixDisplay/staticKvbData.json');
}
// const train = [
//   0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x00, 0x00, 0x00, 0xe8, 0x00, 0x00, 0x00, 0x68,
//   0x00, 0x00, 0x00, 0x78, 0x00, 0x00, 0x00, 0xf8, 0x00, 0x00, 0x00, 0x68, 0x00, 0x00, 0x00, 0x68,
//   0x00, 0x00, 0x00, 0xe8, 0x00, 0x00, 0x00, 0x78, 0x00, 0x00, 0x00, 0x20, 0x00, 0x00, 0x00, 0x78,
//   0x00, 0x00, 0x00, 0xe8, 0x00, 0x00, 0x00, 0x68, 0x00, 0x00, 0x00, 0x68, 0x00, 0x00, 0x00, 0xe8,
//   0x00, 0x00, 0x00, 0x78, 0x00, 0x00, 0x00, 0x20, 0x00, 0x00, 0x00, 0x78, 0x00, 0x00, 0x00, 0xe8,
//   0x00, 0x00, 0x00, 0x68, 0x00, 0x00, 0x00, 0x68, 0x00, 0x00, 0x00, 0xe8, 0x00, 0x00, 0x00, 0x78,
//   0x00, 0x00, 0x00, 0x20, 0x00, 0x00, 0x00, 0x78, 0x00, 0x00, 0x00, 0xe8, 0x00, 0x00, 0x00, 0x68,
//   0x00, 0x00, 0x00, 0x68, 0x00, 0x00, 0x00, 0xe8, 0x00, 0x00, 0x00, 0x78, 0x00, 0x00, 0x00, 0x00
// ];
//
//
// let bicycleSymbol = [
//   [0, 0, 1, 0, 0, 0, 1, 0, 0],
//   [0, 1, 0, 1, 0, 1, 0, 1, 0],
//   [1, 1, 1, 1, 1, 1, 1, 1, 1],
//   [0, 1, 0, 0, 0, 0, 0, 1, 0],
//   [0, 0, 1, 0, 0, 0, 1, 0, 0]
// ];
let fahrplanLayouter = new Layouter([5,24,6]);
let calendarLayouter = new Layouter([4,24,8]);
let bicycleDrawer = new SymbolDrawer(bicycleSymbol);



function setup() {
  Constants.canvasWidth = fahrplanLayouter.getTotalWidth();
  createCanvas(Constants.canvasWidth, Constants.canvasHeight);
  background(0);
  let linie = []
  for (let i = 0; i < abfahrtsplan.events.length; i++) {
    print(abfahrtsplan.events[i].line.number);
    linie.push(abfahrtsplan.events[i].line.number);
    linie.push(abfahrtsplan.events[i].line.direction)
    linie.push(abfahrtsplan.events[i].departure.estimate)
    fahrplanLayouter.addData(linie);
    linie = [];
  }
  for (let i = 0; i < fahrplanLayouter.length; i++) {
    fahrplanLayouter.addData(calendarData[i]);
  }
  let calendarData = [
    ["GEN5", "Präsentation", "01.03.24"],
    ["Alle", "Coco-Fahrt", "08.03.24"],
    ["GEN3", "Iteration", "10.10.24"],
    ["Alle", "BlaBlaBlaBluppBLupp", "08.11.24"],
    ["Alle", "Coco wird zum besten Studiengang aller Zeiten ernannt", "20.03.31"],
  ];
  for (let i = 0; i < calendarData.length; i++) {
    calendarLayouter.addData(calendarData[i]);
  }
  dataSource = true;

}
function draw() {
  background(0);
  fahrplanLayouter.footerText = "Diese Woche kümmern sich Hendrik und Jakob um die Ordnung hier ** Unser Tolleyball-Grand-Champion ist ... trommelwirbel ... Jan!! ** so langsam lässt die Kreativleistung nach, der Kafeestand müsste nachgefüllt werden";
  fahrplanLayouter.setHeaderText("Abfahrtsplan");
  if (dataSource) {
    fahrplanLayouter.draw();
  } else {
    calendarLayouter.draw();
  }
  // fahrplanLayouter.draw();
  // bicycleDrawer.drawSymbol(Constants.canvasWidth / 2, Constants.canvasHeight - Constants.charPixelHeight * 2);
  // bicycleDrawer.drawTrain(Constants.canvasWidth / 2, Constants.canvasHeight - Constants.charPixelHeight * 2);
}
function keyPressed() {
  if (key === 'x' || key === 'X') {
    dataSource = !dataSource;
  }
}