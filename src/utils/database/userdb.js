// Database stuff
import databaseValue  from '../../../database.json';

const { CosmosClient } = require("@azure/cosmos");

const endpoint = databaseValue.endpoint;
const key = databaseValue.key;
const client = new CosmosClient({ endpoint, key });

// Open DB
/*
async function main() {
    const { database } = await client.databases.createIfNotExists({ id: "aap" });
    const { container } = await database.containers.createIfNotExists({ id: "User" });
}
*/

// Add User
async function addUser(user) {
    const { database } = await client.databases.createIfNotExists({ id: "aap" });
    const { container } = await database.containers.createIfNotExists({ id: "User" });

    container.items.create(user);
}

// Specific User
const getUser = async (email) => {
    let userList = [];

    const { database } = await client.databases.createIfNotExists({ id: "aap" });
    const { container } = await database.containers.createIfNotExists({ id: "User" });

    const { resources } = await container.items
    .query({
        query: "SELECT * FROM c WHERE c.email = @email",
        parameters: [
            { name: "@email", value: email }
        ]
    })
    .fetchAll();

    return resources;
}

export default { addUser, getUser };