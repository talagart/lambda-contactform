document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    // data from website
    var formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      subject: document.getElementById('subject').value,
      message: document.getElementById('message').value
    };

    // set URL of API Gateway
    var apiUrl = 'https://example';

    // send POST request to API Gateway
    fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify(formData), 
      headers: {
        'Content-Type': 'application/json' 
      }
    })
    .then(response => {
      if (response.ok) {
        // If the request was successful, clear the form and display a success message
        document.getElementById('sendmessage').classList.add('show');
        document.getElementById('errormessage').classList.remove('show');
        document.getElementById('contactForm').reset(); // Wyczyść formularz
      } else {
        // If an error occurred, display an error message
        document.getElementById('sendmessage').classList.remove('show');
        document.getElementById('errormessage').classList.add('show').textContent = 'Oops! Something went wrong. Please try again later.';
      }
    })
    .catch(error => {
      // In the case of a network error, display an error message
      document.getElementById('sendmessage').classList.remove('show');
      document.getElementById('errormessage').classList.add('show').textContent = 'Oops! Something went wrong. Please check your network connection and try again.';
    });
  });
});
