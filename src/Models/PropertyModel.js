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

    static async checkUser(id, user) {
        const [prop] = await this.findOne('properties', 'id', id);
        if (prop.owner === user) return true;
        return false;
    }

    async report() {
        const report = this.payload;
        const values = [report.reason, report.createdOn, report.description, report.propertyId];
        const sql = `INSERT INTO flags ( reason, createdOn, description, propertyId) 
        VALUES($1, $2, $3, $4) returning *`;
        const { rows } = await Db.query(sql, values);
        console.log(rows);
        [this.result] = rows;
    }
}
