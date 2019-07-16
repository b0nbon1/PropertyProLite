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
        this.tableProperty = `CREATE TABLE IF NOT EXISTS properties(
            id serial PRIMARY KEY,
            owner INTEGER NOT NULL,
            city VARCHAR(128) NOT NULL,
            state VARCHAR(128) NOT NULL,
            price DECIMAL NOT NULL,
            address VARCHAR(128) NOT NULL,
            type VARCHAR(128) NOT NULL,
            status VARCHAR(128) NOT NULL,
            createdOn VARCHAR(128) NOT NULL,
            imageUrl VARCHAR(100),
            FOREIGN KEY (owner) REFERENCES users (id) ON DELETE CASCADE
          )`;
        this.tableFlag = `CREATE TABLE IF NOT EXISTS flags(
            id serial PRIMARY KEY,
            propertyId INTEGER NOT NULL,
            createdOn VARCHAR(128) NOT NULL,
            reason VARCHAR(128) NOT NULL,
            description VARCHAR(128) NOT NULL,
            FOREIGN KEY (propertyId) REFERENCES users (id) ON DELETE CASCADE
          )`;

        this.dropUsers = 'DROP TABLE IF EXISTS users';
    }
}
