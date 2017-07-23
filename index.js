'use strict';

const routesList = (app) => {
  if (app._router && Array.isArray(app._router.stack)) {
    const routes = [];

    app._router.stack.forEach((route) => {
      if (route.route) {
        const {
          path,
          methods
        } = route.route;

        routes.push({
          path,
          methods
        });
      }
    });

    app.get('/__routes_list', (req, res) => {
      res.send(JSON.stringify(routes));
    });
  }
};

module.exports = routesList;
