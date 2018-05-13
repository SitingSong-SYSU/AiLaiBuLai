import fs from 'fs';

import { sendData } from '../utils';
import { checkinCtrl } from '.';
import { checkinModel, checkinTokenModel } from '../models';
import { CheckinServ } from '../service';
import { CONF } from '../config';
import { createCheckinToken } from '../models/checkin_token';

const port = CONF.port;
/**
 * 参与签到
 * 
 * @export
 * @param {any} ctx 
 */
export async function checkin(ctx) {
	const token = ctx.request.header.token;
	if (!token) {
		sendData(ctx, 401, JSON.stringify({ msg: '请先登陆' }));
		return;
	}
	ctx.token = token;

	// 判断该签到活动是否存在
	const checkin_id = await CheckinServ.getCheckinIDByShareID(ctx.params.share_id);
	if (!checkin_id) {
		sendData(ctx, 400, JSON.stringify({ msg: '该签到活动可能已过期' }));
		return;
	}

	// 获得发起人和签到人的gps
	const checkined_gps = ctx.query,
		checkin_gps = await checkinModel.getGpsByCheckinID(checkin)[0];

	// 检验gps是否符合要求
	if (!CheckinServ.isNearbyGPS(checkined_gps, checkin_gps)) {
		sendData(ctx, 400, JSON.stringify({ msg: '距离过远无法进行签到' }));
		return;
	}

	// 检查照片人脸是否匹配，调用api
	fs.writeFileSync(`${pitcPath}/${ctx.token}v1.jpg`, ctx.request.body.photo, 'utf8')
	if (!CheckinServ.isFaceMatch(token)) {
		sendData(ctx, 400, JSON.stringify({ msg: '人脸匹配失败无法进行签到' }));
		return;
	}

	if ((await checkinTokenModel.createCheckinToken(checkined_gps)).length === 1) {
		sendData(ctx, 201, JSON.stringify({ msg: '签到成功' }));
	} else {
		sendData(ctx, 400, JSON.stringify({ msg: '签到失败' }));
	}

}

/**
 * 查看签到活动的名称
 * 
 * @export
 * @param {any} ctx 
 */
export async function getCheckinTitle(ctx) {
	const token = ctx.request.header.token;
	if (!token) {
		sendData(ctx, 401, JSON.stringify({ msg: '请先登陆' }));
		return;
	}
	ctx.token = token;
	const checkin_id = await CheckinServ.getCheckinIDByShareID(ctx.params.share_id);
	const checkinInfo = await checkinModel.getInfoByCheckinID(checkin_id);
	if (!checkin_id || checkinInfo.length === 0) {
		sendData(ctx, 400, JSON.stringify({ msg: "该签到活动不存在" }));
		return;
	}
	sendData(ctx, 200, JSON.stringify(checkinInfo[0]));
}

