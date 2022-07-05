function p5Draw(id) {
  let buttons = [];
  let buttonClicks = [];
  let eraseEnable = false;
  const conceptDiv = document.getElementById('general_tree');
  const conceptWidth = conceptDiv.offsetWidth;
  return function(sketch) {
    sketch.setup = function() {
      setupImage('/assets/img/' + id + '.png', sketch, conceptWidth)
      setupButton(['erase', 'save'], id, sketch)
      setupCanvas(id, sketch)
      setupGraphics(sketch)
    };
    sketch.draw = function() {
      sketch.image(sketch.img, 0, 0, conceptWidth, 400);
      sketch.image(sketch.graphic, 0, 0)
    };
    sketch.mouseDragged = function() {
      if (!eraseEnable) {
        sketch.graphic.fill('black');
        sketch.graphic.noStroke();
        sketch.graphic.ellipse(sketch.mouseX, sketch.mouseY, 5, 5);
      } else {
        sketch.graphic.fill('white');
        sketch.graphic.noStroke();
        sketch.graphic.ellipse(sketch.mouseX, sketch.mouseY, 10, 10);
      }
    };
    function setupImage(imagePath, sketch, conceptWidth) {
      const request = new XMLHttpRequest();
      request.open("GET", imagePath, false);
      request.send();
      if(request.status == 404) {
        sketch.img = sketch.createImage(conceptWidth, 400)
      } else {
        sketch.img = sketch.loadImage(imagePath)
      }
    }
    function setupGraphics (sketch) {
      sketch.graphic = sketch.createGraphics(conceptWidth, 400);
    }
    function setupButton(buttonNames, id, sketch) {
      let eraseButtonClicked = new Function(
        "return function " + buttonNames[0] + 'ButtonClicked' + `(eraseEnable, sketch){
          console.log(eraseEnable)
          if (eraseEnable) {
            sketch.noErase();
            eraseEnable = false;
          }
          else {
            sketch.erase();
            eraseEnable = true;
          }
        }`
      )()
      for (var i = 0; i < buttonNames.length; i++) {
        buttons[i] = sketch.createButton(buttonNames[i]);
        buttons[i].parent(id + ' toggle_erase');
        buttons[i].addClass("border rounded px-4");
        buttons[0].mouseClicked(eraseButtonClicked)
      }
    };
    function setupCanvas (id, sketch) {
      const concept = sketch.createCanvas(conceptWidth, 400);
      concept.parent(id + ' canvas');
    }
    function saveButtonClicked() {
      saveCanvas(this.filename);
    }
  };
}
