import user from './UserRoutes';
import Res from '../utils/helpers/responses';

const prefix = '/api/v1';

const router = (app) => {
    app.use(prefix, user);
    // Res.handleError below acts as success
    app.get('/', (req, res) => Res.handleOk(200, 'Welcome to Property Pro Lite', res));
    app.use('*', (req, res) => Res.handleOk(405, 'Invalid route or Method', res));
};

export default router;
