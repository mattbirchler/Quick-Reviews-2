document.addEventListener('DOMContentLoaded', () => {
  const imageUploader = document.getElementById('screenshot-uploader');
  const imageContainer = document.getElementById('screenshot');

  imageUploader.addEventListener('change', (event) => {
    const file = event.target.files[0];
    
    if (file && file.type.match('image.*')) {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        var the_url = imageContainer.style.backgroundImage = `url(${e.target.result})`;
        imageContainer.style.backgroundSize = 'cover';
        imageContainer.style.backgroundPosition = 'center';
        try {
          localStorage.setItem("screenshot_image", the_url);
        } catch (e) {
          // Handle the error here
          console.log('Setting local storage failed');
          // Do something else, like using cookies or session storage
          $("#alert").css("display", "flex");
        }
        
      };
      
      reader.readAsDataURL(file);
    }
  });
});

document.addEventListener('paste', function(event) {
  var items = (event.clipboardData || event.originalEvent.clipboardData).items;
  for (var i = 0; i < items.length; i++) {
    if (items[i].type.indexOf("image") !== -1) {
      var file = items[i].getAsFile();
      var reader = new FileReader();
      reader.onload = function(event) {
        var dataURL = event.target.result;
        var base64 = dataURL.split(",")[1];
        console.log('Someone pasted an image:', base64);
        var imageForStorage = "url(data:image/jpeg;base64," + base64 + ")";
        localStorage.setItem("poster_image", imageForStorage);
        location.reload();
      };
      reader.readAsDataURL(file);
      break;
    }
  }
});
