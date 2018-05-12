import Router from 'koa-router';
import { checkinCtrl } from '../controllers';
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

// GET /checkin
// 历史发布签到列表
router.get('/', checkinCtrl.getCheckinList);

// POST /checkin
// 发布签到
router.post('/', checkinCtrl.launchCheckin);

// DELETE /checkin/{checkin_id}
// 点击结束签到
router.delete('/', checkinCtrl.stopCheckin);

// GET /checkin/{checkin_id}
// 具体每个签到信息
router.get('/', checkinCtrl.getCheckinInfo);
