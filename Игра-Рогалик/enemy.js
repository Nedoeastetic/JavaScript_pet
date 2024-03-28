function moveEnemy(enemy) {
  let interval; // Объявляем переменную на уровне функции
  
  // Функция проверки жизней не движущихся врагов
  function checkEnemiesHealth() {
    const staticEnemies = document.querySelectorAll('.tileE'); // Получаем всех не движущихся врагов
    staticEnemies.forEach(enemy => { // Перебираем список врагов
      if (enemy.health <= 0) {
        enemy.parentNode.removeChild(enemy); // Удаляем объект из DOM дерева
      }
     else if (enemy.health <= 70 && enemy.health > 40) {
      enemy.querySelector('.health').style.width = '70%';
    } else if (enemy.health <= 40 && enemy.health > 10) {
      enemy.querySelector('.health').style.width = '40%';
    } else if (enemy.health <= 10) {
      enemy.querySelector('.health').style.width = '10%';
    }
    });
    setTimeout(checkEnemiesHealth, 1000); // Запускаем проверку через 1 секунду
  }
  
  checkEnemiesHealth(); // Запускаем функцию проверки

  function moveLeft(obj) {
    let width = obj.offsetWidth; // Получаем ширину объекта
    let pos = parseInt(obj.style.left);
    interval = setInterval(() => {
      if (pos <= -width || document.elementFromPoint(pos - 1, parseInt(obj.style.top))?.classList.contains('tileW')) {
        clearInterval(interval);
        moveRight(obj); // Объект достиг границы, меняем направление
      } else {
        pos -= obj.speed;
        obj.style.left = pos + 'px';
      
      
      }
    
    }, 100);
  }

  function moveRight(obj) {
    let width = obj.offsetWidth;
    let pos = parseInt(obj.style.left);
    interval = setInterval(() => {
      if (pos >= 450 || document.elementFromPoint(pos + width, parseInt(obj.style.top))?.classList.contains('tileW')) {
        clearInterval(interval);
        moveLeft(obj);
      } else {
        pos += obj.speed;
        obj.style.left = pos + 'px';
       

      }
     
    }, 100);
  }

  function moveTop(obj) {
    let height = obj.offsetHeight; // Получаем высоту объекта
    let pos = parseInt(obj.style.top);
    interval = setInterval(() => {
      if (pos <= -height || document.elementFromPoint(parseInt(obj.style.left), pos - 1)?.classList.contains('tileW')) {
        clearInterval(interval);
        moveBottom(obj);
      } else {
        pos -= obj.speed;
        obj.style.top = pos + 'px';



      }
    
    }, 100);
  }

  function moveBottom(obj) {
    let height = obj.offsetHeight;
    let pos = parseInt(obj.style.top);
    interval = setInterval(() => {
      if (pos >= 450 || document.elementFromPoint(parseInt(obj.style.left), pos + height)?.classList.contains('tileW')) {
        clearInterval(interval);
        moveTop(obj);
      } else {
        pos += obj.speed;
        obj.style.top = pos + 'px';

 

      }
      
    }, 100);
  }

  function removeEnemy() {
    enemy.parentNode.removeChild(enemy); // удаляем объект из DOM дерева
  }

  moveRight(enemy); // Начинаем движение вправо
}
