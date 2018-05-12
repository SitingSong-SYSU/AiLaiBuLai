import * as sessionService from './session';
import { userModel } from '../../models';
import { sendData, sendPage } from '../../utils';
import { userModel } from '../models';

export async function is_login(ctx) {
  const token = ctx.request.header.token;
  
  if (users.length !== 1) {
    ctx.is_manager = users[0].is_manager;
    ctx.user_id = user_id;
  }
}
