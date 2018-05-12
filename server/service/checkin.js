import crypto from 'crypto';

import * as redisService from './redis';
import { CONF } from '../config';

const port = CONF.port;

/**
 * 生成随机的40位长度的CheckinID
 * 
 * @export
 * @param {any} token 
 * @returns 
 */
export function generateCheckinID(token) {
  return crypto.createHmac('sha1', Date.now().toString())
    .update(token + 'ugnamsung 15331117' + new Date())
    .digest('hex');
}

/**
 * 随机生成4位数的ShareID
 * 
 * @export
 * @returns 
 */
export function generateShareID() {
  return rand(1000, 9999)
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// token checkin_id 
// checkin_id share_id
// share_id checkin_id
/**
 * 
 * 
 * @export
 * @param {any} token 
 * @param {any} minutes 分钟数
 * @returns 
 */
export async function set(token, minutes) {
  var checkin_id = generateCheckinID(token);
  while (await redisService.get(checkin_id)) {
    checkin_id = generateCheckinID(token);
  }

  var share_id = generateShareID(checkin_id);
  while (await redisService.get(share_id)) {
    share_id = generateShareID(checkin_id);
  }

  await redisService.set(token, checkin_id, minutes * 60);
  await redisService.set(checkin_id, share_id, minutes * 60);
  await redisService.set(share_id, checkin_id, minutes * 60);

  return { "checkin_id": checkin_id, "share_id": share_id };
}

export async function getCheckinIDByToken(token) {
  return await redisService.get(token);
}

export async function getCheckinIDByShareID(share_id) {
  return await redisService.get(share_id);
}

export async function getShareIDByCheckinID(checkin_id) {
  return await redisService.get(checkin_id);
}

export async function delByToken(token, checkin_id) {
  await redisService.del(token);
  await redisService.del(await getShareIDByCheckinID(checkin_id));
  await redisService.del(checkin_id);
}

async function del(key) {
  await redisService.del(key);
}


/**
 * 判断是否是在附近的gps
 * 
 * @export
 * @param {any} teacher_gps 
 * @param {any} student_gps 
 * @returns 
 */
export function isNearbyGPS(teacher_gps, student_gps) {
  return true
}
