import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),

  {
    files: ["**/*.{js,jsx}"],

    extends: [
      js.configs.recommended,
      react.configs.flat.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],

    languageOptions: {
      ecmaVersion: "latest",
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
      /* ======================
         ERRORES IMPORTANTES
      ====================== */
      "no-unused-vars": [
        "warn",
        {
          varsIgnorePattern: "^[A-Z_]",
          argsIgnorePattern: "^_",
        },
      ],

      "react/jsx-no-undef": "error",
      "react/jsx-uses-vars": "error",

      /* ======================
         REACT
      ====================== */
      "react/react-in-jsx-scope": "off", // Vite no necesita import React
      "react/prop-types": "off", // si usas TS o no validas props

      /* ======================
         DEV FRIENDLY
      ====================== */
      "no-console": "warn",
    },
  },
]);