document.addEventListener('DOMContentLoaded', () => {
  const imageUploader = document.getElementById('image-uploader');
  const imageContainer = document.getElementById('poster');

  imageUploader.addEventListener('change', (event) => {
    const file = event.target.files[0];
    
    if (file && file.type.match('image.*')) {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        var the_url = imageContainer.style.backgroundImage = `url(${e.target.result})`;
        imageContainer.style.backgroundSize = 'cover';
        imageContainer.style.backgroundPosition = 'center';
        localStorage.setItem("poster_image", the_url);
      };
      
      reader.readAsDataURL(file);
    }
  });
});