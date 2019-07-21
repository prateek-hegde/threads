const joi = require("joi");

const notesSchema = joi.object({
    title: joi.string().required(),
    body: joi.string().required(),
    _id: joi.allow()
});

module.exports = notesSchema;