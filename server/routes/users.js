import Router from 'koa-router';
import { userCtrl } from '../controllers';
import { sendData } from '../utils';
import { courseModel } from '../models';


export const router = new Router();

// 登录
// POST /users/session
router.post('/session', userCtrl.login);

router.use(function (ctx, next) {
  if (ctx.token) {
    next();
  } else {
    // TODO
    sendData(ctx, 401, JSON.stringify({ msg: '请先登录' }));
  }
});

// 提交个人信息
router.post('/', userCtrl.submitInfo);

// 上传个人照片
router.post('/picture', userCtrl.uploadPicture);
