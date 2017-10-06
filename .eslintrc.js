module.exports = {
  "parser": "babel-eslint",
  "root": true,
  "extends": [
    "airbnb"
  ],
  "env": {
  	"browser": true
  },
  "rules": {
    "import/named": 2,

    "semi": [2, "never"],
    "indent": [2, 4, {"SwitchCase": 1}],

    "max-len": [2, 200, 2, {
      "ignoreUrls": true,
      "ignoreComments": false
    }],

    "no-alert": 2,

    "no-unused-vars": [2, {
      "argsIgnorePattern": "(next|^_)",
      "vars": "local",
      "varsIgnorePattern": "^_",
      "args": "after-used"
    }],

    "comma-dangle": 0,

    "react/forbid-prop-types": [0],
    "react/jsx-indent-props": [2, 4],
    "react/jsx-indent": [2, 4],
    "react/jsx-closing-bracket-location": [2, "after-props"],
    "global-require": [0],
    "no-confusing-arrow": [0],

    "no-constant-condition": ["error", { "checkLoops": false }],
    "no-use-before-define": ["error", { "functions": false, "classes": true }],
    "no-underscore-dangle": 0,
    "no-plusplus": 0,

    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/no-find-dom-node": 0,
    "react/require-extension": 0,
    "import/no-extraneous-dependencies": [2, {"devDependencies": true}],
    "import/prefer-default-export": 0,
    "import/no-named-as-default": 0,
    "no-mixed-operators": 0,
    "no-shadow": 0,

    "react/no-unused-prop-types": [2, {"skipShapeProps": true}],
    "jsx-a11y/no-static-element-interactions": 0,
    "jsx-a11y/alt-text": "warn",
    "arrow-parens": 0
  },
  "settings": {
  }
}
