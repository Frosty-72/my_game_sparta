// Данные игрока и бота
let player = JSON.parse(localStorage.getItem('playerData')) || {
  health: 150,
  maxHealth: 150,
  minDamage: 10,
  maxDamage: 15,
  exp: 0,
  level: 1,
  expToNextLevel: 100,
};

let bot = {
  health: 100,
  maxHealth: 100,
  minDamage: 2,
  maxDamage: 5,
  level: player.level,
};

// Выбор удара и защиты
let playerAttack = null;
let playerDefense = null;

// Лог боя
function addLog(message) {
  const log = document.getElementById('log');
  log.innerHTML += `<p>${message}</p>`;
  log.scrollTop = log.scrollHeight; // Автопрокрутка вниз
}

// Выбор удара
function chooseAttack(part) {
  playerAttack = part;
  document.querySelectorAll('.attack-options button').forEach(button => button.classList.remove('selected'));
  document.getElementById(`attack-${part}`).classList.add('selected');
}

// Выбор защиты
function chooseDefense(part) {
  playerDefense = part;
  document.querySelectorAll('.defense-options button').forEach(button => button.classList.remove('selected'));
  document.getElementById(`defense-${part.replace('-', '-')}`).classList.add('selected');
}

// Логика удара
function performAttack() {
  if (!playerAttack || !playerDefense) {
    alert('Выберите удар и защиту!');
    return;
  }

  // Урон игрока
  const playerDamage = calculateDamage(player, playerAttack, bot, 'player');
  bot.health -= playerDamage;
  updateHealthBar(bot, bot.health, bot.maxHealth, 'bot-health-progress', 'bot-health-text');
  addLog(`Вы нанесли ${playerDamage} урона боту.`);

  // Проверка на победу
  if (bot.health <= 0) {
    const expEarned = calculateExp();
    player.exp += expEarned;

    if (player.exp >= player.expToNextLevel) {
      levelUp();
    }

    localStorage.setItem('playerData', JSON.stringify(player));
    updateExpBar();
    setTimeout(() => window.location.href = '../victory/victory.html', 1000);
    return;
  }

  // Урон бота
  const botAttack = getRandomAttack();
  const botDefense = getRandomDefense();
  const botDamage = calculateDamage(bot, botAttack, player, 'bot');
  player.health -= botDamage;
  updateHealthBar(player, player.health, player.maxHealth, 'player-health-progress', 'player-health-text');
  addLog(`Бот нанес вам ${botDamage} урона.`);

  // Проверка на поражение
  if (player.health <= 0) {
    alert('Вы проиграли!');
    window.location.href = '../necropolis/necropolis.html';
  }

  // Сброс выбора
  playerAttack = null;
  playerDefense = null;
  document.querySelectorAll('.attack-options button, .defense-options button').forEach(button => button.classList.remove('selected'));
}

// Расчет урона
function calculateDamage(attacker, attackPart, defender, role) {
  const baseDamage = Math.floor(Math.random() * (attacker.maxDamage - attacker.minDamage + 1)) + attacker.minDamage;
  const levelDifference = defender.level - attacker.level;

  // Если атака попала в защиту
  const defenseParts = role === 'player' ? playerDefense.split('-') : botDefense.split('-');
  if (defenseParts.includes(attackPart)) {
    if (levelDifference === 0) {
      return 0; // Блокирование полностью защищает
    } else if (levelDifference < 0) {
      // Бот ниже уровнем: блокирование снижает урон на 90% за каждый уровень разницы
      const reduction = Math.min(0.9 * Math.abs(levelDifference), 0.9); // Максимум 90%
      return baseDamage * (1 - reduction);
    } else {
      return 0; // Бот выше уровнем: блокирование полностью защищает
    }
  }

  return baseDamage; // Если атака не попала в защиту
}

// Случайный выбор удара для бота
function getRandomAttack() {
  const parts = ['head', 'chest', 'groin', 'legs'];
  return parts[Math.floor(Math.random() * parts.length)];
}

// Случайный выбор защиты для бота
function getRandomDefense() {
  const defenses = ['head-chest', 'groin-legs'];
  return defenses[Math.floor(Math.random() * defenses.length)];
}

// Обновление шкалы EXP
function updateExpBar() {
  const expProgress = document.getElementById('exp-progress');
  const expText = document.getElementById('exp-text');
  const expPercentage = (player.exp / player.expToNextLevel) * 100;

  expProgress.style.width = `${expPercentage}%`;
  expText.textContent = `Уровень: ${player.level} | EXP: ${player.exp.toFixed(2)}/${player.expToNextLevel}`;
}

// Обновление шкалы здоровья
function updateHealthBar(character, health, maxHealth, healthProgressId, healthTextId) {
  const healthProgress = document.getElementById(healthProgressId);
  const healthText = document.getElementById(healthTextId);
  const healthPercentage = (health / maxHealth) * 100;

  healthProgress.style.width = `${healthPercentage}%`;
  healthText.textContent = `${health}/${maxHealth} HP`;
}

// Повышение уровня
function levelUp() {
  player.level += 1;
  player.expToNextLevel *= 2;
  player.exp = 0;

  player.maxHealth += 50;
  player.health = player.maxHealth;
  player.minDamage += 5;
  player.maxDamage += 5;

  localStorage.setItem('playerData', JSON.stringify(player));
  alert(`Поздравляем! Вы достигли уровня ${player.level}!\nВаши характеристики улучшены.`);
  updateExpBar();
  updateHealthBar(player, player.health, player.maxHealth, 'player-health-progress', 'player-health-text');
}

// Инициализация
window.onload = function () {
  bot.level = player.level;
  updateExpBar();
  updateHealthBar(player, player.health, player.maxHealth, 'player-health-progress', 'player-health-text');
  updateHealthBar(bot, bot.health, bot.maxHealth, 'bot-health-progress', 'bot-health-text');
};