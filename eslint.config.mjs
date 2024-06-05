import globals from "globals";
import pluginJs from "@eslint/js";
import airbnb from "eslint-config-airbnb-base"


export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  {
    ignores: ['temp.js', 'webpack.config.js', 'eslint.config.js', 'dist/*'],
  },
  {
    plugins: { airbnb },
  },
];