const Koa = require('koa');
const app = new Koa();

const crypto = require('crypto');

function generateCheckinID(token) {
  return crypto.createHmac('sha1', Date.now().toString())
    .update(token + 'ugnamsung 15331117' + new Date())
    .digest('hex');
}


console.log(generateCheckinID('ssss').length)

// var crypto = require('crypto');

var hash = crypto.createHash('sha256').update('dfg').digest('hex');

console.log(hash)
console.log(hash.length)