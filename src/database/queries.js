export default class Queries {
    constructor() {
        this.tableUsers = `CREATE TABLE IF NOT EXISTS users(
            id serial PRIMARY KEY,
            email VARCHAR(128) NOT NULL,
            firstname VARCHAR(128) NOT NULL,
            lastname VARCHAR(128) NOT NULL,
            password VARCHAR(128) NOT NULL,
            address VARCHAR(128) NOT NULL,
            phoneNumber VARCHAR(128) NOT NULL,
            isAdmin VARCHAR(100)  NOT NULL
          )`;
        this.dropUsers = 'DROP TABLE IF EXISTS users';
    }
}
