import { Router } from 'express';
import productsController from '../controllers/ProductsController';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.post('/', loginRequired, productsController.store);
router.get('/', loginRequired, productsController.index);
router.delete('/:id', loginRequired, productsController.delete);
router.put('/:id', loginRequired, productsController.update);
router.get('/:id', loginRequired, productsController.show);

export default router;
