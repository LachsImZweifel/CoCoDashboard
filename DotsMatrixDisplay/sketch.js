// reorganize the variables in this file. Goal: Make clear which Variables should be changeable and which depend on the changeable ones

let bitmapFont;
let scrollSpeed = 1.5; // Adjust the speed of scrolling
let abfahrtsplan;

function preload() {
  bitmapFont = loadJSON('http://localhost:63342/pe1-coco-dashboard-1/DotsMatrixDisplay/BitMapCharSet.json');
  abfahrtsplan = loadJSON('http://localhost:63342/pe1-coco-dashboard-1/DotsMatrixDisplay/staticKvbData.json');
}
let asddfsgh = new Constants(["GEN5", "Präsentation", "1.3.24"], 1);
let d1 = [
];

let d2 = [
  ["GEN5", "Präsentation", "01.03.24"],
  ["Alle", "Coco-Fahrt", "08.03.24"],
  ["GEN3", "Iteration", "10.10.24"],
  ["Alle", "BlaBlaBlaBluppBLupp", "08.11.24"],
  ["Alle", "Coco wird zum besten Studiengang aller Zeiten ernannt", "20.03.31"],
];
// input
let dataTestList = d1;

// fixed variables which changed the appearance and the proportions of the display
let lampColor = '#ffae00'; // Color of the LEDs
const ledLampSize = 3;
const ledLampSocketSpacing = 1;
const ledSize = ledLampSize + ledLampSocketSpacing;
const charLampHeight = 7; const charPixelHeight = ledSize * charLampHeight; // Do not change this, it depends on the font
let charLampWidth = 5; let charPixelWidth = ledSize * charLampWidth; // Do not change this, it depends on the font
let charLampDistance = 1; let charPixelDistance = ledSize * charLampDistance; let charTotalPixelWidth = charPixelWidth + charPixelDistance;
let lineLampHeight = 3; let lineHeightPixel = ledSize * lineLampHeight; let charTotalPixelHeight = charPixelHeight + lineHeightPixel;
let columnsLampSpacing = 1;
let canvasMarginLamp = 1;
let footerLampLine = 1;

let columns = [5,24,6]; let columnsTotal = 0;
let lineCount = 12;



let canvasWidth;
let canvasHeight;

let offset = 0; // later used for scrolling, needs to be global



let anzeige1;


function setup() {
  // calc canvas size
  for (let i = 0; i < columns.length; i++){
    columnsTotal += columns[i] + columnsLampSpacing;
  }
  canvasWidth = (columnsTotal + canvasMarginLamp -1) * charTotalPixelWidth;
  canvasHeight = (lineCount + canvasMarginLamp * 3 + footerLampLine) * charTotalPixelHeight;

  createCanvas(canvasWidth, canvasHeight);
  background(0);
  print(abfahrtsplan)
  linie = []
  for (let i = 0; i < abfahrtsplan.events.length; i++) {
    print(abfahrtsplan.events[i].line.number);
    linie.push(abfahrtsplan.events[i].line.number);
    linie.push(abfahrtsplan.events[i].line.direction)
    linie.push(abfahrtsplan.events[i].departure.estimate)
    d1.push(linie);
    linie = []
  }
  anzeige1 = new Layouter(d1, "Diese Woche kümmern sich Hendrik und Jakob um die Ordnung hier ** Unser Tolleyball-Grand-Champion ist ... trommelwirbel ... Jan!! ** so langsam lässt die Kreativleistung nach, der Kafeestand müsste nachgefüllt werden", [5, 24, 6]);

}


function draw() {
  background(0);
  for (data of dataTestList){
    if(dataTestList.indexOf(data) > lineCount-1){
      break;
    }
    lineLayouter(data, dataTestList.indexOf(data));
  }
  footerLayouter("Diese Woche kümmern sich Hendrik und Jakob um die Ordnung hier ** Unser Tolleyball-Grand-Champion ist ... trommelwirbel ... Jan!! ** so langsam lässt die Kreativleistung nach, der Kafeestand müsste nachgefüllt werden");
    // for presentation
  if (keyIsPressed === true) {
    lampColor = '#e7c58a';
  } else {
    lampColor = '#ffae00';
  }
}


let flashColor = '#ffae00'; // Ursprüngliche Farbe des Elements
let originalColor = '#ffffff'; // Farbe des Elements, wenn es nicht aufleuchtet
let isFlashing = false; // Flag, um zu verfolgen, ob das Element aufleuchtet
let flashDuration = 500; // Dauer des Aufleuchtens in Millisekunden
let flashStartTime; // Zeitpunkt, zu dem das Aufleuchten begonnen hat

