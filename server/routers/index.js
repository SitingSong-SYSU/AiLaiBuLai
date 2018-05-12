import Router from 'koa-router';

import { router as userRouter } from './users';
import { router as checkinRouter } from './checkin';
import { router as shareCheckinRouter } from './share_checkin';

export const router = new Router();

router.use('/users', userRouter.routes(), userRouter.allowedMethods());
router.use('/checkin', checkinRouter.routes(), checkinRouter.allowedMethods());
router.use('/share_checkin', shareCheckinRouter.routes(), shareCheckinRouter.allowedMethods());
