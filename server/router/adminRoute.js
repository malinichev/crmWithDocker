const siteDataController = require("../controllers/site-data-controllers");
const { body } = require("express-validator");
const authMiddleware = require("../middleware/auth-middleware");
const adminRoute = (costumeRouter) => {
    costumeRouter.get("/data", siteDataController.getData);
    costumeRouter.patch(
        "/data",
        body("siteData").isJSON(),
        authMiddleware,
        siteDataController.saveData,
    );
    return costumeRouter;
};

module.exports = adminRoute;
