module.exports = class UserDto {
  email;
  id;
  isActivated;
  roles;

  constructor(model) {
    this.email = model.email;
    this.id = model.id;
    this.roles = model.roles;
    this.isActivated = model.isActivated;
  }
};
