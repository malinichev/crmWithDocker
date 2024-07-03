module.exports = class ApiError extends Error {
  status;
  errors;

  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError() {
    return new ApiError(401, "Пользователь не авторизован");
  }

  static BadRequest(massage, errors = []) {
    return new ApiError(400, massage, errors);
  }

  static Unauthorized(massage, errors = []) {
    return new ApiError(
      403,
        massage,
      errors,
    );
  }
};
