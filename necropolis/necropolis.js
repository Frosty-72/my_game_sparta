// Проверка авторизации
window.onload = function () {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  
    if (!currentUser) {
      // Если пользователь не авторизован, перенаправляем на страницу входа
      window.location.href = '../auth/auth.html';
    } else {
      // Отображаем имя пользователя
      document.getElementById('username').textContent = currentUser.username;
    }
  };
  
  // Выход из системы
  function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = '../auth/auth.html';
  }