let studentDao = require('../dao/studentDao');

const queryAllStudent = success=>{
    return studentDao.queryAllStudent(success);
}

const queryStudentByClass = (classNum,success)=>{
    return studentDao.queryStudentByClass(classNum,success);
}

const queryStudentByStuNum = (stuNum,success)=>{
    return studentDao.queryStudentByStuNum(stuNum,success);
}

const insertStudent = (student,success)=>{
    return studentDao.insertStudent(student,success);
}

module.exports = {
    queryAllStudent,
    queryStudentByClass,
    queryStudentByStuNum,
    insertStudent
}
