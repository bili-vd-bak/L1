import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.browser } },
  {
    ignores: [
      "*.config.{js,mjs,cjs,ts}",
      "__test__/**",
      "test/**",
      "dist/**",
      "types/**",
    ],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
