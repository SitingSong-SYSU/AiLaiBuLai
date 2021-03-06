import fs from 'fs';

import { sendData } from '../utils';
import { userModel } from '../models';
import { TokenServ } from '../service';
import { CONF } from '../config';

const pitcPath = CONF.pitcPath;
/**
 * 登录
 * 
 * @export
 * @param {any} ctx 
 */
export async function login(ctx) {
    ctx.response.set('Token', await TokenServ.generateToken(ctx.request.body.code));
    ctx.response.status = 201;
}

/**
 * 提交个人信息
 * 
 * @export
 * @param {any} ctx 
 */
export async function submitInfo(ctx) {
    const token = ctx.request.header.token;
    if (!token) {
        sendData(ctx, 400, JSON.stringify({ msg: '请先登陆' }));
        return;
    } 
    ctx.token = token;
    const user = ctx.request.query;
    user.token = ctx.token;
    const users = await userModel.getUser(ctx.token);
    
    if (users.length !== 0) {
        sendData(ctx, 400, JSON.stringify({ msg: '已提交过个人信息' }));
        return;
    }

    if (await userModel.createUser(user))   ;
    
    fs.writeFileSync(`${pitcPath}/${ctx.token}.jpg`, ctx.request.body.photo, 'utf8');
    
    sendData(ctx, 201, JSON.stringify({ msg: '提交个人信息成功' }));
}
