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

// Get Specific User
const getUser = async (email) => {
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

// Update User Info
const updateUserDetails = async (email, username, birthday, contact, address) => {
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

    const user = resources[0];

    user.username = username;
    user.birthday = birthday;
    user.contact = contact;
    user.address = address;

    await container.items.upsert(user);
}

// Update User Password
const updateUserPassword = async (email, password) => {
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

    const user = resources[0];
    
    user.password = password;

    container.items.upsert(user);
}

export default { addUser, getUser, updateUserDetails, updateUserPassword };