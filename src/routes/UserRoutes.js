import express from 'express';
import Authentication from '../controllers/AuthController';
import Validation from '../utils/middleware/validators';

const route = express.Router();

route.post('/auth/signup', Validation.user, Authentication.register);

export default route;
