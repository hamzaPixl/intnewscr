const traverse = require('traverse');

function neuralyze(jsonObject) {
  const sensitiveDataKeys = ['password', 'token', 'authorization', 'key'];

  return traverse(jsonObject).map(function t(data) {
    if (this.key && sensitiveDataKeys.find(sensitiveKey => this.key.toLowerCase().indexOf(sensitiveKey) >= 0)) {
      return '***';
    }

    return data;
  });
}

module.exports = neuralyze;
