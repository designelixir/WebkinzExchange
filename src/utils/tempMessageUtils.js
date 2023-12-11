// tempMessageUtils.js

export function showTempMessage(message) {
    // Get the "indicatorMessage" div
    const indicatorMessageDiv = document.getElementById('indicatorWindow');
  
    // Create a new div with the specified message and class
    const tempMessageDiv = document.createElement('div');
    tempMessageDiv.className = 'temp-message';
    tempMessageDiv.textContent = message;
  
    // Append the new div to the "indicatorMessage" div
    indicatorMessageDiv.appendChild(tempMessageDiv);
  
    // After 4 seconds, fade out the message and remove it
    setTimeout(() => {
      tempMessageDiv.classList.add('fade-out');
      setTimeout(() => {
        indicatorMessageDiv.removeChild(tempMessageDiv);
      }, 500); // Assuming the fade-out animation takes 0.5 seconds
    }, 4000); // Display the message for 4 seconds
  }
  