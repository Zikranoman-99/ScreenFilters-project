var fgImage = null;
var bgImage = null;
var fgCanvas;
var bgCanvas;
function loadForegroundImage(){ 
  //accessing the element
  var file = document.getElementById("fgfile");
  //loading the image
 fgImage = new SimpleImage(file);
 fgCanvas = document.getElementById("fgcan");
  fgImage.drawTo(fgCanvas);
}

function loadBackgroundImage(){
  var file = document.getElementById("bgfile");
  bgImage = new SimpleImage(file);
  bgCanvas = document.getElementById("bgcan");
  bgImage.drawTo(bgCanvas);
}

function create(){
  var output = new SimpleImage(fgImage.getWidth(), fgImage.getHeight());
  var threshold = 230;
  
  for(var pixel of fgImage.values())
    {
      var x = pixel.getX();
      var y= pixel.getY();
      if(pixel.getGreen() > threshold)
        { //use background
        var bgpixel = bgImage.getPixel(x,y);
        output.setPixel(x,y,bgpixel);
        }
      else{
        output.setPixel(x,y,pixel);
      }
    }
  return output;
}

function greenscreen(){
  if (fgImage == null || ! fgImage.complete()){
    alert("Foreground not loaded");
  }
  if(bgImage == null || ! bgImage.complete()){
    alert("Background not loaded");
  }
  // clear canvases
  
  var finalImage = create();
  finalImage.drawTo(fgCanvas);
}

function clearCanvas() {
  doClear(fgCanvas);
  doClear(bgCanvas);
}

function doClear(canvas) {
  var context = canvas.getContext("2d");
  context.clearRect(0,0,canvas.width,canvas.height);
}