window.addEventListener('keydown', handleKeyDown);
document.addEventListener('keydown', highlightShiftKey);
document.addEventListener('keyup', removeShiftKeyHighlight);

function handleKeyDown(event) {
  const commandKeyPressed = event.metaKey || event.ctrlKey;
  const shiftKeyPressed = event.shiftKey;

  switch (true) {
    // Command or Shift + 'S'
    case commandKeyPressed && (event.key === 'S' || event.key === 's'):
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
    case commandKeyPressed && event.key === '1':
      event.preventDefault(); // Prevent default behavior like entering "!" or "@"
      triggerClickById('poor');
      break;

    // Command or Shift + '2'
    case commandKeyPressed && event.key === '2':
      triggerClickById('solid');
      break;

    // Command or Shift + '3'
    case commandKeyPressed && event.key === '3':
      triggerClickById('good');
      break;

    // Command or Shift + '4'
    case commandKeyPressed && event.key === '4':
      triggerClickById('great');
      break;

    // Command or Shift + 'E'
    case commandKeyPressed && (event.key === 'E' || event.key === 'e'):
      triggerClickById('edit_title');
      break;

    // Command or Shift + Enter
    case commandKeyPressed && (event.key === 'Enter' || event.key === 'enter'):
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
  // Update the styling for the shift_button element
  const shiftButtonDiv = document.getElementById('shift_button');

  // Update the styling for all elements with the "command_shortcut" class
  const commandShortcuts = document.querySelectorAll('.shift_shortcut');
  commandShortcuts.forEach(element => {
    element.style.border = isActive ? '1px solid #A6FF00' : '1px solid #ffffff50';
    element.style.boxShadow = isActive ? '0 0 10px #A6FF0020, 0 0 20px #A6FF0020' : 'none';
  });
}

function applyCommandKeyStyle(isActive) {
  // Update the styling for all elements with the "command_shortcut" class
  const commandShortcuts = document.querySelectorAll('.command_shortcut');
  commandShortcuts.forEach(element => {
    element.style.border = isActive ? '1px solid #A6FF00' : '1px solid #ffffff50';
    element.style.boxShadow = isActive ? '0 0 10px #A6FF0020, 0 0 20px #A6FF0020' : 'none';
  });
}

// Event listeners for detecting Command or Control key presses
document.addEventListener('keydown', (event) => {
  if (event.key === 'Meta' || event.key === 'Control') {
    applyCommandKeyStyle(true);
  }
});

document.addEventListener('keyup', (event) => {
  if (event.key === 'Meta' || event.key === 'Control') {
    applyCommandKeyStyle(false);
  }
});

// Create reusable copy function
function copyReviewToClipboard() {
  const htmlContent = localStorage.getItem("media_review");

  if (htmlContent) {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent;

    const htmlWithLineBreaks = tempDiv.innerHTML.replace(/<br\s*\/?>/gi, "\n");
    const plainText = htmlWithLineBreaks.replace(/<\/?[^>]+(>|$)/g, "");

    navigator.clipboard.writeText(plainText).then(() => {
      console.log("Text copied to clipboard!");
    }).catch(err => {
      console.error("Failed to copy text: ", err);
    });

    updateAlertText("Review text copied");
    showHideAlert();
  } else {
    console.log("No content found in localStorage for 'media_review'.");
  }
}

// Keyboard event listener
document.addEventListener("keydown", function (event) {
  if ((event.metaKey || event.ctrlKey) && event.shiftKey && event.code === "KeyC") {
    event.preventDefault();
    copyReviewToClipboard();
  }
});