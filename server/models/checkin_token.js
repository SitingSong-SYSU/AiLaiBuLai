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
      token        VARCHAR(255)   NOT NULL
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
  return await execAsync(`INSERT INTO CHECKIN (checkin_id, token) VALUES (?, ?)`,
    [checkinToken.checkin_id, checkinToken.token],
    'create CHECKIN_TOKEN ' + JSON.stringify(checkinToken));
}

