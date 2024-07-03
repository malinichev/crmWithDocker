const pagesControllers = require("../controllers/pages-controllers");
const authMiddleware = require("../middleware/auth-middleware");

const pagesRoute = (costumeRouter) => {
    costumeRouter.get("/pages", pagesControllers.getAllPages);
    costumeRouter.get("/pages/:pageid", pagesControllers.getPageData);
    costumeRouter.patch(
        "/pages/:pageid",
        authMiddleware,
        pagesControllers.savePageData,
    );
    return costumeRouter;
};

module.exports = pagesRoute;
