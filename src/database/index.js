import { Pool } from 'pg';
import DBURL from '../../config';
import Queries from './queries';

class DBInit extends Queries {
    constructor() {
        super();
        this.client = new Pool({ connectionString: DBURL });
    }

    async query(sql, data = []) {
        try {
            const conn = await this.client.connect();
            if (data.length) {
                const res = await conn.query(sql, data);
                return res;
            }
            const result = await conn.query(sql);
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
    }
}

export default new DBInit();
