import { Router } from 'express';
import salesController from '../controllers/SalesController';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.post('/', loginRequired, salesController.store);

export default router;
