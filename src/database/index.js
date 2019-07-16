import { Pool } from 'pg';
import DBURL from '../../config';
import Queries from './queries';

let conn;

class DBInit extends Queries {
    constructor() {
        super();
        this.pool = new Pool({ connectionString: DBURL });
    }

    async query(sql, data = []) {
        try {
            conn = await this.pool.connect();
            if (data.length) {
                const res = await conn.query(sql, data);
                conn.release();
                return res;
            }
            const result = await conn.query(sql);
            conn.release();
            return result;
        } catch (err) {
            return err.toString();
        }
    }

    async initDb() {
        try {
            await this.query(this.tableUsers);
        } catch (error) {
            return error.toString();
        }
    }

    async dropTables() {
        await this.query(this.dropUsers);
        console.log('Drop db, disconnected');
    }
}

export default new DBInit();
