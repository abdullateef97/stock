express = require('express');

const HomeController = require('./controllers/home');

module.exports = function (app) {
    // Initializing route groups
    const apiRoutes = express.Router(),
        homeRoutes = express.Router();

    apiRoutes.use('/fx', homeRoutes);
    

    // route to  home
    homeRoutes.post('/', HomeController.home);
    homeRoutes.post('/chart', HomeController.chart)

// Set url for API group routes
    app.use('/api', apiRoutes);
};

