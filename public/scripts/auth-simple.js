// Simple auth handler
console.log('Auth script loaded');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM ready');
    
    // Handle form submissions
    const signinForm = document.getElementById('signinForm');
    const signupForm = document.getElementById('signupForm');
    
    if (signinForm) {
        signinForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            console.log('Signin form submitted');
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            try {
                const response = await fetch('/signin', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                
                const result = await response.json();
                console.log('Signin result:', result);
                
                if (result.status === 'Success') {
                    alert('Login successful!');
                    if (result.user.role === 'admin') {
                        window.location.href = '/admin';
                    } else {
                        window.location.href = '/profile';
                    }
                } else {
                    alert('Error: ' + (result.error || 'Login failed'));
                }
            } catch (error) {
                console.error('Signin error:', error);
                alert('Network error');
            }
        });
    }
    
    if (signupForm) {
        signupForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            console.log('Signup form submitted');
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            try {
                const response = await fetch('/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                
                const result = await response.json();
                console.log('Signup result:', result);
                
                if (result.status === 'Success') {
                    alert('Account created! Please sign in.');
                    // Switch to signin
                    document.getElementById('auth-container').classList.remove('right-panel-active');
                } else {
                    alert('Error: ' + (result.error || 'Signup failed'));
                }
            } catch (error) {
                console.error('Signup error:', error);
                alert('Network error');
            }
        });
    }
    
    // Handle panel switching
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('auth-container');
    
    if (signUpButton && container) {
        signUpButton.addEventListener('click', () => {
            container.classList.add('right-panel-active');
        });
    }
    
    if (signInButton && container) {
        signInButton.addEventListener('click', () => {
            container.classList.remove('right-panel-active');
        });
    }
});
