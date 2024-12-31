function updateAlertText(value) {
    const alertSpan = document.querySelector('#alert_clipboard span');
    if (alertSpan) {
        alertSpan.textContent = value;
    }
}

function showHideAlert(delayMs = 3000) {
  if (!navigator.userAgent.includes('Safari') || navigator.userAgent.includes('Chrome')) {
    $("#alert_clipboard")
      .css({
        "top": "20px",
        "transform": "scale(1)",
        "opacity": "1.0"
      })
      .delay(delayMs)
      .queue(function() {
        $(this)
          .css({
            "top": "-40px",
            "transform": "scale(0.3)",
            "opacity": "0.0"
          })
          .dequeue();
      });
  }
}