document.addEventListener('DOMContentLoaded', () => {
    const openModalBtn = document.getElementById('edit_title');
    const closeModalBtn = document.getElementById('close_modal');
    const modal = document.getElementById('modal');
    const textArea = document.getElementById('review_text');

    openModalBtn.addEventListener('click', () => {
        var reviewText = localStorage.getItem('media_review');
        var convertedText = reviewText.split("<br/>").join("\n");
        modal.style.display = 'block';
        $('#modal_text_title').val(localStorage.getItem('media_title')).focus();
        $('#modal_text_meta').val(localStorage.getItem('media_meta'));
        $('#modal_text_text').val(convertedText);
    });

    textArea.addEventListener('click', () => {
        var reviewText = localStorage.getItem('media_review');
        var convertedText = reviewText.split("<br/>").join("\n");
        modal.style.display = 'block';
        $('#modal_text_title').val(localStorage.getItem('media_title')).focus();
        $('#modal_text_meta').val(localStorage.getItem('media_meta'));
        $('#modal_text_text').val(convertedText);
    });

    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});