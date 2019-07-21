const joi = require("joi");

module.exports = schema => {
  return (req, res, next) => {
    joi.validate(req.body, schema, (error, data) => {
      if (error) {
        return res.status(403).send({
          success: false,
          message: error.details[0].message
        });
      }

      req.body = data;
      next();
    });
  };
};
