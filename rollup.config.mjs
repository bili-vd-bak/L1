import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
// import pkg from "./package.json";
import { readFileSync } from "fs";
const pkg = JSON.parse(
  readFileSync(new URL("./package.json", import.meta.url), "utf8")
);
// import { getBabelOutputPlugin } from "@rollup/plugin-babel";
// const path = require("path");

// const babelPluginForUmd = getBabelOutputPlugin({
//   configFile: path.resolve(__dirname, "./src/.babelrc.umd.json"),
//   allowAllFormats: true,
// });

// const babelPluginForEsm = getBabelOutputPlugin({
//   configFile: path.resolve(__dirname, "./src/.babelrc.esm.json"),
//   allowAllFormats: true,
// });

const footer = `
if(typeof window !== 'undefined') {
  window._L1_VERSION_ = '${pkg.version}'
}`;

// ---cut-start---
/** @type {import('rollup').RollupOptions} */
// ---cut-end---
export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      footer,
    },
    {
      file: "dist/index.min.js",
      format: "iife",
      name: "L1",
      plugins: [terser()],
      footer,
    },
    {
      file: pkg.browser,
      format: "umd",
      name: "L1",
      footer,
    },
    {
      file: "dist/index.umd.min.js",
      format: "umd",
      name: "L1",
      plugins: [terser()],
      footer,
    },
    {
      file: pkg.module,
      format: "esm",
      footer,
    },
    {
      file: "dist/index.esm.min.js",
      format: "esm",
      plugins: [terser()],
      footer,
    },
  ],
  external: [pkg.peerDependencies, pkg.dependencies],
  plugins: [
    json(),
    commonjs(),
    resolve(),
    typescript({
      outDir: "dist",
      declaration: true,
      declarationDir: "dist",
    }),
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**", // 只编译我们的源代码
    }),
  ],
};
