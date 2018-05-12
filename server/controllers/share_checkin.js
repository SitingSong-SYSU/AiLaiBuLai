import { sendData } from '../utils';

/**
 * 参与签到
 * 
 * @export
 * @param {any} ctx 
 */
export async function checkin(ctx) {
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
 * 查看签到活动的名称
 * 
 * @export
 * @param {any} ctx 
 */
export async function getCheckinTitle(ctx) {
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

