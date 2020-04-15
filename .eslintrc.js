module.exports = {
    "env": {
        "browser": true,
        "node": 1
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly",
        "exampleGlobalVariable": true
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "eqeqeq": 1
    }
};