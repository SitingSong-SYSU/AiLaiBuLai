import { sendData } from '../utils';
import { userModel } from '../models';


export function is_login(ctx) {
  const token = ctx.request.header.token;
  if (token) {
    ctx.token = token;
  }
}
