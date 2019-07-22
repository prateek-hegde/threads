const joi = require("joi");

const notesSchema = joi.object({
  title: joi.string().required(),
  body: joi.string().required(),
  tags: joi.array().required(),
  _id: joi.allow()
});

module.exports = notesSchema;
