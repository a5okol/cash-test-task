module.exports = {
  env: {
    browser: false,
    es6: true,
    node: true
  },
  extends: ['eslint:recommended', 'plugin:node/recommended', 'airbnb-base'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  rules: {
    'no-console': 'off',
    'consistent-return': 'off',
    'no-underscore-dangle': 'off',
    'arrow-body-style': 'off',
    'prefer-destructuring': [
      'error',
      {
        object: true,
        array: false
      }
    ],
    'import/no-dynamic-require': 'off',
    'global-require': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/test/**/*.ts']
      }
    ],
    'node/no-unpublished-require': [
      'error',
      {
        allowModules: [],
        convertPath: null,
        tryExtensions: ['.js', '.ts', '.json', '.node']
      }
    ]
  }
};
