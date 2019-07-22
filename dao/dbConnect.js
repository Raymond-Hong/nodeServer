const createConnection = require('./dbutil');
const startConnect = (sql, callBack, param) => {
  const connection = createConnection();
  connection.connect();
  if (param) {
    connection.query(sql, param, callBack);
  } else {
    connection.query(sql, callBack);
  }
  connection.end();
}
const callBack = (success, data) => (err, res) => {
  if (err) {
    log(err);
  }
  if (typeof success === 'function') {
    if (data) {
      data.id = res.insertId;
      success(data);
    } else {
      success(res);
    }
  }
}

module.exports = {
  startConnect,
  callBack,
}