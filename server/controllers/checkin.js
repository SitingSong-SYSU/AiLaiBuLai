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
	if (await CheckinServ.getCheckinIDByToken(ctx.token) !== nil) {
		sendData(ctx, 401, JSON.stringify({ msg: '有签到正在进行，发起签到失败' }));
		return;
	}

	const checkin = ctx.request.body,
		ids = await CheckinServ.set(ctx.token, ctx.request.body.limit_time);
	checkin.checkin = ids.checkin_id;

	await checkinModel.createCheckin(checkin);
	sendData(ctx, 201, JSON.stringify(ids.share_id));
}

/**
 * 点击结束签到
 * 
 * @export
 * @param {any} ctx 
 */
export async function stopCheckin(ctx) {
	// 检查是否存在正在进行的签到
	if (await CheckinServ.getCheckinIDByToken(ctx.token) === nil) {
		sendData(ctx, 401, JSON.stringify({ msg: '没有签到正在进行，停止签到失败' }));
		return;
	}

	await CheckinServ.delByToken(ctx.token);
	sendData(ctx, 204);
}

/**
 * 具体每个签到信息
 * 
 * @export
 * @param {any} ctx 
 */
export async function getCheckinInfo(ctx) {
	sendData(ctx, 200, await checkinModel.getCheckinInfo(ctx.token));
}