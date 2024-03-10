import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';
import { defineConfig, normalizePath } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({

    plugins: [
        viteStaticCopy({
            targets: [

                {
                    src: normalizePath(path.join(__dirname, '/node_modules/sql.js/dist/sql-wasm.wasm')),
                    dest: normalizePath(path.join(__dirname, '/static/sql.js'))
                },
            ]
        }),
        // replace([
        //     {
        //         filter: /\.ts$/,
        //         replace: {
        //             from: /typeorm/g,
        //             to: 'typeorm/browser'
        //         }
        //     }
        // ]),
        sveltekit()
    ],
    build: {
        commonjsOptions: {
            transformMixedEsModules: true,
        }
    },
    ssr: {
        external: ['reflect-metadata'],
    },
});
