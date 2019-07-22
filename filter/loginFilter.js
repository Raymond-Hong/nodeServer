const getAesString = require('../utils/encryption')
const globalConf = require('../config');

const loginCheck = (req, res, pathName, params) => {
  if (globalConf.access_path.includes(pathName)) {
    if (params && params.pwd) {
      params.pwd = getAesString(params.pwd);
    }
  } else {
    let cookie = req.headers.cookie, url = '';
    if (!cookie.id && !cookie.userId && pathName.endsWith('.html')) {
      console.log(pathName);
      if (pathName.startsWith('/user')) {
        url = '/userLogin.html'
      } else {
        url = '/login.html'
      }
      res.writeHead(302, { location: url });
      res.end();
      return true;
    }
  }
  return false;
}
module.exports = [loginCheck];
