const getAesString = require('../utils/encryption')
const globalConf = require('../config');

const loginCheck = (req,res,pathName,params)=>{
    if(globalConf.access_path.includes(pathName)){
        if(params && params.pwd){
            params.pwd = getAesString(params.pwd);
        }
    }else{
        if(!req.headers.cookie){
            res.writeHead(302,{location:'/login.html'});
            res.end();
            return true;
        }
    }
    return false;
}
module.exports = [loginCheck];
