import { Router } from 'express';
import clientsController from '../controllers/ClientsController';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.post('/', loginRequired, clientsController.store);
router.get('/', loginRequired, clientsController.index);
router.delete('/:id', loginRequired, clientsController.delete);
router.put('/:id', loginRequired, clientsController.update);
router.get('/:id', loginRequired, clientsController.show);

export default router;
