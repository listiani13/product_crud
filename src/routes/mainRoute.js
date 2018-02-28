// @flow

import {Router} from 'express';
import {
  getAllProducts,
  getProduct,
  addNewProduct,
  editProduct,
  deleteProduct,
} from '../controller/crudController';

let mainRouter = Router();

mainRouter.get('/', getAllProducts);

mainRouter.get('/:id', getProduct);

mainRouter.post('/', addNewProduct);

mainRouter.put('/:id', editProduct);

mainRouter.delete('/:id', deleteProduct);

export default mainRouter;
