/**
 * Image Upload and Paste Handler
 * This script handles two main functionalities:
 * 1. Uploading images through a file input
 * 2. Pasting images directly from clipboard
 * 
 * Note: Includes size limit checks and compression for large images
 */

// Constants for image handling
const MAX_IMAGE_SIZE = 4 * 1024 * 1024; // 4MB limit
const STORAGE_KEY = "poster_image";

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
      if (file.size > MAX_IMAGE_SIZE) {
        compressImage(file, imageContainer);
      } else {
        processImageFile(file, imageContainer);
      }
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
 * Compresses an image using canvas
 * @param {File} file - The image file to compress
 * @param {HTMLElement} container - The container element to display the image
 */
function compressImage(file, container) {
  console.log('Compressing image...');
  const reader = new FileReader();
  reader.onload = (event) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // Calculate new dimensions while maintaining aspect ratio
      let width = img.width;
      let height = img.height;
      const maxDimension = 1200;

      if (width > height && width > maxDimension) {
        height = (height * maxDimension) / width;
        width = maxDimension;
      } else if (height > maxDimension) {
        width = (width * maxDimension) / height;
        height = maxDimension;
      }

      canvas.width = width;
      canvas.height = height;

      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height);
      const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7); // Adjust quality here (0.7 = 70% quality)

      try {
        updateImageDisplay(container, `url(${compressedDataUrl})`);
        saveImageToStorage(`url(${compressedDataUrl})`);
      } catch (error) {
        handleStorageError(error);
      }
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
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
    try {
      updateImageDisplay(container, imageUrl);
      saveImageToStorage(imageUrl);
    } catch (error) {
      handleStorageError(error);
    }
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
 * Handles storage-related errors
 * @param {Error} error - The error to handle
 */
function handleStorageError(error) {
  console.error('Storage error:', error);
  const alert = document.getElementById('alert');
  if (alert) {
    alert.textContent = 'Failed to save image. The image might be too large.';
    alert.style.display = 'flex';
  }
}

/**
 * Saves the image URL to localStorage
 * @param {string} imageUrl - The image URL to save
 */
function saveImageToStorage(imageUrl) {
  try {
    localStorage.setItem(STORAGE_KEY, imageUrl);
  } catch (error) {
    throw new Error('Storage quota exceeded');
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
      if (file.size > MAX_IMAGE_SIZE) {
        compressImage(file, document.getElementById('poster'));
      } else {
        convertPastedImageToBase64(file);
      }
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
    
    try {
      localStorage.setItem(STORAGE_KEY, imageForStorage);
      location.reload();
    } catch (error) {
      handleStorageError(error);
    }
  };
  
  reader.readAsDataURL(file);
}