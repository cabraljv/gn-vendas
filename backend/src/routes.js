import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import CategoryController from './app/controllers/CategoryController';
import ProductController from './app/controllers/ProductController';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import auth from './app/middlewares/auth';
import SaleController from './app/controllers/SaleController';

const routes = Router();
const upload = multer(multerConfig);

routes.get('/', (req, res) => {
  res.send('OK');
});

routes.post('/user', UserController.store);
routes.post('/session', SessionController.store);

routes.get('/products', ProductController.index);
routes.get('/products/:id', ProductController.show);
routes.get('/categories', CategoryController.index);

routes.use(auth);

routes.post('/products', upload.single('img'), ProductController.store);
routes.post('/categories', CategoryController.store);
routes.get('/admin/products', ProductController.admin_index);
routes.get('/admin/sales', SaleController.index);

routes.get('/sale', SaleController.index_user);
routes.post('/sale', SaleController.store);

export default routes;
