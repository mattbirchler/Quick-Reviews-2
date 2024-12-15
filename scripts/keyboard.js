window.addEventListener('keydown', function (event) {
  // Check if the 'Command' key is pressed on Mac, or the 'Ctrl' key on other systems
  const commandKeyPressed = event.metaKey || event.ctrlKey;

  // Check if the 'E' key is pressed
  const exportKeyPressed = event.key === 'S' || event.key === 's';
  const editKeyPressed = event.key === 'E' || event.key === 'e';
  const enterKeyPressed = event.key === 'Enter' || event.key === 'enter';


  // If both conditions are met, call exportImageShortcut
  if (commandKeyPressed && exportKeyPressed) {
    // Prevent the default browser behavior, such as opening the search prompt
    event.preventDefault();

    exportImageShortcut();
  }

  if (event.shiftKey && event.key === 'ArrowUp') {
    // Get the review text element
    const reviewText = document.getElementById("text");
    // Get the input field for the text size
  const textSizeInput = document.getElementById("text_size_review");
    // Get the current font size
    const currentFontSize = window.getComputedStyle(reviewText).fontSize;
    // Parse the font size and increment it by 1
    const newFontSize = parseFloat(currentFontSize) + 1;
    // Apply the new font size back to the element
    reviewText.style.fontSize = `${newFontSize}px`;
    // Update the input field value
  textSizeInput.value = newFontSize;
  }
  if (event.shiftKey && event.key === 'ArrowDown') {
    // Get the review text element
    const reviewText = document.getElementById("text");
    // Get the input field for the text size
  const textSizeInput = document.getElementById("text_size_review");
    // Get the current font size
    const currentFontSize = window.getComputedStyle(reviewText).fontSize;
    // Parse the font size and increment it by 1
    const newFontSize = parseFloat(currentFontSize) - 1;
    // Apply the new font size back to the element
    reviewText.style.fontSize = `${newFontSize}px`;
    // Update the input field value
  textSizeInput.value = newFontSize;
  }
  if (event.shiftKey && (event.key === "ArrowRight" || event.key === "ArrowLeft")) {
    if ($(window).width() < 600) {
      localStorage.setItem("text_size_review", "9");
      $("#text").css("font-size", "9px");
      $("#text_size_review").val("9");
    } else {
      localStorage.setItem("text_size_review", "26");
      $("#text").css("font-size", "26px");
      $("#text_size_review").val("26");
    }
  }
  if (event.key === 'Escape' || event.keyCode === 27) {
    $('#close_modal').click();
  }
  if (commandKeyPressed && event.key === '1') {
    event.preventDefault();
    $('#poor').click();
  }
  if (commandKeyPressed && event.key === '2') {
    event.preventDefault();
    $('#solid').click();
  }
  if (commandKeyPressed && event.key === '3') {
    event.preventDefault();
    $('#good').click();
  }
  if (commandKeyPressed && event.key === '4') {
    event.preventDefault();
    $('#great').click();
  }
  if (commandKeyPressed && editKeyPressed) {
    event.preventDefault();
    $('#edit_title').click();
  }
  if (commandKeyPressed && enterKeyPressed) {
    event.preventDefault();
    saveData();
    $('#close_modal').click();
  }
});