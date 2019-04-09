const loginCheck = (req,res,pathName,params)=>{
    if(pathName == '/login' || pathName == '/login.html'){
    }else{
        return true;
    }
    return false;
}
module.exports = [loginCheck];