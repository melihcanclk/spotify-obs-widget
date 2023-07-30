const loginButton = document.getElementById('login-button');

loginButton.addEventListener('click', async () => {
    // redirect to /login endpoint
    window.location.href = '/login';
});
