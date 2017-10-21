const path = require('path');
const dotEnv = require('dotenv');

function setEnv() {
  dotEnv.config({ path: path.join(__dirname, '../.myconfig/local.env') });
}

exports.setEnv = setEnv;
