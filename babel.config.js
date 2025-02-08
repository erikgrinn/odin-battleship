// can add "type": "module" in package.json to remove the pesky
// (though harmless) error in browser. this would require some refactoring of imports/export syntax,
// and renaming babel and jest configs to be cjs (commonjs)

module.exports = {
    presets: [['@babel/preset-env', {targets: {node: 'current'}}]],
  };