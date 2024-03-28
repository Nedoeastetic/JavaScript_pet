const fieldWidth = 20;
const fieldHeight = 20;
const horizontalPassages = [];
const verticalPassages = [];
const swords = 2;
const healthPotions = 10;
const emptyTiles = [];
const evil = 10;

function generateField() {
  const container = document.querySelector('.field');
  
  // Залить всю карту стеной (начальное значение поля - 0)
  const field = new Array(fieldHeight).fill(null).map(() => new Array(fieldWidth).fill(0));

  // 1. Сгенерировать случайное количество комнат (от 5 до 10)
  const numRooms = getRandomInt(5, 10);
  const rooms = [];
  // 2. Разместить случайные прямоугольные комнаты со случайными размерами (3 - 8 клеток в длину и ширину)
  for (let i = 0; i < numRooms; i++) {
    const roomWidth = getRandomInt(3, 8);
    const roomHeight = getRandomInt(3, 8);
    const roomX = getRandomInt(0, fieldWidth - roomWidth);
    const roomY = getRandomInt(0, fieldHeight - roomHeight);
    const room = { x: roomX, y: roomY, width: roomWidth, height: roomHeight };
    
    // 3. Проверка комнаты на правильность
    const isOverlap = rooms.some((otherRoom) => intersect(room, otherRoom));
    if (isOverlap) {
      i--;
      continue;
    }
    
    // 4. Нарисовать комнату на поле
    for (let x = room.x; x < room.x + room.width; x++) {
      for (let y = room.y; y < room.y + room.height; y++) {
        field[y][x] = 1;
      }
    }
    rooms.push(room);
  }

  // 5. Разместить случайное количество вертикальных и горизонтальных проходов шириной в 1 клетку
  for (let i = 0; i < getRandomInt(3, 5); i++) {
    const x = getRandomInt(1, fieldWidth - 2); // Не ставим стенки на краю поля
    for (let y = 0; y < fieldHeight; y++) {
      field[y][x] = 1;
    }
    verticalPassages.push(x);
  }
  
  for (let i = 0; i < getRandomInt(3, 5); i++) {
    const y = getRandomInt(1, fieldHeight - 2); // Не ставим стенки на краю поля
    for (let x = 0; x < fieldWidth; x++) {
      field[y][x] = 1;
    }
    horizontalPassages.push(y);
  }
  
  // Создайте плитки для представления каждого элемента в массиве полей
  for (let y = 0; y < fieldHeight; y++) {
    for (let x = 0; x < fieldWidth; x++) {
      const tile = document.createElement('div');
      tile.classList.add('tile');
      tile.style.left = `${x * 50}px`;
      tile.style.top = `${y * 50}px`;
  
      if (field[y][x] === 0) {
        tile.classList.add('tileW');
      } else {
        tile.classList.add('tile');
      }
  
      container.appendChild(tile);
    }
  }
  


  //НАЧАЛО РАСТАНОВКИ МЕЧЕЙ И ЗЕЛЕЙ
// Поиск пустых клеток на карте
for (let y = 0; y < fieldHeight; y++) {
  for (let x = 0; x < fieldWidth; x++) {
    if (field[y][x] === 1) {
      emptyTiles.push({x: x, y: y});
    }
  }
}
// Размещение мечей в случайных пустых клетках
for (let i = 0; i < swords; i++) {
  const index = getRandomInt(0, emptyTiles.length - 1);
  const tile = emptyTiles[index];
  emptyTiles.splice(index, 1); // Удаление клетки из списка пустых клеток
  const sword = document.createElement('div');
  sword.classList.add('tile', 'tileSW'); // Добавляем оба класса
  sword.style.left = `${tile.x * 50}px`;
  sword.style.top = `${tile.y * 50}px`;
  container.appendChild(sword);
}


// Размещение зелий здоровья в случайных пустых клетках
for (let i = 0; i < healthPotions; i++) {
  const index = getRandomInt(0, emptyTiles.length - 1);
  const tile = emptyTiles[index];
  emptyTiles.splice(index, 1); // Удаление клетки из списка пустых клеток
  const potion = document.createElement('div');
  potion.classList.add('tile', 'tileHP'); // Добавляем оба класса
  potion.style.left = `${tile.x * 50}px`;
  potion.style.top = `${tile.y * 50}px`;

  container.appendChild(potion);
}

// Размещение героя в случайной пустой клетке
const index = getRandomInt(0, emptyTiles.length - 1);
const tile = emptyTiles[index];
emptyTiles.splice(index, 1); // Удаление клетки из списка пустых клеток
const character = document.createElement('div');
character.classList.add('tile', 'tileP'); // Добавляем классы
character.style.left = `${tile.x * 50}px`;
character.style.top = `${tile.y * 50}px`;
character.id = 'character'; // Добавляем id
// Добавляем характеристики
character.speed = 10;
character.health = 100;
character.attack=30
// Создаем полосу здоровья и добавляем ее в персонажа
const health = document.createElement('div');
health.classList.add('health');
health.style.width = "100%";
character.appendChild(health);

document.getElementById('character-container').appendChild(character);




// Размещение злодеев в случайной пустой клетке
// Создаем 10 врагов
const enemies = [];
for (let i = 0; i < 10; i++) {
  const index = getRandomInt(0, emptyTiles.length - 1);
  const tile = emptyTiles[index];
  emptyTiles.splice(index, 1); //Удаление клетки из списка пустых клеток 
  const enemy = document.createElement('div');
  enemy.classList.add('tile', 'tileE'); //Добавляем классы
  enemy.style.left = `${tile.x * 50}px`;
  enemy.style.top = `${tile.y * 50}px`;
  enemy.id = `enemy-${i}`; //Добавляем уникальный id для каждого врага
  enemy.speed=25;
  enemy.health = 100;

  // Создаем полосу здоровья и добавляем ее в каждого врага
  const health = document.createElement('div');
  health.classList.add('health');
  health.style.width = "100%";
  enemy.appendChild(health);

  // Добавляем врага на игровое поле
  document.getElementById('character-container').appendChild(enemy);

  // Добавляем врага в массив
  enemies.push(enemy);
}

// Запускаем перемещение всех врагов
for (let i = 0; i < enemies.length; i++) {
  moveEnemy(enemies[i]);
}



}

//Вспомогательная функция для получения случайного целого числа в диапазоне от min до max
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Вспомогательная функция для проверки пересечения двух комнат
function intersect(room1, room2) {
  return (
    room1.x <= room2.x + room2.width &&
    room1.x + room1.width >= room2.x &&
    room1.y <= room2.y + room2.height &&
    room1.y + room1.height >= room2.y
  );
}

