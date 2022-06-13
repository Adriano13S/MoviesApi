const swaggerJson = require('./swagger.json');

const config = {
  swaggerSpec:swaggerJson,
  uriPath:'/admin/users/hooligan/stats',
  swaggerOnly: true, name:'Dashboard'
};

module.exports = config;