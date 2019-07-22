const { startConnect, callBack } = require('./dbConnect');

const queryUserByUserNum = (userNum, success) => {
  const querySql = "select * from user where userNumber = ?;";
  startConnect(querySql, callBack(success), userNum);
}

const insertUser = (user, success) => {
  const insertSql = 'insert into user (userNumber,nickName,sex,createdAt,password)values(?,?,?,?,?)';
  const fieldOrder = {
    userNumber: 0,
    nickName: 1,
    sex: 2,
    createdAt: 3,
    password: 4
  };
  let param = [];
  user.createdAt = new Date();
  for (let prop in user) {
    if (fieldOrder.hasOwnProperty(prop)) {
      param[fieldOrder[prop]] = user[prop];
    }
  }
  startConnect(insertSql, callBack(success, user), param);
}

module.exports = {
  queryUserByUserNum,
  insertUser
}