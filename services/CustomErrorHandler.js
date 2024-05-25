class CustomErrorHandler extends Error {
  constructor(status, msg) {
    super();
    this.status = status;
    this.message = msg;
  }

  static alreadyExist(message) {
    return new CustomErrorHandler(409, message);
  }

  static wrongCredentials(message = "Email or password is wrong!") {
    return new CustomErrorHandler(401, message);
  }
  static unAuthenticated(message = "Token not provided.") {
    return new CustomErrorHandler(400, message);
  }
  static unAuthorized(message = "unAuthorized") {
    return new CustomErrorHandler(401, message);
  }
  static notFound(message = "404 Not Found") {
    return new CustomErrorHandler(404, message);
  }
  static validate(message) {
    return new CustomErrorHandler(422, message);
  }
  
}

module.exports = CustomErrorHandler;
