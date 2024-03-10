import { databaseReady } from "$lib/data/databaseReady";
import { SqlJsDataSource } from "$lib/dataSource";


export async function initialiseDatabase() {
    try {
        console.log('initialising database');
        console.log('SqlJsDataSource', SqlJsDataSource);
        await SqlJsDataSource.initialize();
        await SqlJsDataSource.runMigrations();

        databaseReady.set(true);
    } catch (error) {
        console.error(error);
        throw new Error('Unable to connect to db');
    }
}
