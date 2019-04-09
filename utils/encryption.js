const CryptoJS = require("crypto-js");
const getAesString = password => CryptoJS.HmacSHA1(password, "RM").toString();

module.exports = getAesString;