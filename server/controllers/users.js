import fs from 'fs';

import { sendData } from '../utils';
import { userModel, checkinModel, checkinTokenModel } from '../models';
import { TokenServ } from '../service';

/**
 * 登录
 * 
 * @export
 * @param {any} ctx 
 */
export async function login(ctx) {
    ctx.response.set('Token', await TokenServ.generateToken(ctx.body.code));
    ctx.response.status = 201;
}

/**
 * 提交个人信息
 * 
 * @export
 * @param {any} ctx 
 */
export async function submitInfo(ctx) {
    const user = ctx.body,
    const users = await userModel.getUser(user.token);
    if (users.length !== 0) {
        sendData(ctx, 401, JSON.stringify({ msg: '已提交过个人信息' }));
        return;
    }
    user.token = ctx.request.header.token;
    await userModel.createUser(user);
    sendData(ctx, 201, JSON.stringify({ msg: '提交个人信息成功' }));
}

// TODO 未知是否可用
/**
 * 上传个人照片
 * 
 * @export
 * @param {any} ctx 
 */
export async function uploadPicture(ctx) {
    fs.writeFileSync(ctx.token + '.jpg', ctx.request.body, 'utf8');
    sendData(ctx, 201, JSON.stringify({ msg: '照片上传成功' }));
}
