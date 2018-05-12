import { createUserTable, dropUserTable } from './users';
import { createCheckin, dropCheckinTable } from './checkin';
import { createCheckinToken, dropCheckinTokenTable } from './checkin_token';
import { createDatabase } from './util';

export async function initDatabase() {
  await createDatabase();
  await createUserTable();
  await createCheckin();
  await createCheckinToken();
}

export async function initDatabaseForTest() {
  await dropCheckinTable();
  await dropCheckinTokenTable();
  await dropUserTable();
  
  await createDatabase();
  await createUserTable();
  await createCheckin();
  await createCheckinToken();
}
