let alertTimeout = null;

function showAlert(text, delayMs = 3000) {
  const $alert = $("#alert_clipboard");
  
  // Clear any pending animations
  $alert.stop(true, true).clearQueue();
  
  // If alert is visible, animate it away first
  if ($alert.css("opacity") > 0) {
    $alert.css({
      "top": "-40px",
      "transform": "scale(0.3)",
      "opacity": "0.0"
    }).promise().done(() => {
      // After hiding, show the new alert
      showNewAlert();
    });
  } else {
    showNewAlert();
  }

  function showNewAlert() {
    const alertSpan = document.querySelector('#alert_clipboard span');
    if (alertSpan) {
      alertSpan.textContent = text;
    }

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