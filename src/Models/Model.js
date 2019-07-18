import Db from '../database';

export default class Model {
    constructor(payload = null) {
        this.payload = payload;
        this.result = null;
    }

    static async findOne(table, entity, value) {
        const sql = `SELECT * FROM ${table} WHERE ${entity}='${value}'`;
        const { rows } = await Db.query(sql);
        return rows;
    }

    async update(table, value) {
        const property = this.payload;
        const sql = `UPDATE ${table} SET ${value} = $1 WHERE id = $2 RETURNING *`;
        const key = Object.keys(this.payload)[1];
        const values = [property[key], property.id];
        const { rows } = await Db.query(sql, values);
        [this.result] = rows;
    }
}
