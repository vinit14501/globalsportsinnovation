import js from "@eslint/js"
import globals from "globals"
import react from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import a11y from "eslint-plugin-jsx-a11y"

export default [
  { ignores: ["dist", "build", "coverage", "node_modules", "*.config.js"] },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
        JSX: true,
      },
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: "18.3",
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "jsx-a11y": a11y,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      ...a11y.configs.recommended.rules,

      // React optimization
      "react/jsx-no-target-blank": ["error", { enforceDynamicLinks: "always" }],
      "react/jsx-key": ["error", { checkFragmentShorthand: true }],
      "react/no-array-index-key": "error",

      // Modern React
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/jsx-uses-react": "off",

      // Hooks
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
]
