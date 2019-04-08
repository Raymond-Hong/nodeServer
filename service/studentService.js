var studentDao = require('../dao/studentDao');

function queryAllStudent(success){
    return studentDao.queryAllStudent(success);
}

function queryStudentByClass(classNum,success){
    return studentDao.queryStudentByClass(classNum,success);
}

module.exports = {
    queryAllStudent,
    queryStudentByClass
}
