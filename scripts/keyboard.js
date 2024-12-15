window.addEventListener('keydown', handleKeyDown);
document.addEventListener('keydown', highlightShiftKey);
document.addEventListener('keyup', removeShiftKeyHighlight);

function handleKeyDown(event) {
  const commandKeyPressed = event.metaKey || event.ctrlKey;
  const shiftKeyPressed = event.shiftKey;

  switch (true) {
    // Command or Shift + 'S'
    case (commandKeyPressed || shiftKeyPressed) && (event.key === 'S' || event.key === 's'):
      event.preventDefault();
      exportImageShortcut();
      break;

    // Shift + Arrow Up
    case event.shiftKey && event.key === 'ArrowUp':
      adjustFontSize(1);
      break;

    // Shift + Arrow Down
    case event.shiftKey && event.key === 'ArrowDown':
      adjustFontSize(-1);
      break;

    // Shift + Arrow Right/Left
    case event.shiftKey && (event.key === 'ArrowRight' || event.key === 'ArrowLeft'):
      resetFontSizeForDevice();
      break;

    // Escape
    case event.key === 'Escape' || event.keyCode === 27:
      triggerClickById('close_modal');
      break;

    // Command or Shift + '1'
    case (commandKeyPressed || shiftKeyPressed) && event.key === '1':
      event.preventDefault(); // Prevent default behavior like entering "!" or "@"
      triggerClickById('poor');
      break;

    // Command or Shift + '2'
    case (commandKeyPressed || shiftKeyPressed) && event.key === '2':
      triggerClickById('solid');
      break;

    // Command or Shift + '3'
    case (commandKeyPressed || shiftKeyPressed) && event.key === '3':
      triggerClickById('good');
      break;

    // Command or Shift + '4'
    case (commandKeyPressed || shiftKeyPressed) && event.key === '4':
      triggerClickById('great');
      break;

    // Command or Shift + 'E'
    case (commandKeyPressed || shiftKeyPressed) && (event.key === 'E' || event.key === 'e'):
      triggerClickById('edit_title');
      break;

    // Command or Shift + Enter
    case (commandKeyPressed || shiftKeyPressed) && (event.key === 'Enter' || event.key === 'enter'):
      event.preventDefault();
      saveData();
      triggerClickById('close_modal');
      break;

    default:
      break;
  }
}

function adjustFontSize(delta) {
  const reviewText = document.getElementById("text");
  const textSizeInput = document.getElementById("text_size_review");

  if (reviewText && textSizeInput) {
    const currentFontSize = parseFloat(window.getComputedStyle(reviewText).fontSize);
    const newFontSize = currentFontSize + delta;

    reviewText.style.fontSize = `${newFontSize}px`;
    textSizeInput.value = newFontSize;
  }
}

function resetFontSizeForDevice() {
  const fontSize = window.innerWidth < 600 ? "9" : "26";
  localStorage.setItem("text_size_review", fontSize);
  setFontSize(fontSize);
}

function setFontSize(size) {
  const textElement = document.getElementById("text");
  const textSizeInput = document.getElementById("text_size_review");

  if (textElement && textSizeInput) {
    textElement.style.fontSize = `${size}px`;
    textSizeInput.value = size;
  }
}

function triggerClickById(elementId) {
  const element = document.getElementById(elementId) || $(`#${elementId}`);
  if (element) element.click();
}

function highlightShiftKey(event) {
  if (event.key === 'Shift') {
    applyShiftKeyStyle(true);
  }
}

function removeShiftKeyHighlight(event) {
  if (event.key === 'Shift') {
    applyShiftKeyStyle(false);
  }
}

function applyShiftKeyStyle(isActive) {
  const shiftButtonDiv = document.getElementById('shift_button');
  if (shiftButtonDiv) {
    shiftButtonDiv.style.border = isActive ? '1px solid #A6FF00' : '1px solid #ffffff50';
    shiftButtonDiv.style.boxShadow = isActive ? '0 0 10px #A6FF0030, 0 0 20px #A6FF0030' : 'none';
  }
}