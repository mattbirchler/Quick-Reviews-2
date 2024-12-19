/**
 * Handles image upload and paste functionality for screenshots
 * Supports both file upload and clipboard paste operations
 */

// Constants for DOM elements
const DOM_ELEMENTS = {
  imageUploader: 'screenshot-uploader',
  imageContainer: 'screenshot',
  alertElement: 'alert'
};

/**
 * Initializes the screenshot functionality when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', initializeScreenshotHandlers);

/**
 * Sets up event handlers for both file upload and paste
 */
function initializeScreenshotHandlers() {
  const imageUploader = document.getElementById(DOM_ELEMENTS.imageUploader);
  const imageContainer = document.getElementById(DOM_ELEMENTS.imageContainer);

  imageUploader.addEventListener('change', (event) => handleFileUpload(event, imageContainer));
  document.addEventListener('paste', handleImagePaste);
}

/**
 * Handles file upload events from the file input
 * @param {Event} event - The file change event
 * @param {HTMLElement} imageContainer - The container to display the image
 */
function handleFileUpload(event, imageContainer) {
  const file = event.target.files[0];
  
  if (!isValidImageFile(file)) return;
  
  const reader = new FileReader();
  reader.onload = (e) => processLoadedImage(e, imageContainer);
  reader.readAsDataURL(file);
}

/**
 * Checks if the file is a valid image
 * @param {File} file - The file to check
 * @returns {boolean} - True if valid image file
 */
function isValidImageFile(file) {
  return file && file.type.match('image.*');
}

/**
 * Processes the loaded image and updates the UI
 * @param {Event} event - The FileReader load event
 * @param {HTMLElement} imageContainer - The container to display the image
 */
function processLoadedImage(event, imageContainer) {
  const imageUrl = `url(${event.target.result})`;
  
  // Update the image container styles
  updateImageContainer(imageContainer, imageUrl);
  
  // Attempt to save to localStorage
  saveImageToStorage(imageUrl);
}

/**
 * Updates the image container with the new image
 * @param {HTMLElement} container - The image container element
 * @param {string} imageUrl - The image URL to display
 */
function updateImageContainer(container, imageUrl) {
  container.style.backgroundImage = imageUrl;
  container.style.backgroundSize = 'cover';
  container.style.backgroundPosition = 'center';
}

/**
 * Saves the image URL to localStorage
 * @param {string} imageUrl - The image URL to save
 */
function saveImageToStorage(imageUrl) {
  try {
    localStorage.setItem('screenshot_image', imageUrl);
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
    showAlert();
  }
}

/**
 * Shows the alert element when storage fails
 */
function showAlert() {
  $('#alert').css('display', 'flex');
}

/**
 * Handles paste events for images
 * @param {ClipboardEvent} event - The paste event
 */
function handleImagePaste(event) {
  const items = (event.clipboardData || event.originalEvent.clipboardData).items;
  
  for (const item of items) {
    if (item.type.indexOf('image') !== -1) {
      const file = item.getAsFile();
      const reader = new FileReader();
      reader.onload = function(event) {
        const dataURL = event.target.result;
        const base64 = dataURL.split(",")[1];
        console.log('Someone pasted an image:', base64);
        const imageForStorage = "url(data:image/jpeg;base64," + base64 + ")";
        localStorage.setItem("poster_image", imageForStorage);
        location.reload();
      };
      reader.readAsDataURL(file);
      break;
    }
  }
}
