let fs = require('fs');
let globalConfig = require('./config');

let routerMap = new Map();
let routerFiles = fs.readdirSync(globalConfig.web_path);

const addToMap = (path,map)=>file=>{
    let temp = require('./'+globalConfig[path]+file);
    if( temp instanceof Array){
        map.push(...temp);
    }else if(temp.path){
        temp.path.forEach((v,k)=>{
            if(map.get(k)){
                throw new Error(path+' 异常:'+k);
            }else{
                map.set(k,v);
            }
        })
    }
}

routerFiles.forEach(addToMap('web_path',routerMap));

let filterArr = [];
let filterFiles = fs.readdirSync(globalConfig.filter_path);

filterFiles.forEach(addToMap('filter_path',filterArr));

module.exports.router = routerMap;
module.exports.filter = filterArr;