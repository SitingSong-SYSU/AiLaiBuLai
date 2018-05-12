import { sendData } from '../utils';
import { userModel, checkinModel, checkinTokenModel } from '../models';
import { CheckinServ } from '../service';
/**
 * 历史发布签到列表
 * 
 * @export
 * @param {any} ctx 
 */
export async function getCheckinList(ctx) {
    sendData(ctx, 200, JSON.stringify(await checkinModel.getCheckinList()));
}

/**
 * 发布签到
 * 
 * @export
 * @param {any} ctx 
 */
export async function launchCheckin(ctx) {
    // 检查是否存在正在进行的签到
    if (await CheckinServ.getCheckinIDByToken(ctx.redis) !== nil) {
        sendData(ctx, 401, JSON.stringify({}));    
    }
    sendData(ctx, 201, JSON.stringify());
}

/**
 * 点击结束签到
 * 
 * @export
 * @param {any} ctx 
 */
export async function stopCheckin(ctx) {
    // 若是已经登陆，则重定向到登陆首页
    if (ctx.user_id) {
        ctx.status = 302;
        if (ctx.is_manager) {
            ctx.set('Location', '/userd');
        } else {
            ctx.set('Location', '/course');
        }
    } else {
        // TODO 若是未登陆，则发送对应的网页
        sendPage(ctx, 200);
    }
}

/**
 * 具体每个签到信息
 * 
 * @export
 * @param {any} ctx 
 */
export async function getCheckinInfo(ctx) {
  // 若是已经登陆，则重定向到登陆首页
  if (ctx.user_id) {
      ctx.status = 302;
      if (ctx.is_manager) {
          ctx.set('Location', '/userd');
      } else {
          ctx.set('Location', '/course');
      }
  } else {
      // TODO 若是未登陆，则发送对应的网页
      sendPage(ctx, 200);
  }
}