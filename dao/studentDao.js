let createConnection = require('./dbutil');
let log = require('../log');
const startConnect = (sql,callBack,param)=>{
    let connection = createConnection();
    connection.connect();
    if(param){
        connection.query(sql,param,callBack);
    }else{
        connection.query(sql,callBack);
    }
    connection.end();
}

const queryAllStudent = success => {
    let querySql = "select * from student;";
    const callBack = (err,res)=>{
        if(err){
            log(err);
        }else{
            typeof success == 'function' ? success(res):'';
        }
    }
    startConnect(querySql,callBack);
}

const queryStudentByClass = (classNum,success)=>{
    let querySql = "select * from student where class = ?;";
    const callBack = (err,res)=>{
        if(err){
            log(err);
        }else{
            typeof success == 'function' ? success(res):'';
        }
    }
    startConnect(querySql,callBack,classNum);
}

const queryStudentByStuNum = (stuNum,success)=>{
    let querySql = "select * from student where stu_num = ?;";
    const callBack = (err,res)=>{
        console.log(err,res,'query');
        if(err){
            log(err);
        }else{
            typeof success == 'function' ? success(res):'';
        }
    }
    startConnect(querySql,callBack,stuNum|0);
}

const insertStudent = (student,success)=>{
    let insertSql = 'insert into student (stu_num,name,age,class,pwd)values(?,?,?,?,?)';
    const fieldOrder = {
        stu_num:0,
        name:1,
        age:2,
        class:3,
        pwd:4
    };
    let param = [];
    for(let prop in student){
        if(fieldOrder.hasOwnProperty(prop)){
            param[fieldOrder[prop]] = student[prop];
        }
    }
    const callBack = (err,res)=>{
        if(res){
            typeof success == 'function' ? success(res):'';
        }else{
            log(err);
        }
    }
    startConnect(insertSql,callBack,param);
}

module.exports = {
    queryAllStudent,
    queryStudentByClass,
    queryStudentByStuNum,
    insertStudent
}