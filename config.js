import { config } from 'dotenv';

config();
const env = process.env.NODE_ENV;

const DB = {
    development: process.env.DBURL,
    test: process.env.DBURL_TEST,
    production: process.env.DBURL_PROD,
};

export default DB[env];
