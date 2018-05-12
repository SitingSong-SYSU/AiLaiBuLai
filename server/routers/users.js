import Router from 'koa-router';
import { userCtrl } from '../controllers';
import { sendData } from '../utils';
import { courseModel } from '../models';
import { toMid } from '../utils';
import { is_login } from '../service/is_login';


export const router = new Router();
// router.use(function(ctx, next) {
//   ctx.response.status = 200;
//   console.log(ctx.response.status);
// })


// 登录
// POST /users/session
router.post('/session', userCtrl.login);

// router.use(toMid(is_login));


// 提交个人信息
router.post('/', userCtrl.submitInfo);

router.use(function (ctx, next) {
  if (ctx.token) {
    next();
  } else {
    sendData(ctx, 401, JSON.stringify({ msg: '请先登录' }));
  }
});

