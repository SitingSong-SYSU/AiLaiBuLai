import Router from 'koa-router';
import { checkinCtrl } from '../controllers';
import { sendData } from '../utils';
import { toMid } from '../utils';
import { is_login } from '../service/is_login';

export const router = new Router();


// GET /checkin
// 历史发布签到列表
router.get('/', checkinCtrl.getCheckinList);

// POST /checkin
// 发布签到
router.post('/', checkinCtrl.launchCheckin);

// DELETE /checkin/{checkin_id}
// 点击结束签到
router.delete('/:checkin_id', checkinCtrl.stopCheckin);

// GET /checkin/{checkin_id}
// 具体每个签到信息
router.get('/:checkin_id', checkinCtrl.getCheckinInfo);
