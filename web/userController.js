let path = new Map();
const userService = require('../service/userService');
const querystring = require('querystring');
const getAesString = require('../utils/encryption');
const generate = require('../utils/generate');

const login = (req, res, params) => {
  const success = data => {
    if (data && data.length && params.password == data[0].password) {
      res.writeHead(302, { location: '/index.html', 'Set-Cookie': 'userId=' + data[0].id });
      res.end();
    } else {
      res.end('帐号/密码错误');
    }
  };
  params = "";
  const endToDo = () => {
    if (params) {
      params = params.split('&').reduce((pre, val) => {
        let cur = val.split('=');
        pre[cur[0]] = cur[1];
        return pre;
      }, {});
      params.password = getAesString(params.password);
      userService.queryUserByUserNum(params.userNumber, success);
    } else {
      res.end('请求方式应为POST');
    }
  }
  req.on('data', chunk => params += chunk);
  req.on('end', endToDo);
}
path.set('/user/login', login);

const register = (req, res) => {
  const success = data => {
    if (data) {
      res.writeHead(200, { 'Set-Cookie': 'userId=' + data.id });
      res.end(JSON.stringify(data));
    }
  }
  const checkUserNum = user => data => {
    if (data.length) {
      generateNum(user);
    } else {
      userService.insertUser(user, success);
    }
  }
  const generateNum = user => {
    user.userNumber = generate(999999).padStart(6, '0');
    userService.queryUserByUserNum(user.userNumber, checkUserNum(user));
  }
  const endToDo = () => {
    user = querystring.parse(user);
    if (!user) {
      throw new Error("user 不存在");
    }
    user.password = getAesString(user.password);
    generateNum(user);
  }

  let user = "";
  req.on('data', chunk => user += chunk)
  req.on('end', endToDo);
}
path.set('/user/register', register);

module.exports.path = path;