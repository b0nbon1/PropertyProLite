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
                // console.log(res);
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
            await this.query(this.tableProperty);
            await this.query(this.tableFlag);
        } catch (error) {
            return error.toString();
        }
    }

    async dropTables() {
        await this.query(this.dropFlag);
        await this.query(this.dropProperty);
        await this.query(this.dropUsers);
    }
}

export default new DBInit();
