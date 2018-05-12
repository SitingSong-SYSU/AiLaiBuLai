import { execAsync } from './util';

/**
 * token 微信唯一标识
 * name 姓名
 * id 学号
 * university 校名
 * @export
 * @returns 
 */
export async function createUserTable() {
  return await execAsync(
    `CREATE TABLE IF NOT EXISTS USER(
      token      VARCHAR(255)  PRIMARY KEY NOT NULL,
      name       NVARCHAR(50)  NOT NULL,
      id         VARCHAR(50)   NOT NULL,
      university NVARCHAR(50)  NOT NULL
    )`,
    undefined,
    'create USER');
}

export async function dropUserTable() {
  return await execAsync('DROP TABLE USER', undefined, 'drop table USER');
}

// 新增用户
export async function createUser(user) {
  return await execAsync(`INSERT INTO USER (token, name, id，university) VALUES (?, ?, ?, ?)`,
    [user.token, user.name, user.id, user.university],
    'create user ' + JSON.stringify(user));
}
