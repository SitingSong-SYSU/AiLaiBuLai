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
      name       NVARCHAR(50)  ,
      id         VARCHAR(50)   ,
      university NVARCHAR(50)  
    )`,
    undefined,
    'create USER');
}

export async function dropUserTable() {
  return await execAsync('DROP TABLE USER', undefined, 'drop table USER');
}

// 新增用户
export async function createUser(user) {
  // INSERT INTO USER (user_id, username, password) VALUES (?, ?, ?)
  return await execAsync(`INSERT INTO USER (token, name, id, university) VALUES (?, ?, ?, ?)`,
    [user.token, user.name, user.id, user.university],
    'create user ' + JSON.stringify(user));
}

export async function getUser(token) {
  return await execAsync(`SELECT name, id, university FROM USER WHERE token = ?`,
    [token],
    'get user by token ' + token);
}
