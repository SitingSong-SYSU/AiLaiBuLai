import { execAsync } from './util';

/**
 * checkin   签到唯一标识
 * token     签到人的token
 * 
 * @export
 * @returns 
 */
export async function createCheckinTokenTable() {
  return await execAsync(
    `CREATE TABLE IF NOT EXISTS CHECKIN_TOKEN(
      checkin_id   VARCHAR(50) 	  PRIMARY KEY NOT NULL,
      token        VARCHAR(255)   NOT NULL,
      msg          NVARCHAR(255) 
    )`,
    undefined,
    'create CHECKIN_TOKEN');
}

export async function dropCheckinTokenTable() {
  return await execAsync('DROP TABLE CHECKIN_TOKEN', undefined, 'drop table CHECKIN_TOKEN');
}

/**
 * 进行签到
 * 
 * @export
 * @param {any} checkin_id 
 * @param {any} token 
 * @returns 
 */
export async function createCheckinToken(checkinToken) {
  return await execAsync(`INSERT INTO CHECKIN (checkin_id, token, msg) VALUES (?, ?)`,
    [checkinTokencheckin_id, checkinToken.token, checkinToken.msg],
    'create CHECKIN_TOKEN ' + JSON.stringify(checkinTokencheckin_id, checkinToken.token, checkinToken.msg));
}


/**
 * 返回某次签到的 gps 信息
 * latitude  纬度
 * longitude 经度
 * 
 * @export
 * @param {any} checkin_id 
 * @returns 
 */
export async function getGpsByCheckID(checkin_id) {
  return await execAsync('SELECT latitude, longitude FROM CHECKIN WHERE checkin_id = ?',
    [checkin_id],
    `select gps by checkin_id ${checkin_id}`);
}

/**
 * 获得某个 checkin_id 所有发起签到历史记录
 * 返回 title checkidin数组[id,name,university,msg] 签到人数
 * 按签到日期递减顺序排列
 * 
 * @export
 * @param {any} course_id 
 * @returns 
 */
export async function getCheckinInfo(checkin_id) {
  return await execAsync(
    `SELECT id, name, university, msg
      FROM
        CHECKIN_TOKEN
      LEFT JOIN USER
        ON USER.token = CHECKIN_TOKEN.token
      WHERE checkin_id = ?
    ORDER BY CHECKIN_TOKEN.id`,
    [course_id],
    `get a checkin history by checkin_id ${checkin_id}`);
}
