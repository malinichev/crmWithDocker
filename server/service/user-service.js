const { User } = require("../models");
const mailService = require("./mail-service");
const tokenService = require("./token-service");
const jsonSettingsService = require("./json-settings-service");
const UserDto = require("../dtos/user-dtos");
const uuid = require("uuid");
const bcrypt = require("bcryptjs");
const ApiError = require("../exceptions/api-error");

class UserService {
  async registration({ email, password }) {
    const candidate = await User.findOne({
      where: {
        email,
      },
    });

    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователю с таким email ${email} уже зарегистрирован`,
      );
    }

    const hashPassword = await bcrypt.hashSync(password, 3);
    const activationLink = uuid.v4(); // v342-sdfsdf-234-f3r

    const user = await User.create({
      email,
      password: hashPassword,
      activationLink,
    });
    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/activate/${activationLink}`,
    );
    const userDto = new UserDto(user);
    const tokens = await tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async activate(activationLink) {
    const user = await User.findOne({
      where: {
        activationLink,
      },
    });
    if (!user) {
      throw ApiError.BadRequest(
        "Неправильная ссылка активации, попробуйте еще раз",
      );
    }
    user.isActivated = true;
    await user.save();
  }

  async login(email, password) {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw ApiError.BadRequest(
        `Пользователю с таким email ${email} не зарегистрирован`,
      );
    }

    const isPasswordMatch = await bcrypt.compareSync(password, user.password);

    if (!isPasswordMatch) {
      throw ApiError.BadRequest(`Неверный пароль`);
    }

    const userDto = new UserDto(user);
    const tokens = await tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    const userData = await tokenService.validateRefreshToken(refreshToken);
    const tokenFromDB = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDB) {
      throw ApiError.UnauthorizedError();
    }

    const user = await User.findByPk(userData.id);

    const userDto = new UserDto(user);
    const tokens = await tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async patchUser(userId, json) {
    if (!json) {
      throw ApiError.BadRequest(`Ошибка json`);
    }

    const jsonSettings = await jsonSettingsService.saveJsonSettings(
      userId,
      json,
    );
    return jsonSettings;
  }

  // async getAllUsers() {
  //   const users = await User.findAll();
  //   return users;
  // }

  async getUser(id) {
    const user = await User.findByPk(id);

    const userDto = new UserDto(user);

    return {
      user: userDto,
    };
  }

  // isJsonString = (str) => {
  //   try {
  //     JSON.parse(str);
  //   } catch (e) {
  //     return false;
  //   }
  //   return true;
  // };
}

module.exports = new UserService();
