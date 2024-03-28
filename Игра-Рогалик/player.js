function isColliding(element, tiles, characterHealth, characterAttack) {
  let characterRect = element.getBoundingClientRect();

  for (let i = 0; i < tiles.length; i++) {
    let tileRect = tiles[i].getBoundingClientRect();

    // Проверяем, что персонаж пересекается с плиткой.
    if (
      characterRect.bottom > tileRect.top &&
      characterRect.top < tileRect.bottom &&
      characterRect.right > tileRect.left &&
      characterRect.left < tileRect.right
    ) {
      // Проверяем, что плитка имеет класс tileH (плитка здоровья).
      if (tiles[i].classList.contains("tileHP")) {
        // Увеличиваем здоровье персонажа на 10.
        element.health += 10;
        // Удаляем плитку здоровья из DOM-дерева.
        tiles[i].remove();
      }
      // Проверяем, что плитка имеет класс tileE (плитка опасности).
      else if (tiles[i].classList.contains("tileE")) {
        // Уменьшаем здоровье персонажа на 20.

        element.health -= 20;

        // Добавляем логику атаки.
        let adjTiles = getAdjacentTiles(tiles[i], tiles);
        for (let j = 0; j < adjTiles.length; j++) {
          if (adjTiles[j].classList.contains('tileP')) {
            adjTiles[j].health -= characterAttack;
          }
        }

        document.querySelector('.health').style.width = `${element.health}%`; // Обновляем ширину полоски здоровья

        if (element.health <= 0) {
          // Обновляем страницу.
          location.reload();
        }

        return true;
      }
      // Проверяем, что плитка имеет класс tileW (стена).
      else if (tiles[i].classList.contains("tileW")) {
        return true;
      }
      // Проверяем, что плитка имеет класс tileSW (меч).
      else if (tiles[i].classList.contains("tileSW")) {
        // Увеличиваем атаку персонажа на 30.
        element.attack+= 30;
        // Удаляем меч из DOM-дерева.
        tiles[i].remove();
      }
    }
  }

  document.querySelector('.health').style.width = `${element.health}%`; // Обновляем ширину полоски здоровья
  return false;
}

function getAdjacentTiles(tile, tiles) {
  let adjacentTiles = [];
  let tileRect = tile.getBoundingClientRect();

  for (let i = 0; i < tiles.length; i++) {
    let  otherTileRect = tiles[i].getBoundingClientRect();

    switch (true) {
      case tile != tiles[i] &&
           tileRect.bottom == otherTileRect.bottom &&
           tileRect.left == otherTileRect.right:
      case tile != tiles[i] &&
           tileRect.right == otherTileRect.left && 
           tileRect.top == otherTileRect.top:
        adjacentTiles.push(tiles[i]);
        break;
    }
  }

  return adjacentTiles;
}

function moveCharacter(event) {
  let element = document.getElementById("character");
  let style = window.getComputedStyle(element);
  let top = parseInt(style.getPropertyValue("top"));
  let left = parseInt(style.getPropertyValue("left"));
  let tiles = document.querySelectorAll(".tile");
  let characterHealth = character.health;
  let characterAttack = character.attack;

  switch (event.keyCode) {
        // Клавиша "W".
        case 87:
          if (top - character.speed >= 0) {
            top -= character.speed;
            element.style.top = top + "px";
    
            // Проверяем, не столкнулся ли персонаж с другим элементом после движения.
            if (isColliding(element, tiles, characterHealth, characterAttack)) {
              top += character.speed;
              element.style.top = top + "px";
            }
          }
          break;
        // Клавиша "A".
        case 65:
          if (left - character.speed >= 0) {
            left -= character.speed;
            element.style.left = left + "px";
    
            if (isColliding(element, tiles, characterHealth, characterAttack)) {
              left += character.speed;
              element.style.left = left + "px";
            }
          }
          break;
        // Клавиша "S".
        case 83:
          if (top + character.speed <= (fieldHeight - 1) * 50) {
            top += character.speed;
            element.style.top = top + "px";
    
            if (isColliding(element, tiles, characterHealth, characterAttack)) {
              top -= character.speed;
              element.style.top = top + "px";
            }
          }
          break;
        // Клавиша "D".
        case 68:
          if (left + character.speed <= (fieldWidth - 1) * 50) {
            left += character.speed;
            element.style.left = left + "px";
    
            if (isColliding(element, tiles, characterHealth, characterAttack)) {
              left -= character.speed;
              element.style.left = left + "px";
            }
          }
          break;
        // Клавиша "Space"
        case 32:
          let enemies = document.querySelectorAll('.tileE'); // Найти всех врагов на поле
          for (let i = 0; i < enemies.length; i++) {
            let enemyRect = enemies[i].getBoundingClientRect();
            let distance = Math.sqrt((enemyRect.x - element.getBoundingClientRect().x)**2 + (enemyRect.y - element.getBoundingClientRect().y)**2); // Расстояние до врага
            if (distance <= 100) { // Проверка расстояния до врага
              enemies[i].health -= characterAttack;
            }
          }
          break;
      }
    }
function checkCollisions() {
  let element = document.getElementById("character");
  let tiles = document.querySelectorAll(".tile");
  let characterHealth = character.health;
  let characterAttack = character.attack;

  return isColliding(element, tiles, characterHealth, characterAttack);
}

setInterval(function() {
  if (checkCollisions()) {
  } 
}, 1000);

// Добавляем обработчик событий для нажатия клавиш на клавиатуре.
document.addEventListener("keydown", moveCharacter);

// функция возрождения
function respawn(character) {
  // Логика восстановления персонажа
  
  if (character.isDead) {
    // Установка соответствующих значений для возрождения
    character.isDead = false;
    character.health = character.maxHealth;

    
    // Возможно, добавление других свойств для возрождения
  }
  
  // Возвращение измененного персонажа
  return character;
}

