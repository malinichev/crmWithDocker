const Router = require("express").Router;
const authRoute = require("./authRoute");
const pagesRoute = require("./pagesRoute");
const adminRoute = require("./adminRoute");
const router = new Router();

const withFn = (initFn, ...fNs) => {
  let temp;

  fNs.forEach((item) => {
    temp = item(initFn);
  });
  return temp;
};

const allRoutes = withFn(authRoute(router), pagesRoute, adminRoute);

allRoutes.get("/healthz", function(req, res) {
  // do app logic here to determine if app is truly healthy
  // you should return 200 if healthy, and anything else will fail
  // if you want, you should be able to restrict this to localhost (include ipv4 and ipv6)
  res.send("I am happy and healthy\n");
});

module.exports = allRoutes;
