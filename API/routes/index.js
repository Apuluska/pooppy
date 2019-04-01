const binRoutes = require('./endpoint_bin');
const userRoutes = require('./endpoint_user');

module.exports = function registerRoutes(app) {
    binRoutes(app);
    userRoutes(app);
 
    return app;
};
  