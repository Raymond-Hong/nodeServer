let http = require('http');
let url = require('url');
let fs = require('fs');
let globalConf = require('./config');
let log = require('./log');
let loader = require('./loader');

const isStaticsRequest = pathName=>globalConf.static_file_type.some(suffix=>pathName.endsWith(suffix));
const dealDate = date=>`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
http.createServer((req,res)=>{
    let pathName = url.parse(req.url).pathname;
    let params = url.parse(req.url,true).query;
    log(dealDate(new Date())+'\r'+req.url+'\r');
    res.writeHead(200);
    if(isStaticsRequest(pathName)){
        try {
            fs.readFile(__dirname+globalConf.page_path+pathName,(err,data)=>{
                res.end(data);
            });
        } catch (error) {
            error404();
        }
    }else{
        if(loader.get(pathName)){
            try {
                res.writeHead(200,{'Content-Type':'text/plain;charset=utf-8'});
                loader.get(pathName)(req,res,params);
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
