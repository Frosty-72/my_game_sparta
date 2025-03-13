const registeredUsers = [
    { email: "user@example.com", password: "1234" },
    { email: "test@test.com", password: "password" }
];

document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const user = registeredUsers.find(user => user.email === email && user.password === password);

    const messageElement = document.getElementById("message");
    if (user) {
        messageElement.textContent = "Вход выполнен успешно!";
        messageElement.style.color = "green";
        window.location.href = "necr.html";
    } else {
        messageElement.textContent = "Неверный email или пароль.";
        messageElement.style.color = "red";
    }
});

document.getElementById("logoutButton").addEventListener("click", function () {
    window.location.href = "/index.html"; // Исправленный путь
});