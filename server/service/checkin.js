import crypto from 'crypto';
import * as redisService from './redis';
import { CONF } from '../config';

const port = CONF.port;
const pitcPath = CONF.pitcPath;

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
 * latitude  纬度
 * longitude 经度
 * @returns 
 */
export function isNearbyGPS(teacher_gps, student_gps) {
  if (math.abs(teacher_gps.latitude - student_gps.latitude) < 1.0 && math.abs(teacher_gps.longitude - student_gps.longitude) < 1.0) {
    return true;
  } else {
    return false;
  }
}
/**
 * 是否人脸匹配 
 * 两个图片位置：${pitcPath}/${token}.jpg 和 ${pitcPath}/${token}v1.jpg
 * 
 * @export
 * @param {any} token 
 */
export function isFaceMatch(token) {
  var libpath = '../tencentyoutuyun';

  //var tencentyoutuyun = require('./tencentyoutuyun');
  var conf = require(libpath + '/conf.js');
  var youtu = require(libpath + '/youtu.js');
  var auth = require(libpath + '/auth.js');

  var appid = '10130588';
  var secretId = 'AKIDviKl17tmLn6D8rJn3NYYMzRinzFOA9uY';
  var secretKey = 'mbLvKIC3kLl15yhFdqwqZ7Ugt8MQJ1Yu';
  var userid = '626531215';

  conf.setAppInfo(appid, secretId, secretKey, userid, 0)


  youtu.facecompare(`${pitcPath}/${token}.jpg`, `${pitcPath}/${token}v1.jpg`, function (data) {
    if (data && data.data && data.data.similarity && data.data.similarity > 50) {
      return true;
    } else {
      return false;
    }
  });

}
