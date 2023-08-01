module.exports = {
    env: {
        commonjs: true,
        es6: true,
        node: true,
        mocha: true,
        es2021: true
    },
    extends: [
        'airbnb-base',
        'prettier',
        'plugin:node/recommended'
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly'
    },
    parserOptions: {
        ecmaVersion: 2018
    },
    plugins: ['prettier'],
    rules: {
        'prettier/prettier': 'error',
        'no-unused-vars': 'warn',
        'no-console': 'warn',
        'func-names': 'off',
        'no-plusplus': 'off',
        'no-process-exit': 'off',
        'class-methods-use-this': 'off'
    },
    overrides: [
      {
        files: ['*.spec.js'],
        rules: {
          'no-undef': 'off',
          'node/no-unpublished-require': 'off',
        }
      }
    ]
};