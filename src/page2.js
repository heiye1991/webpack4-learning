/**
 * created by : heiye1991
 * created time: 2018-11-04
 * description:
 */
require.ensure(
  ["./subPageA.js", "./subPageB.js"], // js文件或者模块名称
  function() {
    var subPageA = require("./subPageA"); // 引入后需要手动执行，控制台才会打印
    var subPageB = require("./subPageB");
  },
  "subPage" // chunkName
);

require.ensure(
  ["lodash"],
  function() {
    var _ = require("lodash");
    _.join(["1", "2"]);
  },
  "vendor"
);

export default "page2";