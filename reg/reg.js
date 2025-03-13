const registeredUsers = [
    { email: "user@example.com", password: "1234" },
    { email: "test@test.com", password: "password" }
];

document.getElementById("registerForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        document.getElementById("message").textContent = "Пароли не совпадают!";
        return;
    }

    const userExists = registeredUsers.some(user => user.email === email);

    const messageElement = document.getElementById("message");
    if (userExists) {
        messageElement.textContent = "Вы уже зарегистрированы. Перенаправляем на страницу входа...";
        setTimeout(() => {
            window.location.href = "../enter.html"; // Путь к enter.html
        }, 2000);
    } else {
        registeredUsers.push({ email, password });
        messageElement.textContent = "Регистрация успешна! Перенаправляем в Некрополь...";
        setTimeout(() => {
            window.location.href = "../necr/necr.html"; // Путь к necr.html
        }, 2000);
    }
});