/**
 * Auth.js - Modern Authentication Interface Handler
 * Pulse ECE Club Authentication System
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing auth interface...');
    initializeAuthInterface();
});

/**
 * Initialize the authentication interface
 */
function initializeAuthInterface() {
    // Get DOM elements
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('auth-container');
    const forms = document.querySelectorAll('form');
    
    console.log('Auth elements found:', {
        signUpButton: !!signUpButton,
        signInButton: !!signInButton,
        container: !!container,
        formsCount: forms.length
    });
    
    // Initialize event listeners
    setupPanelSwitching(signUpButton, signInButton, container);
    setupFormValidation(forms);
    setupFormSubmission();
    setupPasswordToggle();
    setupFormEnhancements();
    
    // Show any existing alerts
    showExistingAlerts();
    
    // Focus management
    setupFocusManagement();
    
    console.log('Auth interface initialized successfully');
}

/**
 * Setup panel switching animation
 */
function setupPanelSwitching(signUpButton, signInButton, container) {
    // Handle main overlay buttons
    if (signUpButton) {
        signUpButton.addEventListener('click', () => {
            container.classList.add('right-panel-active');
            // Focus on first input of sign up form
            setTimeout(() => {
                const firstInput = document.querySelector('.sign-up-container input');
                if (firstInput) firstInput.focus();
            }, 600);
        });
    }
    
    if (signInButton) {
        signInButton.addEventListener('click', () => {
            container.classList.remove('right-panel-active');
            // Focus on first input of sign in form
            setTimeout(() => {
                const firstInput = document.querySelector('.sign-in-container input');
                if (firstInput) firstInput.focus();
            }, 600);
        });
    }
    
    // Handle text link switching
    const switchToSignUp = document.getElementById('switchToSignUp');
    const switchToSignIn = document.getElementById('switchToSignIn');
    
    if (switchToSignUp) {
        switchToSignUp.addEventListener('click', (e) => {
            e.preventDefault();
            container.classList.add('right-panel-active');
            setTimeout(() => {
                const firstInput = document.querySelector('.sign-up-container input');
                if (firstInput) firstInput.focus();
            }, 600);
        });
    }
    
    if (switchToSignIn) {
        switchToSignIn.addEventListener('click', (e) => {
            e.preventDefault();
            container.classList.remove('right-panel-active');
            setTimeout(() => {
                const firstInput = document.querySelector('.sign-in-container input');
                if (firstInput) firstInput.focus();
            }, 600);
        });
    }
}

/**
 * Setup form validation
 */
function setupFormValidation(forms) {
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, select');
        
        inputs.forEach(input => {
            // Real-time validation
            input.addEventListener('input', function() {
                validateField(this);
            });
            
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            // Remove validation styling on focus
            input.addEventListener('focus', function() {
                clearFieldValidation(this);
            });
        });
        
        // Form submission validation
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
                showAlert('Please fill in all required fields correctly.', 'error');
            }
        });
    });
}

/**
 * Validate individual field
 */
function validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type || field.tagName.toLowerCase();
    let isValid = true;
    let errorMessage = '';
    
    // Check if field is required and empty
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    }
    
    // Specific validations based on field type/name
    if (value && isValid) {
        switch (field.name) {
            case 'email':
                isValid = validateEmail(value);
                errorMessage = isValid ? '' : 'Please enter a valid email address';
                break;
                
            case 'password':
                isValid = validatePassword(value);
                errorMessage = isValid ? '' : 'Password must be at least 8 characters long';
                break;
                
            case 'confirmPassword':
                const password = field.form.querySelector('input[name="password"]');
                isValid = password && value === password.value;
                errorMessage = isValid ? '' : 'Passwords do not match';
                break;
                
            case 'rollNumber':
                isValid = validateRollNumber(value);
                errorMessage = isValid ? '' : 'Please enter a valid roll number (e.g., 22002100XX)';
                break;
                
            case 'phoneNumber':
                isValid = validatePhoneNumber(value);
                errorMessage = isValid ? '' : 'Please enter a valid 10-digit phone number';
                break;
                
            case 'name':
                isValid = validateName(value);
                errorMessage = isValid ? '' : 'Name should contain only letters and spaces';
                break;
        }
    }
    
    // Apply validation styling
    if (!isValid) {
        addFieldError(field, errorMessage);
    } else {
        removeFieldError(field);
    }
    
    return isValid;
}

