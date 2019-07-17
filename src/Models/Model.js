import Db from '../database';

export default class Model {
    constructor(payload = null) {
        this.payload = payload;
        this.result = null;
    }

    static async findOne(table, entity, value) {
        const sql = `SELECT * FROM ${table} WHERE ${entity}='${value}'`;
        const { rows } = await Db.query(sql);
        return rows[0];
    }
}
