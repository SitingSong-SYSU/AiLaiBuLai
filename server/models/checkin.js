import { execAsync } from './util';

/**
 * checkin   签到唯一标识
 * token     发起签到人的token
 * date_time 发起签到的时间
 * latitude  纬度
 * longitude 经度
 * 
 * @export
 * @returns 
 */
export async function createCheckinTable() {
  return await execAsync(
    `CREATE TABLE IF NOT EXISTS CHECKIN(
      checkinID      VARCHAR(50) 	PRIMARY KEY NOT NULL,
      token        VARCHAR(255) NOT NULL,
      date_time    DATETIME     DEFAULT CURRENT_TIMESTAMP NOT NULL,
      latitude     DOUBLE 	    NOT NULL,
      longitude    DOUBLE 	    NOT NULL
    )`,
    undefined,
    'create CHECKIN');
}

export async function dropCheckinTable() {
  return await execAsync('DROP TABLE CHECKIN', undefined, 'drop table CHECKIN');
}

// 新增用户
export async function createCheckin(checkin) {
  return await execAsync(`INSERT INTO CHECKIN (checkinID, token, latitude, longitude) VALUES (?, ?, ?, ?)`,
    [checkin.checkinID, checkin.token, checkin.latitude, checkin.longitude],
    'create Checkin ' + JSON.stringify(checkin));
}


