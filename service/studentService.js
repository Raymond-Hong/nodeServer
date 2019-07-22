let studentDao = require('../dao/studentDao');

const queryAllStudent = success => studentDao.queryAllStudent(success);

const queryStudentByClass = (classNum, success) => studentDao.queryStudentByClass(classNum, success);

const queryStudentByStuNum = (stuNum, success) => studentDao.queryStudentByStuNum(stuNum, success);

const insertStudent = (student, success) => studentDao.insertStudent(student, success);


module.exports = {
  queryAllStudent,
  queryStudentByClass,
  queryStudentByStuNum,
  insertStudent
}
