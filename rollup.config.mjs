import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import dts from 'rollup-plugin-dts';

/** @type {import('rollup').RollupOptions[]} */
export default [
	// JS builds: ESM + CJS
	{
		input: 'src/index.ts',
		output: [
			{ file: 'dist/index.esm.js', format: 'esm', sourcemap: true },
			{ file: 'dist/index.cjs.js', format: 'cjs', sourcemap: true, exports: 'named' },
		],
		external: ['react', 'react-dom', 'tslib'],
		plugins: [
			resolve(),
			commonjs(),
			typescript({ tsconfig: './tsconfig.json', declaration: true, declarationDir: 'dist' }),
			postcss({ modules: true, extract: false, use: ['sass'] }),
		],
	},
	// Types bundle (.d.ts)
	{
		input: 'dist/index.d.ts',
		output: [{ file: 'dist/index.d.ts', format: 'es' }],
		plugins: [dts()],
	},
];
