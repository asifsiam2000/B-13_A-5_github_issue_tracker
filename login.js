document.getElementById('login-btn').addEventListener('click', function () {
    const inputPassword = document.getElementById('input-password');
    const inputUsername = document.getElementById('input-username');

    const password = inputPassword.value;
    const username = inputUsername.value;

    if (password === 'admin123' && username === 'admin') {
        alert("Login Successfully");
        window.location.assign("./home.html");
    }
    else {
        alert("Login Failed ??");
        return;
    }

});