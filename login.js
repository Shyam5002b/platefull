/**********************************************
 * SIGNUP HANDLER (signUpPage.html)
 **********************************************/
const signupForm = document.querySelector('.signup-container form');
if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Grab form values
    const fullName = signupForm.querySelector('input[placeholder="Full Name"]').value;
    const email = signupForm.querySelector('input[placeholder="VIT Email"]').value;
    const regNo = signupForm.querySelector('input[placeholder="Registration Number"]').value;
    const password = signupForm.querySelector('input[placeholder="Password"]').value;
    const confirmPassword = signupForm.querySelector('input[placeholder="Confirm Password"]').value;

    // Check password match
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      // Make POST request to /api/auth/register
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, regNo, password }),
      });

      if (response.ok) {
        alert('Signup successful! Please login.');
        // Redirect to login page
        window.location.href = 'loginPage.html';
      } else {
        const errorMsg = await response.text();
        alert(errorMsg || 'Signup failed');
      }
    } catch (err) {
      console.error('Error during signup:', err);
      alert('An error occurred while signing up.');
    }
  });
}

/**********************************************
 * LOGIN HANDLER (loginPage.html)
 **********************************************/
const loginForm = document.querySelector('.login-container form');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Grab form values
    const regNo = loginForm.querySelector('input[placeholder="Registration number"]').value;
    const password = loginForm.querySelector('input[placeholder="Password"]').value;

    try {
      // Make POST request to /api/auth/login
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ regNo, password }),
      });

      if (response.ok) {
        const data = await response.json();
        alert('Login successful!');

        // Store token in localStorage for future use
        localStorage.setItem('token', data.token);

        // Redirect to your homepage or dashboard
        window.location.href = 'homePage.html';
      } else {
        const errorMsg = await response.text();
        alert(errorMsg || 'Login failed');
      }
    } catch (err) {
      console.error('Error during login:', err);
      alert('An error occurred while logging in.');
    }
  });
}

/**********************************************
 * OPTIONAL: Show/Hide Password on login page
 **********************************************/
// If you want the "Show Password" checkbox to work:
const passCheckbox = document.getElementById('pass');
const passwordInput = document.getElementById('pw');
if (passCheckbox && passwordInput) {
  passCheckbox.addEventListener('change', () => {
    passwordInput.type = passCheckbox.checked ? 'text' : 'password';
  });
}
