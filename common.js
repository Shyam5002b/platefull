document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll("a");

    links.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // Prevents the default navigation immediately

            const href = this.getAttribute("href"); // Get the link's destination

            if (href && href !== "#") { // Ensure it's a valid link
                document.body.style.opacity = "0"; // Fade out effect
                setTimeout(() => {
                    window.location.href = href; // Navigate to the new page
                }, 50); // Wait 0.05 seconds before redirecting
            }
        });
    });

    // Ensure the page fades in when loaded
    document.body.style.opacity = "0";
    setTimeout(() => {
        document.body.style.opacity = "1";
    }, 10);
});

window.addEventListener('DOMContentLoaded', () => {
    const authSection = document.getElementById('auth-section');
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
        authSection.innerHTML = `
            <span style="color: white; font-weight: bold;">Welcome, ${user.username}</span>
            <button onclick="logout()" class="signup-button">Logout</button>
        `;
    }
});

function logout() {
    localStorage.removeItem('user');
    window.location.href = 'index.html'; // Redirect to landing or home
}

