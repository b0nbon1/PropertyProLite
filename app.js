import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
// eslint-disable-next-line import/no-extraneous-dependencies
import '@babel/polyfill';
import swaggerUi from 'swagger-ui-express';
import router from './src/routes';
import DB from './src/database';

const Docs = require('./Docs/swagger.json');

DB.initDb();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

app.use('/api/v2/docs', swaggerUi.serve, swaggerUi.setup(Docs));
router(app);

export default app;
