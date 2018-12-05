module.exports = {
  extends: ['plugin:flowtype/recommended', 'eslint-config-airbnb'],
  rules: {
    'max-len': ['error', { code: 160 }],
    'no-underscore-dangle': 'off',
    'prefer-destructuring': 'off',

    'react/require-default-props': 'off',
    'react/destructuring-assignment': 'off',
    'react/prop-types': [
      'error',
      {
        ignore: [],
        customValidators: [],
        skipUndeclared: false,
      },
    ],
    'react/sort-comp': [
      1,
      {
        order: ['type-annotations', 'static-methods', 'lifecycle', 'everything-else', 'render'],
      },
    ],
  },
  env: {
    browser: true,
  },
  plugins: ['flowtype'],
};
