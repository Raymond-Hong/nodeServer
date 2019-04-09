let createConnection = require('./dbutil');

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
            console.log(err);
        }else{
            console.log(res);
            typeof success == 'function' ? success(res):'';
        }
    }
    startConnect(querySql,callBack);
}

const queryStudentByClass = (classNum,success)=>{
    let querySql = "select * from student where class = ?;";
    const callBack = (err,res)=>{
        if(err){
            console.log(err);
        }else{
            console.log(res);
            typeof success == 'function' ? success(res):'';
        }
    }
    startConnect(querySql,callBack,classNum);
}

const queryStudentByStuNum = (stuNum,success)=>{
    let querySql = "select * from student where stu_num = ?;";
    const callBack = (err,res)=>{
        if(err){
            console.log(err);
        }else{
            console.log(res);
            typeof success == 'function' ? success(res):'';
        }
    }
    startConnect(querySql,callBack,stuNum);
}

module.exports = {
    queryAllStudent,
    queryStudentByClass,
    queryStudentByStuNum
}