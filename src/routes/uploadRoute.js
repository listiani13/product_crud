// @flow

import {Router} from 'express';
import {deleteFile, getFile, uploadFiles} from '../controller/uploadController';

let uploadRouter = Router();
uploadRouter.post('/', uploadFiles);
uploadRouter.get('/:id', getFile);
uploadRouter.delete('/:id', deleteFile);

export default uploadRouter;
