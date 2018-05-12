const Koa = require('koa');
const app = new Koa();
// async function test() {
//   return await new Promise(function(resolve, reject) {
//     request('http://apis.juhe.cn/qrcode/api?key=df6616c88fd11236bba916113cbb704b&text=https://www.baidu.com&type=2', function (error, response, body) {
//       if (!error && response.statusCode === 200) {
//         resolve(body);
//       } else {
//         reject(error);
//       }
//     });
//   });
// }
// // response
const crypto = require('crypto');
// app.use(ctx => {
//   ctx.body = 'Hello Koa';
// });

// app.listen(8000);
// console.log("???")
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