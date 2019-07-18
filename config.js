let fs = require('fs');
let conf = fs.readFileSync('./server.conf').toString();
let globalConf = {};
let confs = conf.split('\r\n');

confs.forEach(conf => {
  let tempConf = conf.split('=');
  if (tempConf.length == 2) {
    globalConf[tempConf[0]] = tempConf[1];
  }
});
if (globalConf.static_file_type) {
  globalConf.static_file_type = globalConf.static_file_type.split('|');
} else {
  throw new Error('配置文件异常,缺少:static_file_type');
}
if (globalConf.access_path) {
  globalConf.access_path = globalConf.access_path.split(',');
}
module.exports = globalConf;