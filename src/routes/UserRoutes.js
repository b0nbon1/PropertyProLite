import express from 'express';
import Authentication from '../controllers/AuthController';
import Validation from '../utils/middleware/validators';
import Res from '../utils/helpers/responses';

const route = express.Router();

route.post('/auth/signup', Validation.user, Authentication.register);
route.post('/auth/login', Validation.login, Authentication.loginUser);
route.all('/auth/:i(signup|login)', (req, res) => Res.handleError(405, 'Invalid Method', res));

export default route;
