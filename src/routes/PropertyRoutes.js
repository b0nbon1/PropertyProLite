import express from 'express';
import fileupload from 'express-fileupload';
import Property from '../controllers/PropertyController';
import Validations from '../utils/middleware/validators';
import Token from '../utils/middleware/Auth';

const route = express.Router();

route.use(fileupload({ useTempFiles: true }));
route.post('/property', Validations.property, Token.userToken, Property.Post);

export default route;
