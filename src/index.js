import React from 'react';
import Navigator from './navigations';

// THIS IS LEFT HERE FOR DEMOSTRATION ON HOW TO IMPORT DATABASE INTO YOUR PAGES
/*
import databaseValue  from '../database.json';

const { CosmosClient } = require("@azure/cosmos");

const endpoint = databaseValue.endpoint;
const key = databaseValue.key;
const client = new CosmosClient({ endpoint, key });

async function main() {
    const { database } = await client.databases.createIfNotExists({ id: "ToDoList" });
    const { container } = await database.containers.createIfNotExists({ id: "Items" });
}

main().catch((error) => {
  console.error(error);
});
*/


const Index = () => {
    return (
        <Navigator />
    );
}

export default Index;