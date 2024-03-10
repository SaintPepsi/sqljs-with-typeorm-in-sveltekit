# Using sql.js with TypeORM in SvelteKit

This repository provides an example of how to use sql.js with TypeORM in a SvelteKit project.

### To achieve this:

1. [`vite-plugin-static-copy`](https://www.npmjs.com/package/vite-plugin-static-copy) is utilised. It copies `'sql-wasm.wasm'` from `'/node_modules/sql.js/dist/sql-wasm.wasm'` to `'/static/sql.js'`.

2. The `DataSource` config includes the following:

   - `driver` - imported from the sql.js you're using, i.e.:
     ```js
     import InitSqlJsStatic from 'sql.js';
     ```
   - `sqlJsConfig` - locating the file that we use [`vite-plugin-static-copy`](https://www.npmjs.com/package/vite-plugin-static-copy) to copy
   - `location` - the location of the `sql-wasm.wasm`

     ```ts
     export const SqlJsDataSource = new DataSource({
     	type: 'sqljs',
     	location: 'static/sql.js/',
     	driver: InitSqlJsStatic,
     	sqlJsConfig: {
     		locateFile: (file: string) => `/sql.js/${file}`
     	},
     	autoSave: true,
     	entities: [Period, Visit],
     	migrations: [SeedPeriodData0000000000001],
     	logging: ['query', 'schema'],
     	synchronize: true
     });
     ```

3. Update the `vite.config.ts to include the following:
   1. Using terser to keep classnames so migrations still work.

      ```js
      minify: 'terser',
      terserOptions: {
          keep_classnames: true,
      }
      ```

      otherwise you'll get an error about the migrations not having javascript timestamps (since the classes get minified and obscured)

   2. If you're on typescript 5 or or higher add `build.commonjsOptions.transformMixedEsModules: true`:
      ```
      build: {
          commonjsOptions: {
              transformMixedEsModules: true,
          }
      }
      ```

Please feel free to create an issue if you have any suggestions for improvements or alterations.

### Goal

The primary goal was to enable sql.js with TypeORM to function in both development and production builds. Please note that while this repository demonstrates how to get sql.js with TypeORM working, it may not provide the best practices for setting it up or utilizing it in your project.
