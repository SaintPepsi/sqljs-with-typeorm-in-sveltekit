import { initialiseDatabase } from "$lib/utilities/initialiseDatabase";

initialiseDatabase().catch((error) => {
    console.error(error);
    throw new Error('db initialisation failed. reducing app capabilities');
    // We need to set some variable to not allow users to interact with the database
});