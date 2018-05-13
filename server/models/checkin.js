import { execAsync } from './util';

/**
 * checkin   签到唯一标识
 * title     签到标题
 * token     发起签到人的token
 * datetime  发起签到的时间
 * latitude  纬度
 * longitude 经度
 * 
 * @export
 * @returns 
 */
export async function createCheckinTable() {
  return await execAsync(
    `CREATE TABLE IF NOT EXISTS CHECKIN(
      checkin_id   VARCHAR(50) 	  PRIMARY KEY NOT NULL,
      title        NVARCHAR(255)  NOT NULL,
      token        VARCHAR(255)   NOT NULL,
      datetime     DATETIME       DEFAULT CURRENT_TIMESTAMP NOT NULL,
      latitude     DOUBLE 	      NOT NULL,
      longitude    DOUBLE 	      NOT NULL
    )`, 
    undefined,
    'create CHECKIN');
}

export async function dropCheckinTable() {
  return await execAsync('DROP TABLE CHECKIN', undefined, 'drop table CHECKIN');
}

/**
 * 发布签到
 * 
 * @export
 * @param {any} checkin 
 * @returns 
 */
export async function createCheckin(checkin) {
  return await execAsync(`INSERT INTO CHECKIN (checkin_id, title, token, latitude, longitude) VALUES (?, ?, ?, ?, ?)`,
    [checkin.checkin_id, checkin.title, checkin.token, checkin.latitude, checkin.longitude],
    'create Checkin ' + JSON.stringify(checkin));
}

/**
 * 返回某次签到的 title 和 datetime 信息
 *
 * @export
 * @param {any} checkin_id 
 * @returns 
 */
export async function getInfoByCheckinID(checkin_id) {
  return await execAsync('SELECT title, datetime FROM CHECKIN WHERE checkin_id = ?',
    [checkin_id],
    `select gps by checkin_id ${checkin_id}`);
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
 * 获得某个token所有发起签到历史记录
 * 返回 签到title checkin_id 签到日期【yyyy-mm-dd hh:mm:ss】 签到人数 
 * 按签到日期递减顺序排列
 * 
 * @export
 * @param {any} token 
 * @returns 
 */
export async function getCheckinList(token) {
  return await execAsync(
    `SELECT title, CHECKIN.checkin_id, datetime, checkedin_num
      FROM 
      (SELECT COUNT(token) AS checkedin_num, checkin_id
          FROM CHECKIN_TOKEN
          GROUP BY checkin_id
        ) AS CHECKEDIN_COUNT
      LEFT JOIN CHECKIN
        ON CHECKIN.checkin_id = CHECKEDIN_COUNT.checkin_id
      WHERE CHECKIN.token = ?
    ORDER BY datetime  DESC`,
    [token],
    `get all checkin history by token ${token}`);
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
  console.log('cfghuijok')
  return await execAsync(
    `SELECT USER.id, USER.name, USER.university
      FROM
        CHECKIN_TOKEN
      RIGHT JOIN USER
        ON USER.token = CHECKIN_TOKEN.token
      WHERE CHECKIN_TOKEN.checkin_id = ?
    ORDER BY id`,
    [checkin_id],
    `get a checkin history by checkin_id ${checkin_id}`);
}
