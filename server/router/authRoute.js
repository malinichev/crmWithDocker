const { body } = require("express-validator");
const userController = require("../controllers/user-controllers");
const authMiddleware = require("../middleware/auth-middleware");

const authRoute = (router) => {
  router.post(
    "/registration",
    body("email").isEmail(),
    body("password").isLength({ min: 3, max: 20 }),
    userController.registration,
  );
  router.post("/login", userController.login);
  router.post("/logout", userController.logout);
  router.get("/activate/:link", userController.activation);
  router.get("/refresh", userController.refresh);
  router.post("/users/:userId", authMiddleware, userController.getUser);
  router.patch(
    "/users/:userId",
    body("json").isJSON(),
    authMiddleware,
    userController.patchUser,
  );
  return router;
};

module.exports = authRoute;
