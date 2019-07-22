let userDao = require('../dao/userDao');

const queryUserByUserNum = (userNum, success) => userDao.queryUserByUserNum(userNum, success);

const insertUser = (user, success) => userDao.insertUser(user, success);


module.exports = {
  queryUserByUserNum,
  insertUser
}