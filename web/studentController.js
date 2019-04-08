let studentService = require('../service/studentService');

let path = new Map();

const getData = (req,res)=>{
    const success = data=>{
        res.end(data.map(stu=>stu.name).toString());
    }
    studentService.queryAllStudent(success);
}
path.set('/getData',getData);

const getDataByClass = (req,res,params)=>{
    const success = data=>{
        res.end(data.map(stu=>stu.name).toString());
    }
    studentService.queryStudentByClass(params.class,success);
}
path.set('/getDataByClass',getDataByClass);

module.exports.path = path;