// for presentation
function keyPressed() {
  if (key === 'x' || key === 'X') {
    if (dataTestList === d1) {
      columns = [5,24,10];
      columnsTotal = 0;
      for (let i = 0; i < columns.length; i++){
        columnsTotal += columns[i] + columnsLampSpacing;
      }
      canvasWidth = (columnsTotal + canvasMarginLamp-2) * charTotalPixelWidth;
      canvasHeight = (lineCount + canvasMarginLamp * 3 + footerLampLine) * charTotalPixelHeight;

      resizeCanvas(canvasWidth, canvasHeight);
      dataTestList = d2;
    } else {

      columns = [5,24,6];
      columnsTotal = 0;
      for (let i = 0; i < columns.length; i++){
        columnsTotal += columns[i] + columnsLampSpacing;
      }
      canvasWidth = (columnsTotal + canvasMarginLamp-1) * charTotalPixelWidth;
      canvasHeight = (lineCount + canvasMarginLamp * 3 + footerLampLine) * charTotalPixelHeight;

      resizeCanvas(canvasWidth, canvasHeight);
      dataTestList = d1;
      // expand d2
      d2.push(["GEN5", "Eine Beispiel-Attraktion", "01.03.24"]);
      d2.push(["GEN5", "Noch eine Attraktion", "01.03.24"]);
      d2.push(["GEN5", "Team-Event", "01.03.24"]);
      d2.push(["GEN5", "MirFälltNixMehrEin", "01.03.24"]);
    }
  }
}

// REGION Layouter
function lineLayouter(dataArray, row){
  let xMargin = charTotalPixelWidth * canvasMarginLamp;
  let yMargin = charTotalPixelHeight;
  let x = xMargin;
  let y = yMargin + yMargin * row;
  for (let i = 0; i < dataArray.length; i++){
    drawTextBox(dataArray[i], columns[i], x, y);
    x += columns[i] * charTotalPixelWidth;
    x += columnsLampSpacing * charTotalPixelWidth;
  }
}
function footerLayouter(text){
  text = "** " + text + " **";
  let xMargin = charTotalPixelWidth * canvasMarginLamp;
  let yMargin = charTotalPixelHeight;
  let x = xMargin;
  let y = (lineCount+canvasMarginLamp+ footerLampLine) * yMargin;
  drawTextBox(text, columnsTotal-2, x, y);
}
// ENDREGION Layouter

function drawTextBox(string,columns,x,y){
  let textBoxWidth = columns * charTotalPixelWidth;
  if (getTextWidth(string) > textBoxWidth){
    drawScrollingText(string,y, textBoxWidth, x);
  } else {
    drawStaticText(string, x, y);
  }
}

// REGION TextDrawer
function drawStaticText(string, x, y) {
  for (let char of string) {
    drawChar(char, x, y);
    x += charTotalPixelWidth;
  }
}
function drawScrollingText(string, y, textBoxWidth, startX) {
  string = " ".repeat(textBoxWidth/32)+string;
  let posY = y;
  let totalTextWidth = getTextWidth(string);
  let posX = startX + textBoxWidth;
  stroke(255);

  let scrollText = totalTextWidth > textBoxWidth;
  offset = frameCount * scrollSpeed % totalTextWidth + textBoxWidth;
  posX -= offset;
  string = string.toUpperCase();

  // Draw the text within the specified text box width
  for (let char of string) {
    drawScrollingChar(char, posX, posY, startX, startX + textBoxWidth);
    posX += charTotalPixelWidth;
    // If scrolling, reset the X position once the text goes beyond the text box width
  }
}

function drawChar(char, x, y) {

  char = char.toUpperCase();
  // prüfe ob char in bitmapFont vorhanden ist
  if (!bitmapFont[char]) {
    char = '?';
  }
  let rows = bitmapFont[char];
  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].length; j++) {
      if (rows[i][j] === '1') {
        fill(lampColor); // Turn on the LED
      } else {
          fill(0); // Turn off the LED
      }
      noStroke();
      square(ledLampSocketSpacing + x + j * ledSize, ledLampSocketSpacing + y + i * ledSize, ledLampSize);
    }
  }
}
function drawScrollingChar(char, x, y, startX1, startX2) {
  char = char.toUpperCase();
  let rows = bitmapFont[char];
  for (let i = 0; i < rows.length; i++) {
    let pixelX = x * ledSize;
    for (let j = 0; j < rows[i].length; j++) {
      if (rows[i][j] === '1') {
        fill(lampColor); // Turn on the LED
      } else {
        fill(0); // Turn off the LED
      }
      noStroke();
      xSquare = ledLampSocketSpacing + x + j * ledSize;
      ySquare = ledLampSocketSpacing + y + i * ledSize;
      if ( xSquare > startX1 && xSquare < startX2) {
        square(xSquare, ySquare, ledLampSize);
      }
    }
  }
}
// ENDREGION TextDrawer

function getTextWidth(text) {
  return text.length * charTotalPixelWidth;
}