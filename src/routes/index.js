import user from './UserRoutes';
import property from './PropertyRoutes';
import Res from '../utils/helpers/responses';

const prefix = '/api/v2';

const router = (app) => {
    app.use(prefix, user);
    app.use(prefix, property);
    app.get('/', (req, res) => Res.handleOk(200, 'Welcome to Property Pro Lite', res));
    app.use('*', (req, res) => Res.handleError(404, 'Invalid route', res));
};

export default router;
