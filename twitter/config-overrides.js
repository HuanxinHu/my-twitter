const { override, addBabelPlugins, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  ...addBabelPlugins([
    'babel-plugin-react-css-modules',
    {
      generateScopedName: '[path][name]__[local]--[hash:base64:5]',
      filetypes: {
        '.less': { syntax: 'postcss-less' },
      },
      autoResolveMultipleImports: true,
    },
  ]),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
  })
);