/**
 * Validate entire form
 */
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required]');
    let isFormValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isFormValid = false;
        }
    });
    
    return isFormValid;
}

/**
 * Email validation
 */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Password validation
 */
function validatePassword(password) {
    return password.length >= 8;
}

/**
 * Roll number validation
 */
function validateRollNumber(rollNumber) {
    // Matches format like: 22002100XX, 23002100XX, etc.
    const rollRegex = /^(22|23|24|25)\d{8}$/;
    return rollRegex.test(rollNumber);
}

/**
 * Phone number validation
 */
function validatePhoneNumber(phone) {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
}

/**
 * Name validation
 */
function validateName(name) {
    const nameRegex = /^[a-zA-Z\s]{2,}$/;
    return nameRegex.test(name);
}

/**
 * Add error styling to field
 */
function addFieldError(field, message) {
    field.style.borderColor = '#ef4444';
    field.style.backgroundColor = '#fef2f2';
    
    // Remove existing error message
    removeFieldError(field);
    
    // Add error message
    if (message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.style.cssText = `
            color: #ef4444;
            font-size: 12px;
            margin-top: 4px;
            margin-left: 4px;
        `;
        errorDiv.textContent = message;
        
        field.parentNode.appendChild(errorDiv);
    }
}

/**
 * Remove error styling from field
 */
function removeFieldError(field) {
    field.style.borderColor = '';
    field.style.backgroundColor = '';
    
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

/**
 * Clear field validation styling
 */
function clearFieldValidation(field) {
    field.style.borderColor = '';
    field.style.backgroundColor = '';
}

/**
 * Setup form submission handling
 */
function setupFormSubmission() {
    const forms = document.querySelectorAll('form');
    console.log('Setting up form submission for', forms.length, 'forms');
    
    forms.forEach((form, index) => {
        console.log(`Setting up form ${index}:`, form.id);
        form.addEventListener('submit', async function(e) {
            e.preventDefault(); // Prevent default form submission
            console.log('Form submitted:', this.id);
            
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton ? submitButton.textContent : '';
            
            // Add loading state
            if (submitButton) {
                submitButton.classList.add('loading');
                submitButton.disabled = true;
                submitButton.textContent = 'Loading...';
            }
            
            try {
                // Get form data
                const formData = new FormData(this);
                const data = {};
                for (let [key, value] of formData.entries()) {
                    data[key] = value;
                }
                
                console.log('Form data:', data);
                
                // Submit form via AJAX
                console.log('Submitting to:', this.action);
                const response = await fetch(this.action, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });
                
                console.log('Response status:', response.status);
                const result = await response.json();
                console.log('Response data:', result);
                
                if (result.status === 'Success') {
                    // Show success message
                    showAlert('Login successful! Redirecting...', 'success', 2000);
                    
                    // Redirect based on form type
                    setTimeout(() => {
                        if (this.id === 'signinForm') {
                            // Check user role and redirect accordingly
                            if (result.user && result.user.role === 'admin') {
                                console.log('Redirecting admin to /admin');
                                window.location.href = '/admin';
                            } else {
                                console.log('Redirecting user to /profile');
                                window.location.href = '/profile';
                            }
                        } else if (this.id === 'signupForm') {
                            showAlert('Account created successfully! Please sign in.', 'success');
                            // Switch to sign in form
                            const container = document.getElementById('auth-container');
                            container.classList.remove('right-panel-active');
                        }
                    }, 1500);
                } else {
                    // Show error message
                    showAlert(result.error || result.message || 'An error occurred', 'error');
                }
                
            } catch (error) {
                console.error('Form submission error:', error);
                showAlert('Network error. Please try again.', 'error');
            } finally {
                // Reset button state
                if (submitButton) {
                    submitButton.classList.remove('loading');
                    submitButton.disabled = false;
                    submitButton.textContent = originalText;
                }
            }
        });
    });
}

/**
 * Setup password toggle functionality
 */
