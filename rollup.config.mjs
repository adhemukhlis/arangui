import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import dts from 'rollup-plugin-dts';

/** External semua varian react (react, react-dom, react/jsx-runtime) + tslib */
const externalMatcher = (id) => /^react(\/|$)/.test(id) || /^react-dom(\/|$)/.test(id) || id === 'tslib';

/** JS builds (ESM + CJS) */
const jsBuild = {
	input: 'src/index.ts',
	output: [
		{ file: 'dist/index.esm.js', format: 'esm', sourcemap: true },
		{ file: 'dist/index.cjs.js', format: 'cjs', sourcemap: true, exports: 'named', interop: 'auto' },
	],
	external: externalMatcher,
	plugins: [
		resolve(),
		commonjs(),
		typescript({ tsconfig: './tsconfig.json' }),
		postcss({
			modules: true,
			extract: false, // inline CSS sebagai string (biar 1 file dipakai consumer)
			use: ['sass'],
		}),
	],
};

/** Types (.d.ts) bundle */
const dtsBuild = {
	input: 'dist/index.d.ts',
	output: [{ file: 'dist/index.d.ts', format: 'es' }],
	external: externalMatcher,
	plugins: [dts()],
};

export default [jsBuild, dtsBuild];
