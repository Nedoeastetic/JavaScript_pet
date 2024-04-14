// Импортируем пакет express
const express = require('express');
// Импортируем подключение к базе данных
const db = require('./database');

// Создаем экземпляр приложения Express
const app = express();

// Разбираем данные формы в запросе
app.use(express.urlencoded({ extended: true }));

// Маршрут для авторизации
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Проверяем существование пользователя с заданным логином и паролем
  db.query('SELECT * FROM users WHERE login = ? AND password = ?', [username, password], (err, result) => {
    if (err) {
      console.error('Ошибка при выполнении запроса');
      throw err;
    }

    // Если пользователь существует, отображаем таблицу клиентов
    if (result.length > 0) {
      // Получаем ФИО ответственного пользователя
      const responsiblePersonFullName = result[0].full_name;

      // Получаем таблицу клиентов авторизованного пользователя через соединение с базой данных
      db.query('SELECT * FROM clients WHERE responsible_person = ?', [responsiblePersonFullName], (err, clients) => {
        if (err) {
          console.error('Ошибка при выполнении запроса');
          throw err;
        }

        // Отправляем HTML-страницу с таблицей клиентов
        res.send(`
          <h1>Таблица клиентов</h1>
          <table>
            <thead>
              <tr>
                <th>Номер счета</th>
                <th>Фамилия</th>
                <th>Имя</th>
                <th>Отчество</th>
                <th>Дата рождения</th>
                <th>ИНН</th>
                <th>ФИО ответственного</th>
                <th>Статус</th>
              </tr>

              </thead>
              <tbody>
                ${clients.map(client => `
                  <tr>
                    <td>${client.account_number}</td>
                    <td>${client.last_name}</td>
                    <td>${client.first_name}</td>
                    <td>${client.patronymic}</td>
                    <td>${client.birth_date}</td>
                    <td>${client.inn}</td>
                    <td>${client.responsible_person}</td>
                    <td>
                      <form action="/update-status/${client.account_number}" method="POST">
                        <select name="status" onchange="this.form.submit()">
                          <option value="Не в работе"${client.status === 'Не в работе' ? ' selected' : ''}>Не в работе</option>
                          <option value="В работе"${client.status === 'В работе' ? ' selected' : ''}>В работе</option>
                          <option value="Отказ"${client.status === 'Отказ' ? ' selected' : ''}>Отказ</option>
                          <option value="Сделка закрыта"${client.status === 'Сделка закрыта' ? ' selected' : ''}>Сделка закрыта</option>
                        </select>
                      </form>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          `);
        });
      } else {
        res.send('Неверный логин или пароль');
      }
    });
  });
  
  // Маршрут для обновления статуса клиента
  app.post('/update-status/:accountNumber', (req, res) => {
    const accountNumber = req.params.accountNumber;
    const newStatus = req.body.status;
  
    // Обновляем статус клиента в таблице
    db.query('UPDATE clients SET status = ? WHERE account_number = ?', [newStatus, accountNumber], (err, result) => {
      if (err) {
        console.error('Ошибка при выполнении запроса');
        throw err;
      }
  
      // Перенаправляем пользователя обратно на страницу с таблицей клиентов
      res.redirect('/');
    });
  });
  
  // Слушаем сервер на порту 3000
  app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
  });
  