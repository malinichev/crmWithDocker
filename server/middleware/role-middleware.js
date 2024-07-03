const jwt = require("jsonwebtoken");
const ApiError = require("../exceptions/api-error");

const roleMiddleware = (roles) => (req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError());
    }

    const token = authorizationHeader.split(" ")[1];

    if (!token) {
      return next(ApiError.UnauthorizedError());
    }

    const { roles: userRoles } = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET,
    );
    let hasRoles = false;

    userRoles.forEach((role) => {
      if (roles.includes(role)) {
        hasRoles = true;
      }
    });

    if (!hasRoles) {
      return next(ApiError.Unauthorized("You are not authorized to access this resource"));
    }

    next();
  } catch (e) {
    console.log(e);
    return next(ApiError.Unauthorized("unauthorized"));
  }
};

module.exports = roleMiddleware;
