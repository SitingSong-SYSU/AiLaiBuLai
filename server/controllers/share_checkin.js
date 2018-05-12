import fs from 'fs';

import { sendData } from '../utils';
import { checkinCtrl } from '.';
import { checkinModel } from '../models';
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
	const user = ctx.query;
	// TODO 检验gps是否符合要求
	CheckinServ.isNearbyGPS();
	// TODO 检查照片人脸是否匹配，调用api
	fs.writeFile(`${pitcPath}/${ctx.token}v1.jpg`, ctx.request.body, 'utf8', () => {
		await createCheckinToken(user);
		sendData(ctx, 201, JSON.stringify({ msg: '签到成功' }));
	});
}

/**
 * 查看签到活动的名称
 * 
 * @export
 * @param {any} ctx 
 */
export async function getCheckinTitle(ctx) {
	const checkin_id = await checkinCtrl.getCheckinInfo(ctx.params.share_id),
		checkinInfo = await checkinModel.getInfoByCheckID(checkin_id);
	if (!checkin_id || checkinInfo.length === 0) {
		sendData(ctx, 401, JSON.stringify({ msg: "该签到活动不存在" }));
		return;
	}
	sendData(ctx, 200, JSON.stringify(checkinInfo));
}

