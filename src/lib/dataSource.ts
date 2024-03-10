import InitSqlJsStatic from "sql.js";
import { DataSource } from "typeorm";

import { Period } from "$lib/typeorm/entities/Period";
import { Visit } from "$lib/typeorm/entities/Visit";
import { SeedPeriodData1710031635474 } from "$lib/typeorm/migrations/SeedPeriodData1710031635474";

export const SqlJsDataSource = new DataSource({
    type: "sqljs",
    location: "static/sql.js/",
    driver: InitSqlJsStatic,
    sqlJsConfig: {
        locateFile: (file: string) => `/sql.js/${file}`
    },
    autoSave: true,
    entities: [Period, Visit],
    migrations: [SeedPeriodData1710031635474],
    logging: ["query", "schema"],
    synchronize: true,
})

