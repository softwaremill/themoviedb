const context = require.context('./web', true, /.+\.spec\.tsx?$/); //make sure you have your directory and regex test set correctly!
context.keys().forEach(context);
module.exports = context;
