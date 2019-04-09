let fs = require('fs');
let globalConfig = require('./config');
const date = require('./utils/date')

let fileName = globalConfig.log_path + globalConfig.log_name;

const log = (data,callBack=()=>{})=>fs.appendFile(fileName,date.dateToString(new Date())
    +'\r'+data+'\n',callBack);

module.exports = log;