import { execAsync } from './util';


/**
 * token 微信唯一标识
 * name
 * @export
 * @returns 
 */
export async function createUserTable() {
  return await execAsync(
    `CREATE TABLE IF NOT EXISTS USER(
      token    VARCHAR(50)   PRIMARY KEY NOT NULL,
      username   NVARCHAR(50)  NOT NULL,
      password   VARCHAR(50)   NOT NULL,
      is_manager TINYINT(1)	   DEFAULT 0 NOT NULL
    )`,
    undefined,
    'create USER');
}

export async function dropUserTable() {
  return await execAsync('DROP TABLE USER', undefined, 'drop table USER');
}