
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded and ready for interaction!');
    
    // ========================================
    // THEME TOGGLE (Dark/Light Mode)
    // ========================================
    
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    /**
   
     */
    themeToggle.addEventListener('click', function() {
        // Toggle dark mode class on body element
        body.classList.toggle('dark-mode');
        
        // Update button text based on current theme
        // This shows how to modify element content dynamically
        if (body.classList.contains('dark-mode')) {
            themeToggle.textContent = '☀️ Light Mode';
        } else {
            themeToggle.textContent = '🌙 Dark Mode';
        }
    });

    // ========================================
    // PART 2: INTERACTIVE ELEMENTS - COUNTER GAME
    // ========================================
    
    // Counter game variables
    let counter = 0;
    const counterDisplay = document.getElementById('counterDisplay');
    const counterMessage = document.getElementById('counterMessage');
    const increaseBtn = document.getElementById('increaseBtn');
    const decreaseBtn = document.getElementById('decreaseBtn');
    const resetBtn = document.getElementById('resetBtn');

    /**
     * Function to update counter display and show contextual messages
     
     */
    function updateCounter() {
        // Update the display with current counter value
        counterDisplay.textContent = counter;
        
        // Show different messages based on counter value
        // This demonstrates how to provide dynamic user feedback
        if (counter === 0) {
            counterMessage.textContent = 'Starting point!';
        } else if (counter > 0 && counter <= 5) {
            counterMessage.textContent = 'Keep going up!';
        } else if (counter > 5) {
            counterMessage.textContent = 'You\'re on fire! 🔥';
        } else if (counter < 0 && counter >= -5) {
            counterMessage.textContent = 'Going down...';
        } else if (counter < -5) {
            counterMessage.textContent = 'That\'s quite negative! 📉';
        }
    }

    /**
     # Event listeners for counter buttons
     # These demonstrate multiple event handlers for similar functionality
     */
    increaseBtn.addEventListener('click', function() {
        counter++;
        updateCounter();
    });

    decreaseBtn.addEventListener('click', function() {
        counter--;
        updateCounter();
    });

    resetBtn.addEventListener('click', function() {
        counter = 0;
        updateCounter();
    });

    // ========================================
    // FAQ COLLAPSIBLE SECTIONS
    // ========================================
    
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    /**
     */
    faqQuestions.forEach(function(question) {
        question.addEventListener('click', function() {
            // Get the FAQ ID from data attribute
            const faqId = this.getAttribute('data-faq');
            const answer = document.getElementById('faq-' + faqId);
            const icon = this.querySelector('.faq-icon');
            
            // Toggle the active class on the answer (shows/hides content)
            answer.classList.toggle('active');
            
            // Rotate the icon to indicate open/closed state
            icon.classList.toggle('rotated');
        });
    });

    // ========================================
    // TABBED INTERFACE
    // ========================================
    
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    /**
     * Handle tab switching functionality
     * This demonstrates coordinated UI state management
     */
    tabButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and content
            // This ensures only one tab is active at a time
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById('tab-' + targetTab).classList.add('active');
        });
    });

    // ========================================
    // PART 3: FORM VALIDATION
    // ========================================
    
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');

    /**
     * VALIDATION FUNCTIONS
     * These functions check if input meets specific requirements
     * They return null if valid, or an error message if invalid
     */
    
    /**
     * Validate name field
     * Requirements: At least 2 characters, only letters and spaces
     */
    function validateName(name) {
        if (name.length < 2) {
            return 'Name must be at least 2 characters long';
        }
        // Regular expression to check for only letters and spaces
        if (!/^[a-zA-Z\s]+$/.test(name)) {
            return 'Name can only contain letters and spaces';
        }
        return null; // No error
    }

    /**
     * Validate email field
    
     */
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return 'Please enter a valid email address';
        }
        return null;
    }

    /**
     * Validate phone field (optional)
     * Only validates if a phone number is provided
     */
    function validatePhone(phone) {
        if (phone.length > 0) { // Only validate if phone is provided
            // Remove common formatting characters for validation
            const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(cleanPhone)) {
                return 'Please enter a valid phone number';
            }
        }
        return null;
    }

    /**
     #Validate password field
     * Requirements: At least 8 characters, must contain uppercase, lowercase, and number
     */
    function validatePassword(password) {
        if (password.length < 8) {
            return 'Password must be at least 8 characters long';
        }
        // Check for at least one lowercase, one uppercase, and one digit
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
            return 'Password must contain uppercase, lowercase, and number';
        }
        return null;
    }

    /**
     # Function to show validation feedback to the user
     # This provides immediate visual feedback about input validity
     */
    function showValidation(fieldName, isValid, message) {
        const errorElement = document.getElementById(fieldName + 'Error');
        const successElement = document.getElementById(fieldName + 'Success');
        
        if (isValid) {
            // Hide error, show success message
            errorElement.style.display = 'none';
            successElement.textContent = '✓ Looks good!';
            successElement.style.display = 'block';
        } else {
            // Hide success, show error message
            successElement.style.display = 'none';
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }

    /**
     # REAL-TIME VALIDATION
     * These event listeners provide immediate feedback as users type
     * Using 'keyup' event to validate after each keystroke
     */
    
    document.getElementById('name').addEventListener('keyup', function() {
        const error = validateName(this.value);
        showValidation('name', !error, error);
    });

    document.getElementById('email').addEventListener('keyup', function() {
        const error = validateEmail(this.value);
        showValidation('email', !error, error);
    });

    document.getElementById('phone').addEventListener('keyup', function() {
        const error = validatePhone(this.value);
        showValidation('phone', !error, error);
    });

    document.getElementById('password').addEventListener('keyup', function() {
        const error = validatePassword(this.value);
        showValidation('password', !error, error);
    });

    /**
     * FORM SUBMISSION HANDLING
     * This is where we prevent invalid form submissions
     * and provide comprehensive feedback to the user
     */
    contactForm.addEventListener('submit', function(e) {
        // Prevent default form submission behavior
        e.preventDefault();
        
        // Get all form values and trim whitespace
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            password: document.getElementById('password').value,
            message: document.getElementById('message').value.trim()
        };

        // Validate all required fields
        const errors = [];
        
        // Check each field and collect any errors
        const nameError = validateName(formData.name);
        if (nameError) errors.push('Name: ' + nameError);
        
        const emailError = validateEmail(formData.email);
        if (emailError) errors.push('Email: ' + emailError);
        
        const phoneError = validatePhone(formData.phone);
        if (phoneError) errors.push('Phone: ' + phoneError);
        
        const passwordError = validatePassword(formData.password);
        if (passwordError) errors.push('Password: ' + passwordError);

        // Display results to user
        if (errors.length > 0) {
            // Show error feedback
            formFeedback.className = 'form-feedback error';
            formFeedback.innerHTML = '<strong>Please fix these errors:</strong><br>' + errors.join('<br>');
        } else {
            // Show success feedback
            formFeedback.className = 'form-feedback success';
            formFeedback.innerHTML = '<strong>Success!</strong> Form submitted successfully! In a real application, this data would be sent to a server.';
            
            // Reset form after successful submission
            setTimeout(() => {
                contactForm.reset();
                // Hide all validation messages
                document.querySelectorAll('.error, .success').forEach(el => el.style.display = 'none');
                formFeedback.style.display = 'none';
            }, 3000);
        
    });

  
