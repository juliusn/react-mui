module.exports = {
  "settings": {
    "react": {
      "version": "detect",
    },
    "import/resolver": {
      "typescript": {},
    },
  },
  "root": true,
  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": "latest",
  },
  // Linter options for js files
  "extends": [
    "eslint:recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/recommended",
  ],
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "rules": {
    "no-case-declarations": "off",
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "double"
    ],
    "semi": [
      "error",
      "always"
    ],
    "eqeqeq": "error",
    "no-trailing-spaces": "error",
    "object-curly-spacing": [
      "error", "always"
    ],
    "arrow-spacing": [
      "error", { "before": true, "after": true }
    ],
    "no-console": 0,
    "react/prop-types": 0
  },
  "overrides": [
    // Match TypeScript Files
    // =================================
    {
      "files": ["**/*.{ts,tsx}"],

      // Global ESLint Settings
      // =================================
      "env": {
        "jest": true,
      },
      "globals": {
        "React": "writable",
      },
      "settings": {
        "import/parsers": {
          "@typescript-eslint/parser": [".ts", ".tsx"],
        },
        "import/resolver": {
          "typescript": {
            "project": "./tsconfig.json",
          },
        },
      },

      // Parser Settings
      // =================================
      // allow ESLint to understand TypeScript syntax
      // https://github.com/iamturns/eslint-config-airbnb-typescript/blob/master/lib/shared.js#L10
      "parser": "@typescript-eslint/parser",
      "parserOptions": {
        // Lint with Type Information
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/TYPED_LINTING.md
        "tsconfigRootDir": __dirname,
        "project": "./tsconfig.json",
        "sourceType": "module",
      },

      // Plugins
      // =================================

      // Extend Other Configs
      // =================================
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:react/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
        "plugin:react-hooks/recommended",
      ],
      "rules": {
        "react/react-in-jsx-scope": "off",
        "react/prop-types": [0],
        // temp allowing during TS migration
        "@typescript-eslint/ban-ts-comment": [
          "error",
          {
            "ts-ignore": "allow-with-description",
            "minimumDescriptionLength": 4,
          },
        ],
      },
    },
  ]
};
