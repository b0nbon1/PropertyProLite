import express from 'express';
import fileupload from 'express-fileupload';
import Property from '../controllers/PropertyController';
import Validations from '../utils/middleware/validators';
import Token from '../utils/middleware/Auth';
import Res from '../utils/helpers/responses';

const route = express.Router();

route.use(fileupload({ useTempFiles: true }));
route.post('/property', Validations.property, Token.userToken, Property.Post);
route.patch('/property/:property_id', Token.userToken,
    Validations.update, Validations.checkId, Validations.owner, Property.Update);
route.get('/properties', Validations.getAll, Property.getAll);
route.get('/property', Validations.type, Property.specType);
route.get('/property/:property_id', Validations.checkId, Property.getOne);
route.patch('/property/:property_id/sold', Token.userToken, Validations.checkId, Validations.owner, Property.markSold);
route.delete('/property/:property_id', Token.userToken, Validations.checkId, Validations.owner, Property.delProperty);
route.post('/property/:property_id/flag', Token.userToken, Validations.checkId, Validations.report, Property.report);
route.all('/:i(property|property/:id|properties|property/:id/sold|property/:id/flag)', (req, res) => Res.handleError(405, 'Invalid Method', res));

export default route;
