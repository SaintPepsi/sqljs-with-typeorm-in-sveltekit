import { DataSource } from "typeorm";

import { Period } from "$lib/typeorm/entities/Period";
import { Visit } from "$lib/typeorm/entities/Visit";
import { SeedPeriodData0000000000001 } from "$lib/typeorm/migrations/SeedPeriodData";
import InitSqlJsStatic from "sql.js";

export const SqlJsDataSource = new DataSource({
    type: "sqljs",
    database: new Uint8Array(),
    location: "static/sql.js/",
    driver: InitSqlJsStatic,
    sqlJsConfig: {
        locateFile: (file: string) => `/sql.js/${file}`
    },
    autoSave: true,
    entities: [Period, Visit],
    migrations: [SeedPeriodData0000000000001],
    logging: ["query", "schema"],
    synchronize: true,
})