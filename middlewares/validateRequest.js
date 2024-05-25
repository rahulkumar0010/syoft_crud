const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body);

    if (error) {
      return next(error);
    }

    if (!req.value) {
      req.value = {};
    }
    req.value = value;
    next();
  };
};

module.exports = validateRequest;