function setupPasswordToggle() {
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    
    passwordInputs.forEach(input => {
        const toggleButton = document.createElement('button');
        toggleButton.type = 'button';
        toggleButton.className = 'password-toggle';
        toggleButton.innerHTML = '👁️';
        toggleButton.style.cssText = `
            position: absolute;
            right: 12px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            cursor: pointer;
            font-size: 16px;
            opacity: 0.6;
            transition: opacity 0.3s ease;
        `;
        
        // Make parent relative
        input.parentNode.style.position = 'relative';
        input.style.paddingRight = '40px';
        
        // Add toggle button
        input.parentNode.appendChild(toggleButton);
        
        toggleButton.addEventListener('click', function() {
            if (input.type === 'password') {
                input.type = 'text';
                this.innerHTML = '🙈';
            } else {
                input.type = 'password';
                this.innerHTML = '👁️';
            }
        });
        
        toggleButton.addEventListener('mouseenter', function() {
            this.style.opacity = '1';
        });
        
        toggleButton.addEventListener('mouseleave', function() {
            this.style.opacity = '0.6';
        });
    });
}

/**
 * Setup form enhancements
 */
function setupFormEnhancements() {
    // Auto-format roll number
    const rollNumberInputs = document.querySelectorAll('input[name="rollNumber"]');
    rollNumberInputs.forEach(input => {
        input.addEventListener('input', function() {
            // Remove non-numeric characters
            this.value = this.value.replace(/\D/g, '');
            
            // Limit to 10 digits
            if (this.value.length > 10) {
                this.value = this.value.substring(0, 10);
            }
        });
    });
    
    // Auto-format phone number
    const phoneInputs = document.querySelectorAll('input[name="phoneNumber"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function() {
            // Remove non-numeric characters
            this.value = this.value.replace(/\D/g, '');
            
            // Limit to 10 digits
            if (this.value.length > 10) {
                this.value = this.value.substring(0, 10);
            }
        });
    });
    
    // Capitalize name inputs
    const nameInputs = document.querySelectorAll('input[name="name"]');
    nameInputs.forEach(input => {
        input.addEventListener('input', function() {
            this.value = this.value.replace(/\b\w/g, l => l.toUpperCase());
        });
    });
    
    // Email to lowercase
    const emailInputs = document.querySelectorAll('input[name="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('input', function() {
            this.value = this.value.toLowerCase();
        });
    });
}

/**
 * Show alert message
 */
function showAlert(message, type = 'info', duration = 5000) {
    const alertContainer = document.querySelector('.alert-container') || createAlertContainer();
    
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" style="background: none; border: none; font-size: 18px; cursor: pointer; margin-left: auto;">×</button>
    `;
    
    alertContainer.appendChild(alert);
    
    // Show alert
    setTimeout(() => alert.classList.add('show'), 100);
    
    // Auto-remove after duration
    setTimeout(() => {
        alert.style.animation = 'slideOutRight 0.5s ease-in';
        setTimeout(() => alert.remove(), 500);
    }, duration);
}

/**
 * Create alert container if it doesn't exist
 */
function createAlertContainer() {
    const container = document.createElement('div');
    container.className = 'alert-container';
    document.body.appendChild(container);
    return container;
}

/**
 * Show existing alerts from URL parameters or server
 */
function showExistingAlerts() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Check for error messages
    const error = urlParams.get('error');
    if (error) {
        showAlert(decodeURIComponent(error), 'error');
    }
    
    // Check for success messages
    const success = urlParams.get('success');
    if (success) {
        showAlert(decodeURIComponent(success), 'success');
    }
    
    // Check for server-side flash messages
    const flashMessages = document.querySelectorAll('.flash-message');
    flashMessages.forEach(flash => {
        const type = flash.classList.contains('error') ? 'error' : 'success';
        showAlert(flash.textContent, type);
        flash.remove();
    });
}

/**
 * Setup focus management for accessibility
 */
function setupFocusManagement() {
    // Focus on first input when page loads
    setTimeout(() => {
        const firstInput = document.querySelector('.sign-in-container input');
        if (firstInput) firstInput.focus();
    }, 300);
    
    // Keyboard navigation for buttons
    const buttons = document.querySelectorAll('.ghost-btn, .auth-btn');
    buttons.forEach(button => {
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

/**
 * Utility function to debounce events
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Handle form data collection
 */
function getFormData(form) {
    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    return data;
}

/**
 * Handle responsive behavior
 */
function handleResponsiveBehavior() {
    const container = document.getElementById('auth-container');
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
        // Mobile-specific behavior
        container.classList.add('mobile');
    } else {
        container.classList.remove('mobile');
    }
}

// Listen for window resize
window.addEventListener('resize', debounce(handleResponsiveBehavior, 300));

// Initialize responsive behavior
handleResponsiveBehavior();

// Export functions for external use
window.AuthInterface = {
    showAlert,
    validateForm,
    validateField,
    getFormData
};
