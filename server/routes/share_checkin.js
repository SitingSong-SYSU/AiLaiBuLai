import Router from 'koa-router';
import { shareCheckinCtrl } from '../controllers';
import { sendData } from '../utils';

export const router = new Router();


router.use(function(ctx, next) {
  if (ctx.user_id) {
    next();
  } else {
    // TODO
    sendData(ctx, 401, JSON.stringify({message:'{请先登录}'}));
  }
});

// POST /share_checkin/{share_id}?latitude=322.1&longitude=2332.32&msg=xxxx
// 参与签到
router.post('/{share_id}', shareCheckinCtrl.submitInfo);

// GET /share_checkin/{share_id}
// 查看签到活动的名称
router.get('/{share_id}', shareCheckinCtrl.submitInfo);
