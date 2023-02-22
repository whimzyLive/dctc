const tsConfig = require('./tsconfig.json');

/**
 * module path resolution for typescript Alias paths
 *
 * @description By default ts-jest doesn't work well with tests
 * that makes use of path aliases, therefore adding a workaround to
 * help ts-jest correctly resolve relative paths
 */
module.exports = function () {
  const paths = tsConfig.compilerOptions.paths;
  return Object.keys(paths).reduce((acc, key) => {
    const jcPathKey = key.replace(/\*/, '(.*)');
    const pathValue = paths[key];
    const jcPathValues = pathValue.map(path => {
      return `<rootDir>/${path}`.replace(/\*/, '$1');
    });
    acc[jcPathKey] = jcPathValues;
    return acc;
  }, {});
};
