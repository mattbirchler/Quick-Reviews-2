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