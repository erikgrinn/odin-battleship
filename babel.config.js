// babel to use ES6 module exports with jest 

module.exports = {
    presets: [['@babel/preset-env', {targets: {node: 'current'}}]],
  };