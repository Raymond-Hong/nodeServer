let http = require('http');
let url = require('url');
let fs = require('fs');
let globalConf = require('./config');
let log = require('./log');
let loader = require('./loader');
let path = require('path');

const isStaticsRequest = pathName=>globalConf.static_file_type.some(suffix=>path.extname(pathName)==suffix);
const dealDate = date=>`${date.getFullYear()}-${date.getMonth()+1}-\
${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
const getClientIp = req => {
    let ip = req.headers['x-forwarded-for'] ||
        req.ip ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress || '';
    if(ip.split(',').length){
        ip = ip.split(',')[0]
    }
    return ip;
};

http.createServer((req,res)=>{
    log(dealDate(new Date())+getClientIp(req)+'\r'+req.url+'\r');
    let pathName = url.parse(req.url).pathname;
    let params = url.parse(req.url,true).query;
    if(loader.filter.some(func=>func(req,res,pathName,params))){
        error404();
        return;
    }
    if(isStaticsRequest(pathName)){//静态资源
        try {
            res.writeHead(200);
            fs.readFile(__dirname+globalConf.page_path+pathName,(err,data)=>{
                res.end(data);
            });
        } catch (error) {
            error404();
        }
    }else{
        if(loader.router.get(pathName)){
            try {
                res.writeHead(200,{'Content-Type':'text/plain;charset=utf-8'});
                loader.router.get(pathName)(req,res,params);
            } catch (error) {
                res.writeHead(500);
                res.end('<html><body><h1>500 BadServer</h1></body></html>');
            }
        }else{
            error404();
        }
    }
    function error404(){
        res.writeHead(404);
        res.end('<html><body><h1>404 NotFound</h1></body></html>');
    }
}).listen(globalConf.port);
