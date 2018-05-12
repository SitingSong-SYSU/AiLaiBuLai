import Router from 'koa-router';
import { shareCheckinCtrl } from '../controllers';
import { sendData } from '../utils';
import { toMid } from '../utils';
import { is_login } from '../service/is_login';

export const router = new Router();


// POST /share_checkin/{share_id}?latitude=322.1&longitude=2332.32&msg=xxxx
// 参与签到
router.post('/{share_id}', shareCheckinCtrl.checkin);

// GET /share_checkin/{share_id}
// 查看签到活动的名称
router.get('/{share_id}', shareCheckinCtrl.getCheckinTitle);
