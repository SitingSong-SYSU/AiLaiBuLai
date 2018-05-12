import { sendData } from '../utils';
import { userModel, checkinModel, checkinTokenModel } from '../models';

/**
 * 登录
 * 
 * @export
 * @param {any} ctx 
 */
export async function login(ctx) {
    
}

/**
 * 提交个人信息
 * 
 * @export
 * @param {any} ctx 
 */
export async function submitInfo(ctx) {
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
 * 上传个人照片
 * 
 * @export
 * @param {any} ctx 
 */
export async function uploadPicture(ctx) {
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