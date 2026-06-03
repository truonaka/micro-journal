const js = require("@eslint/js");
const globals = require("globals");
const pluginReact = require("eslint-plugin-react");
const jsxA11y = require("eslint-plugin-jsx-a11y");

module.exports = [
  js.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: {
      react: pluginReact,
      "jsx-a11y": jsxA11y,
    },
    ignores: ["build/**", "coverage/**", "node_modules/**"],
    languageOptions: {
      globals: {
        ...globals.browser,
        process: "readonly",
      },
    },
  },
  {
    files: ["**/*.test.{js,jsx}", "src/setupTests.js"],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
  pluginReact.configs.flat.recommended,
  jsxA11y.flatConfigs.recommended,
  {
    settings: {      
      react: {        
        version: "detect",  
      },    
    },    
    rules: {
            "react/prop-types": "off",
            "react/react-in-jsx-scope": "off",      
            "react/no-unescaped-entities": "off",
    }
  },
];
