module.exports = {
  plugins: [
    [
      "babel-plugin-react-css-modules",
      {
        generateScopedName: "[path][name]__[local]--[hash:base64:5]",
        filetypes: {
          ".less": { syntax: "postcss-less" },
        },
        autoResolveMultipleImports: true,
      },
    ],
  ],
};
