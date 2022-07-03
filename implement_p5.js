let eraseEnable = false;
let img;
let photoGraph;

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

function setupImage(imagePath) {
  console.log('testing!!!!!!!!!')
  const request = new XMLHttpRequest();
  request.open("GET", imagePath, false);
  request.send();
  if(request.status == 404) {
    img = createImage(this.conceptWidth, 400)
  } else {
    img = loadImage(imagePath)
  }
}

function setupButton (id) {
  console.log(id)
  toggleButton = createButton('erase');
  toggleButton.parent(id + ' toggle_erase');
  toggleButton.addClass("border rounded px-4");
  toggleButton.mouseClicked(ButtonClicked)
}

function setupCanvas (id) {
  const concept = createCanvas(conceptWidth, 400);
  concept.parent(id + ' canvas');
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
