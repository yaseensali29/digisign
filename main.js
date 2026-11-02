// Make the DIV element draggable:
dragElement(document.getElementById("test"));

var headlineInput = document.getElementById("headline-input");
var headlineButton = document.getElementById("update-headline");
var headlineText = document.getElementById("headline-text");
var headlineControls = document.getElementById("headline-controls");

function updateHeadline() {
  var nextHeadline = headlineInput.value.trim();
  if (nextHeadline !== "") {
    headlineText.textContent = nextHeadline;
  }
}

if (headlineInput && headlineButton && headlineText && headlineControls) {
  headlineButton.onclick = updateHeadline;

  headlineInput.onkeydown = function (event) {
    if (event.key === "Enter") {
      updateHeadline();
    }
  };

  document.onkeydown = function (event) {
    if (event.key !== "e" && event.key !== "E") {
      return;
    }

    // Typing in the headline box should still insert "e".
    if (event.target === headlineInput) {
      return;
    }

    headlineControls.classList.toggle("hidden");
  };
}

function dragElement(elmnt) {
  var offsets;

  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id)) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id).onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    offsets = elmnt.parentElement.getBoundingClientRect();
    console.log(offsets);
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    console.log(`ClientX = ${e.clientX}`);
    console.log(`ClientY = ${e.clientY}`);
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
