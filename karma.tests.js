const context = require.context('./web', true, /.+\.spec\.tsx?$/);
context.keys().forEach(context);
module.exports = context;
