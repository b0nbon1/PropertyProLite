import Model from './Model';
import Db from '../database';

export default class Property extends Model {
    async post() {
        const property = this.payload;
        const values = [property.city, property.state, property.owner, property.address,
            property.type, property.status, property.createdOn, property.imageUrl, property.price];
        const sql = `INSERT INTO properties ( city, state, owner, address, type, status, createdOn, imageUrl, price) 
        VALUES($1, $2, $3, $4, $5 ,$6 ,$7, $8, $9) returning *`;
        const { rows } = await Db.query(sql, values);
        [this.result] = rows;
    }

    async update() {
        const property = this.payload;
        const prop = await Model.findOne('properties', 'id', property.id);
        const update = await Object.assign(prop, property);
        const sql = `UPDATE properties SET city = $1, state = $2, address = $3, type = $4, price = $5 WHERE id = $6 RETURNING *`;
        const values = [update.city, update.state, update.address,
            update.type, update.price, update.id];
        const { rows } = await Db.query(sql, values);
        [this.result] = rows;
    }

    static async checkUser(id, user) {
        const prop = await this.findOne('properties', 'id', id);
        if (prop.owner === user) return true;
        return false;
    }
}