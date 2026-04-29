/**
 * Helper to create a standard CRUD router that:
 *  - GET  /          → getAll  (public)
 *  - GET  /:id       → getOne  (public)
 *  - POST /          → create  (admin)
 *  - PUT  /:id       → update  (admin)
 *  - DELETE /:id     → remove  (admin)
 */
import { Router } from 'express';
import { protect } from '../middleware/auth.js';
import { createCRUD } from '../controllers/crudFactory.js';

export const buildRouter = (Model) => {
  const router = Router();
  const { getAll, getOne, create, update, remove } = createCRUD(Model);

  router.get('/', getAll);
  router.get('/:id', getOne);
  router.post('/', protect, create);
  router.put('/:id', protect, update);
  router.delete('/:id', protect, remove);

  return router;
};
