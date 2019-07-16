import { config } from 'dotenv';

config();
let DBUrl;

const db = () => {
    if (process.env.NODE_ENV === 'development') {
        console.log('development');
        // eslint-disable-next-line prefer-destructuring
        DBUrl = process.env.DBURL;
    } else if (process.env.NODE_ENV === 'test') {
        console.log('test');
        DBUrl = process.env.DBURL_TEST;
    } else {
        console.log('Production');
        DBUrl = 'postgresql://postgres:postgres@localhost/try';
    }
    return DBUrl;
};

export default db();
