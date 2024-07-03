const userService = require("../service/user-service");
const ApiError = require("../exceptions/api-error");
const { validationResult } = require("express-validator");

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Ошибка валидации", errors.array()));
      }

      const { email, password } = req.body;
      const userData = await userService.registration({
        email,
        password,
      });

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      }); // Если https то нужно добавить secure:true

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      }); // Если https то нужно добавить secure:true

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }

  async activation(req, res, next) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URl);
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      }); // Если https то нужно добавить secure:true
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  //
  async patchUser(req, res, next) {
    try {
      const { json } = req.body;
      const userId = req.params.userId;
      const userData = await userService.patchUser(userId, json);
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  //
  // async getUsers(req, res, next) {
  //   try {
  //     console.log(3423234234432);
  //     const users = await userService.getAllUsers();
  //     res.json(users);
  //   } catch (e) {
  //     next(e);
  //   }
  // }

  async getUser(req, res, next) {
    try {
      const userId = req.params.userId;
      const userData = await userService.getUser(userId);
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
