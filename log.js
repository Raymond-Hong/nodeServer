let fs = require('fs');
let globalConfig = require('./config');

let fileName = globalConfig.log_path + globalConfig.log_name;

const log = (data,callBack=()=>{})=>fs.appendFile(fileName,data+'\n',callBack);

module.exports = log;