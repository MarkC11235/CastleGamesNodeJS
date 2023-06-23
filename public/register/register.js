const form = document.querySelector('form');
const message = document.getElementById('message');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let username = form.username.value;
    let password = form.password.value;
    let email = form.email.value;
    const response = await fetch('/register', {
        method: 'POST',
        body: JSON.stringify({
            username: username,
            password: password,
            email: email
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const result = await response.json();
    if (response.ok) {
        window.location.href = result.redirectUrl;
    } else {
        message.innerHTML = result.message;
    }
});