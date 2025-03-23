document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form elements
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Validation flags
        let isValid = true;
        
        // Name validation (minimum 3 characters)
        if (name.length < 3) {
            alert('Error: Name must be at least 3 characters long');
            isValid = false;
        }
        
        // Email validation using regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Error: Please enter a valid email address');
            isValid = false;
        }
        
        // Password validation (minimum 8 characters)
        if (password.length < 8) {
            alert('Error: Password must be at least 8 characters long');
            isValid = false;
        }
        
        // If all validations pass
        if (isValid) {
            alert('Form submitted successfully!');
            form.reset();
        }
    });
});