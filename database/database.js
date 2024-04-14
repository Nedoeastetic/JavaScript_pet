// Импортируем пакет mysql
const mysql = require('mysql');

// Создаем подключение к базе данных
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'username', // ваше имя пользователя MySQL
  password: 'password', // ваш пароль MySQL
  database: 'database_name' // название вашей базы данных
});

// Подключаемся к базе данных
connection.connect((err) => {
  if (err) {
    console.error('Ошибка подключения к базе данных');
    throw err;
  }
  console.log('Подключение к базе данных установлено');
});

// Создаем таблицу клиентов, если она не существует
connection.query(`CREATE TABLE IF NOT EXISTS clients (
  account_number INT AUTO_INCREMENT PRIMARY KEY,
  last_name VARCHAR(255),
  first_name VARCHAR(255),
  patronymic VARCHAR(255),
  birth_date DATE,
  inn VARCHAR(255),
  responsible_person VARCHAR(255),
  status VARCHAR(255) DEFAULT 'Не в работе'
)`, (err, result) => {
  if (err) {
    console.error('Ошибка при создании таблицы клиентов');
    throw err;
  }
  console.log('Таблица клиентов создана');
});

// Создаем таблицу пользователей, если она не существует
connection.query(`CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(255),
  login VARCHAR(255),
  password VARCHAR(255)
)`, (err, result) => {
  if (err) {
    console.error('Ошибка при создании таблицы пользователей');
    throw err;
  }
  console.log('Таблица пользователей создана');
});

// Экспортируем подключение к базе данных
module.exports = connection;
