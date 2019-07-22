const log = require('../log');
const {startConnect, callBack} = require('./dbConnect');
const queryAllStudent = success => {
  const querySql = "select * from student;";
  startConnect(querySql, callBack(success));
}

const queryStudentByClass = (classNum, success) => {
  const querySql = "select * from student where class = ?;";
  startConnect(querySql, callBack(success), classNum);
}

const queryStudentByStuNum = (stuNum, success) => {
  const querySql = "select * from student where stu_num = ?;";
  startConnect(querySql, callBack(success), stuNum);
}

const insertStudent = (student, success) => {
  const insertSql = 'insert into student (stu_num,name,age,class,pwd)values(?,?,?,?,?)';
  const fieldOrder = {
    stu_num: 0,
    name: 1,
    age: 2,
    class: 3,
    pwd: 4
  };
  let param = [];
  for (let prop in student) {
    if (fieldOrder.hasOwnProperty(prop)) {
      param[fieldOrder[prop]] = student[prop];
    }
  }
  startConnect(insertSql, callBack(success), param);
}

module.exports = {
  queryAllStudent,
  queryStudentByClass,
  queryStudentByStuNum,
  insertStudent
}