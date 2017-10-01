var mainCanvas = null;
var showAsMinimal = false;
var keyZones = [
  ["right", [39]],
  ["left", [37]],
  ["up", [38]],
  ["down", [40]],
  ["a", [65]],
  ["b", [83]],
  ["select", [16]],
  ["start", [13]]
];

var GBWIDTH = 160;
var GBHEIGHT = 144;
var ASPECTRATIO = GBHEIGHT / GBWIDTH;
var maxWidth = 160 * 4;

var roms = {
  "#helicopter": "/gameboy-helicopter/helicopter.gb",
  "#glitchshooter": "/gameboy-glitch-shooter/glitch.gb"
};

var cout = console.log.bind(this);

function startGame (blob) {
  var binaryHandle = new FileReader();
  binaryHandle.onload = function () {
    if (this.readyState === 2) {
      start(mainCanvas, this.result);
    }
  };
  settings[13] = false; // Crisp edges
  binaryHandle.readAsBinaryString(blob);
};

function loadViaXHR () {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", roms[window.location.hash] || "./dummy.gb");
  xhr.responseType = "blob";
  xhr.onload = function () {
    startGame(new Blob([this.response], { type: "text/plain" }));
  };
  xhr.send();
};

function windowingInitialize() {
  mainCanvas = document.getElementById("mainCanvas");
  registerGUIEvents();
  loadViaXHR();
}

function resizeCanvas() {
  mainCanvas.width = window.innerWidth < maxWidth ? window.innerWidth : maxWidth;
  mainCanvas.height = ASPECTRATIO * mainCanvas.width;
  initNewCanvasSize();
}

window.addEventListener("DOMContentLoaded", windowingInitialize);
function registerGUIEvents() {
  addEvent("keydown", document, keyDown);
  addEvent("keyup", document,  function (event) {
    keyUp(event);
  });
  addEvent("resize", window, resizeCanvas);
}
function keyDown(event) {
  var keyCode = event.keyCode;
  cout(keyCode);
  var keyMapLength = keyZones.length;
  for (var keyMapIndex = 0; keyMapIndex < keyMapLength; ++keyMapIndex) {
    var keyCheck = keyZones[keyMapIndex];
    var keysMapped = keyCheck[1];
    var keysTotal = keysMapped.length;
    for (var index = 0; index < keysTotal; ++index) {
      if (keysMapped[index] == keyCode) {
        GameBoyKeyDown(keyCheck[0]);
        event.preventDefault();
      }
    }
  }
}
function keyUp(event) {
  var keyCode = event.keyCode;
  var keyMapLength = keyZones.length;
  for (var keyMapIndex = 0; keyMapIndex < keyMapLength; ++keyMapIndex) {
    var keyCheck = keyZones[keyMapIndex];
    var keysMapped = keyCheck[1];
    var keysTotal = keysMapped.length;
    for (var index = 0; index < keysTotal; ++index) {
      if (keysMapped[index] == keyCode) {
        console.log(keyCheck[0])
        GameBoyKeyUp(keyCheck[0]);
        event.preventDefault();
      }
    }
  }
}

function addEvent(sEvent, oElement, fListener) {
  oElement.addEventListener(sEvent, fListener, false);
}
function removeEvent(sEvent, oElement, fListener) {
    oElement.removeEventListener(sEvent, fListener, false);
    oElement.detachEvent("on" + sEvent, fListener);	//Pity for IE.
}
