/**
 * Image Upload and Paste Handler
 * This script handles two main functionalities:
 * 1. Uploading images through a file input
 * 2. Pasting images directly from clipboard
 */

// Wait for the DOM to be fully loaded before running
document.addEventListener('DOMContentLoaded', initializeImageUploader);

// Handle image paste events globally
document.addEventListener('paste', handleImagePaste);

/**
 * Initializes the image uploader functionality
 */
function initializeImageUploader() {
  const imageUploader = document.getElementById('image-uploader');
  const imageContainer = document.getElementById('poster');

  imageUploader.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (isValidImageFile(file)) {
      processImageFile(file, imageContainer);
    }
  });
}

/**
 * Checks if the file is a valid image
 * @param {File} file - The file to check
 * @returns {boolean} - Whether the file is a valid image
 */
function isValidImageFile(file) {
  return file && file.type.match('image.*');
}

/**
 * Processes an image file and updates the UI
 * @param {File} file - The image file to process
 * @param {HTMLElement} container - The container element to display the image
 */
function processImageFile(file, container) {
  const reader = new FileReader();
  
  reader.onload = (event) => {
    const imageUrl = `url(${event.target.result})`;
    updateImageDisplay(container, imageUrl);
    saveImageToStorage(imageUrl);
  };
  
  reader.readAsDataURL(file);
}

/**
 * Updates the image display in the container
 * @param {HTMLElement} container - The container element
 * @param {string} imageUrl - The image URL to display
 */
function updateImageDisplay(container, imageUrl) {
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
    localStorage.setItem("poster_image", imageUrl);
  } catch (error) {
    console.log('Setting local storage failed:', error);
    // Show alert to user
    document.getElementById('alert').style.display = 'flex';
  }
}

/**
 * Handles image paste events from clipboard
 * @param {ClipboardEvent} event - The paste event
 */
function handleImagePaste(event) {
  const clipboardData = event.clipboardData || event.originalEvent.clipboardData;
  const items = clipboardData.items;

  for (const item of items) {
    if (item.type.indexOf("image") !== -1) {
      const file = item.getAsFile();
      convertPastedImageToBase64(file);
      break;
    }
  }
}

/**
 * Converts a pasted image file to base64 and saves it
 * @param {File} file - The image file from clipboard
 */
function convertPastedImageToBase64(file) {
  const reader = new FileReader();
  
  reader.onload = (event) => {
    const dataURL = event.target.result;
    const base64 = dataURL.split(",")[1];
    const imageForStorage = `url(data:image/jpeg;base64,${base64})`;
    
    localStorage.setItem("poster_image", imageForStorage);
    location.reload();
  };
  
  reader.readAsDataURL(file);
}