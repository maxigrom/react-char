module.exports = {
  'presets': [
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-flow',
  ],
  'plugins': [
    '@babel/plugin-proposal-class-properties', // Allows use () => {} in class and don't use bind()
    'react-hot-loader/babel',
    'flow-react-proptypes', // Translate flow types to prop-types
  ],
};
