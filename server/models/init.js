import { createUserTable, dropUserTable } from './users';
import { createCheckinTable, dropCheckinTable } from './checkin';
import { createCheckinTokenTable, dropCheckinTokenTable } from './checkin_token';
import { createDatabase } from './util';
import { logger } from '../utils';

export async function initDatabase() {
  try {
    await createDatabase();
    await createUserTable();
    await createCheckinTable();
    await createCheckinTokenTable();
  } catch (err) {
    logger.error(err);
    process.exit(-1);
  }
}

export async function initDatabaseForTest() {
  await dropCheckinTable();
  await dropCheckinTokenTable();
  await dropUserTable();

  await createDatabase();
  await createUserTable();
  await createCheckinTable();
  await createCheckinTokenTable();
}
