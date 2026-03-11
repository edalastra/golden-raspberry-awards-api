import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
    { 
        files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], 
        plugins: { js },
        extends: ["js/recommended"], 
        languageOptions: { globals: {
            ...globals.node, ...globals.jest, afterAll: "readonly"
        } },
        rules: {
            "no-console": "warn",
            "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
            "no-redeclare": "error",
            "@typescript-eslint/no-explicit-any": "error",
            "quotes": ["error", "double"],
            "indent": ["error", 4]
        }
    },
    tseslint.configs.recommended,
]);
