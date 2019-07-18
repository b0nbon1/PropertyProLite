import { config } from 'dotenv';

config();
const env = process.env.NODE_ENV;

const DB = {
    development: process.env.DBURL,
    test: process.env.DBURL_TEST,
    production: process.env.DATABASE_URL,
};

export default DB[env];
