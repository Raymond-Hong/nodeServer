let fs = require('fs');
let globalConfig = require('./config');

let pathMap = new Map();
let files = fs.readdirSync(globalConfig.web_path);

files.forEach(file=>{
    let temp = require('./'+globalConfig.web_path+file);
    if(temp.path){
        temp.path.forEach((v,k)=>{
            if(pathMap.get(k)){
                throw new Error('url path 异常,url:'+k);
            }else{
                pathMap.set(k,v);
            }
        })
    }
})

module.exports = pathMap;