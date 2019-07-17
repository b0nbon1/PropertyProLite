import Db from '../database';
import Model from './Model';

export default class User extends Model {
    async register() {
        const user = this.payload;
        const values = [user.email, user.firstname, user.lastname, user.password,
            user.address, user.isAdmin, user.phoneNumber];
        const sql = `INSERT INTO users ( email, firstname, lastname, password, address, isAdmin, phoneNumber) 
        VALUES($1, $2, $3, $4, $5 ,$6 ,$7) returning *`;
        const { rows } = await Db.query(sql, values);
        [this.result] = rows;
    }

    async login() {
        const user = this.payload;
        const [obj] = await Model.findOne('users', 'email', user);
        this.result = obj;
    }
}
