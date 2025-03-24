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
document.getElementById('loginForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const regNo = document.getElementById('regno').value;
  const password = document.getElementById('pw').value;

  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ regNo, password })
    });

    if (!response.ok) {
      const errorMsg = await response.text();
      alert(errorMsg || 'Login failed');
      return;
    }

    // Here is where we get the token & user info from backend
    const data = await response.json();
    // Example response shape: { token, user: { fullName, email, regNo } }

    // 1) Store the token if you need it later
    localStorage.setItem('token', data.token);

    // 2) Store the user info. The code in homePage.html expects `username`.
    //    So let's store fullName as `username`.
    localStorage.setItem('user', JSON.stringify({ 
      username: data.user.fullName, 
      regNo: data.user.regNo,
      email: data.user.email
    }));

    // 3) Redirect to home
    window.location.href = 'homePage.html';
  } catch (error) {
    console.error('Login error:', error);
    alert('Something went wrong.');
  }
});


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
