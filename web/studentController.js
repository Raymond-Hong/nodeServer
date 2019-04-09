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

const login = (req,res,params)=>{
    const success = data=>{
        console.log(data);
        // res.end(data.map(stu=>stu.name).toString());
        if(data && data.length && params.pwd==data[0].pwd){
            console.log('密码正确');
        }else{
            console.log('密码错误');
            res.writeHead(302,{'Content-Type':'text/plain;charset=utf-8'});
        }
    }
    studentService.queryStudentByStuNum(params.stu_num,success)
}
path.set('/login',login);

module.exports.path = path;