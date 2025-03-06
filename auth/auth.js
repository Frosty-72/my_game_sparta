// Переключение между вкладками
function switchTab(tabName) {
    document.querySelectorAll('.tab-button').forEach(button => button.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
  
    document.querySelector(`button[onclick="switchTab('${tabName}')"]`).classList.add('active');
    document.getElementById(`${tabName}-form`).classList.add('active');
  }
  
  // Регистрация нового пользователя
  function register() {
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
  
    if (!username || !email || !password) {
      document.getElementById('register-message').textContent = 'Все поля обязательны!';
      return;
    }
  
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find(user => user.username === username || user.email === email);
  
    if (existingUser) {
      document.getElementById('register-message').textContent = 'Имя пользователя или email уже заняты.';
      return;
    }
  
    const newUser = { username, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
  
    document.getElementById('register-message').textContent = 'Регистрация успешна!';
    setTimeout(() => window.location.href = '../necropolis/necropolis.html', 1000);
  }
  
  // Вход пользователя
  function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
  
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);
  
    if (!user) {
      document.getElementById('login-message').textContent = 'Неверное имя пользователя или пароль.';
      return;
    }
  
    // Сохраняем данные текущего пользователя в localStorage
    localStorage.setItem('currentUser', JSON.stringify(user));
  
    document.getElementById('login-message').textContent = 'Вход выполнен успешно!';
    setTimeout(() => window.location.href = '../necropolis/necropolis.html', 1000);
  }