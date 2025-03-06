// Логин и пароль для админки
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

// Проверка входа
document.getElementById('admin-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    document.getElementById('admin-form').style.display = 'none';
    document.getElementById('admin-panel').style.display = 'block';
    loadPlayerData();
  } else {
    alert('Неверный логин или пароль!');
  }
});

// Загрузка данных игрока
function loadPlayerData() {
  const player = JSON.parse(localStorage.getItem('playerData')) || {
    level: 1,
    health: 150,
    maxHealth: 150,
    minDamage: 10,
    maxDamage: 15,
    exp: 0,
  };

  document.getElementById('level').value = player.level;
  document.getElementById('health').value = player.health;
  document.getElementById('minDamage').value = player.minDamage;
  document.getElementById('maxDamage').value = player.maxDamage;
  document.getElementById('exp').value = player.exp;
}

// Сохранение изменений
function saveChanges() {
  const player = {
    level: parseInt(document.getElementById('level').value),
    health: parseInt(document.getElementById('health').value),
    maxHealth: parseInt(document.getElementById('health').value), // Здоровье и максимальное здоровье одинаковы
    minDamage: parseInt(document.getElementById('minDamage').value),
    maxDamage: parseInt(document.getElementById('maxDamage').value),
    exp: parseFloat(document.getElementById('exp').value),
  };

  localStorage.setItem('playerData', JSON.stringify(player));
  alert('Изменения сохранены!');
}