let eraseEnable = false;
let img;
let photoGraph;

function setup() {
  setupImage()
  setupButton()
  setupCanvas()
  setupGraphics()
}

function draw() {
  image(img, 0, 0, conceptWidth, 400);
  image(graphic, 0, 0)
}

function mouseDragged() {
  if (!eraseEnable) {
    graphic.fill('black');
    graphic.noStroke();
    graphic.ellipse(mouseX, mouseY, 5, 5);
  } else {
    graphic.fill('white');
    graphic.noStroke();
    graphic.ellipse(mouseX, mouseY, 10, 10);
  }
}

function keyTyped() {
  if (key === 's') {
    saveCanvas(this.filename);
  }
}

function setupImage() {
  const request = new XMLHttpRequest();
  request.open("GET", this.imagePath, false);
  request.send();
  if(request.status == 404) {
    img = createImage(this.conceptWidth, 400)
  } else {
    loadImage(this.imagePath)
  }
}

function setupButton () {
  toggleButton = createButton('erase');
  toggleButton.parent('concept toggle');
  toggleButton.addClass("border rounded px-4");
  toggleButton.mouseClicked(ButtonClicked)
}

function setupCanvas () {
  const concept = createCanvas(conceptWidth, 400);
  concept.parent('concept canvas');
}

function setupGraphics () {
  graphic = createGraphics(conceptWidth, 400);
}

function ButtonClicked () {
  toggleStyle()
  toggleErase()
}

function toggleErase() {
  if (eraseEnable) {
    noErase();
    eraseEnable = false;
  }
  else {
    erase();
    eraseEnable = true;
  }
}

function toggleStyle() {
  toggleButton.toggleClass("bg-indigo-100");
  toggleButton.toggleClass("border");
}
