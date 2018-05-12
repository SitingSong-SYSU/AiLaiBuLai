import Router from 'koa-router';
import { checkinCtrl } from '../controllers';
import { sendPage, sendData } from '../utils';
import { courseModel } from '../models';


export const router = new Router();


router.use(function(ctx, next) {
  if (ctx.user_id) {
    next();
  } else {
    // TODO
    sendData(ctx, 401, JSON.stringify({message:'{请先登录}'}));
  }
});

// GET /checkin
// 历史发布签到列表
router.get('/', checkinCtrl.submitInfo);

// POST /checkin
// 发布签到
router.post('/', checkinCtrl.submitInfo);

// POST /share_checkin/{share_id}?latitude=322.1&longitude=2332.32&msg=xxxx
// 参与签到
router.post('/{share_id}', checkinCtrl.submitInfo);

// GET /share_checkin/{share_id}
// 查看签到活动的名称
router.post('/{share_id}', checkinCtrl.submitInfo);

// DELETE /checkin/{checkin_id}
// 点击结束签到
router.post('/', checkinCtrl.submitInfo);

// GET /checkin/{checkin_id}
// 具体每个签到信息
router.post('/', checkinCtrl.submitInfo);
