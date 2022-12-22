const client = require("./client");

async function dropTables() {
    try {

        await client.query(`
        DROP TABLE IF EXISTS cart_item;  
        DROP TABLE IF EXISTS cart;  
        DROP TABLE IF EXISTS products;
        DROP TABLE IF EXISTS users;
        `)

    } catch (error) {
        console.error("Error dropping tables!");
        throw error;
    }
}

async function createTables() {
    try {
        
        await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY, 
            username varchar(255) NOT NULL, 
            password varchar(255) NOT NULL,
            name varchar(255) NOT NULL,
            email varchar(255)NOT NULL,
            isAdmin BOOLEAN DEFAULT false,
            UNIQUE(username,email)
        );
        `);

        await client.query(`
        CREATE TABLE products (
            id SERIAL PRIMARY KEY,
            name varchar(255) UNIQUE NOT NULL,
            price varchar(255) NOT NULL,
            active BOOLEAN DEFAULT true
        );
        `);

        await client.query(`
        CREATE TABLE cart (
            id SERIAL PRIMARY KEY,
            user_id varchar(255) NOT NULL,
            isActive BOOLEAN DEFAULT true
        );
        `);
        await client.query(`
        CREATE TABLE cart_item (
            id SERIAL PRIMARY KEY, 
            "productId" INTEGER REFERENCES products(id),
            "cartId" INTEGER REFERENCES cart(id),
            price varchar(255)
        ); 
        `);

    } catch (error) {
        console.error("Error building tables!");
        throw error;
    }
}



rebuildDB()
    .then(testDB)
    .catch(console.error)
    .finally(() => client.end())