class ImplementP5 {
  constructor(filename) {
    this.filename = filename
    this.imagePath = '/assets/img/' + filename
    this.conceptDiv = document.getElementById('concept');
    this.conceptWidth = this.conceptDiv.offsetWidth;
  }
      
  setup() {
    this.setupImage()
    this.setupButton()
    this.setupCanvas()
    this.setupGraphics()
  }
      
  draw() {
    image(img, 0, 0, this.conceptWidth, 400);
    image(graphic, 0, 0)
  }

  mouseDragged() {
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
    
  keyTyped() {
    if (key === 's') {
      saveCanvas(filename);
    }
  }
    
  setupImage() {
    let img
    try {
      img = p5.loadImage(imagePath);
    }
    catch {
      img = p5.createImage(this.conceptWidth, 400)
    }
  }
  
  setupButton () {
    toggleButton = p5.createButton('erase');
    toggleButton.parent('concept toggle');
    toggleButton.addClass("border rounded px-4");
    toggleButton.mouseClicked(ButtonClicked)
  }
    
  setupCanvas () {
    const concept = createCanvas(this.conceptWidth, 400);
    concept.parent('concept canvas');
  }
    
  setupGraphics () {
    graphic = createGraphics(this.conceptWidth, 400);
  }
    
  ButtonClicked () {
    toggleStyle()
    toggleErase()
  }
    
  toggleErase() {
    if (eraseEnable) {
      noErase();
      eraseEnable = false;
    }
    else {
      erase();
      eraseEnable = true;
    }
  }
    
  toggleStyle() {
    toggleButton.toggleClass("bg-indigo-100");
    toggleButton.toggleClass("border");
  }
}

export { ImplementP5 }
