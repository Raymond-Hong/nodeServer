const mysql = require('mysql');

module.exports = () => mysql.createConnection({
  host: '127.0.0.1',
  port: '3306',
  user: 'raymond',
  password: 'raymond',
  database: 'raymond'
});
