const studentService = require('../service/studentService');
const generate = require('../utils/generate');
const querystring = require('querystring');
const getAesString = require('../utils/encryption');
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
        if(data && data.length && params.pwd==data[0].pwd){
            console.log('密码正确');
            res.writeHead(302,{location:'/index.html','Set-Cookie':'id='+data[0].id});
            res.end();
        }else{
            res.end('密码错误');
        }
    }
    studentService.queryStudentByStuNum(params.stu_num,success)
}
path.set('/login',login);

const register = (req,res,params)=>{
    const success = data=>{
        res.writeHead(302,{location:'/index.html','Set-Cookie':'id='+data.insertId});
        res.end();
    }
    const checkStuNum = student=>data=>{
        if(data.length){
            generateStuNum(student);
        }else{
            studentService.insertStudent(student,success);
        }
    }
    const generateStuNum = student=>{
        student.stu_num = generate(999999).padStart(6,'0');
        studentService.queryStudentByStuNum(student.stu_num,checkStuNum(student));
    }
    const endToDo = ()=>{
        student = querystring.parse(student);
        if(!student){
            throw new Error("student 不存在");
        }
        student.pwd = getAesString(student.pwd);
        generateStuNum(student);
    }
    
    let student = "";
    req.on('data',chunk=>student+=chunk);
    req.on('end',endToDo);
}
path.set('/register',register);

module.exports.path = path;