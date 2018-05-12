import * as sessionService from './session';
import { userModel } from '../../models';
import { sendData, sendPage } from '../../utils';
import { userModel } from '../models';

export async function is_login(ctx) {
  const token = ctx.request.header.token;
  if (!token) {
    ctx.token = token;
  }
}
