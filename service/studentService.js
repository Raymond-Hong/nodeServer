let studentDao = require('../dao/studentDao');

const queryAllStudent = success=>{
    return studentDao.queryAllStudent(success);
}

const queryStudentByClass = (classNum,success)=>{
    return studentDao.queryStudentByClass(classNum,success);
}

const queryStudentByStuNum = (stuNum,success)=>{
    return studentDao.queryStudentByClass(stuNum,success);
}

module.exports = {
    queryAllStudent,
    queryStudentByClass,
    queryStudentByStuNum
}
