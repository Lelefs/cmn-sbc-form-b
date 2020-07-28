const app = require('./src/app');
require('dotenv/config');

var apiPort = process.env.PORT || 3333;

app.listen(apiPort, function () {
  console.log(`🚀️ Backend is running on port ${apiPort}!`);
});
