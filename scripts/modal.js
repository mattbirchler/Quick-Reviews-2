/**
 * Modal Handler for Media Review Editor
 * Manages the opening, closing, and population of a modal form for editing media reviews.
 * The modal can be triggered by either clicking an edit button or the review text area.
 * Press ESC key to close the modal without saving changes.
 */
document.addEventListener('DOMContentLoaded', () => {
    // DOM element references
    const elements = {
        modal: document.getElementById('modal'),
        openModalBtn: document.getElementById('edit_title'),
        closeModalBtn: document.getElementById('close_modal'),
        textArea: document.getElementById('review_text')
    };

    /**
     * Opens the modal and populates it with data from localStorage
     * Converts line breaks from HTML (<br/>) to newline characters
     */
    const openModal = () => {
        // Convert HTML line breaks to newlines for textarea
        const reviewText = localStorage.getItem('media_review').split("<br/>").join("\n");
        
        // Display modal and populate form fields
        elements.modal.style.display = 'block';
        
        // Using jQuery to set values and focus
        $('#modal_text_title')
            .val(localStorage.getItem('media_title'))
            .focus();
        $('#modal_text_meta')
            .val(localStorage.getItem('media_meta'));
        $('#modal_text_text')
            .val(reviewText);
    };

    /**
     * Closes the modal by setting its display style to 'none'
     */
    const closeModal = () => {
        elements.modal.style.display = 'none';
        document.querySelector('#review_text').focus();
    };

    /**
     * Event handler for clicks outside the modal
     * Closes the modal if the click target is the modal backdrop
     */
    const handleOutsideClick = (event) => {
        if (event.target === elements.modal) {
            closeModal();
        }
    };

    /**
     * Event handler for keyboard events
     * Closes the modal when the Escape key is pressed
     */
    const handleKeyPress = (event) => {
        if (event.key === 'Escape') {
            closeModal();
        }
    };

    // Event listeners
    elements.openModalBtn.addEventListener('click', openModal);
    elements.textArea.addEventListener('click', openModal);
    elements.closeModalBtn.addEventListener('click', closeModal);
    window.addEventListener('click', handleOutsideClick);
    document.addEventListener('keydown', handleKeyPress);
});