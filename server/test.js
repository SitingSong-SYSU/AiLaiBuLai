const Koa = require('koa');
const app = new Koa();

const crypto = require('crypto');

function generateCheckinID(token) {
  return crypto.createHmac('sha1', Date.now().toString())
    .update(token + 'ugnamsung 15331117' + new Date())
    .digest('hex');
}


var hash = crypto.createHash('sha256').update('dfg').digest('hex');
