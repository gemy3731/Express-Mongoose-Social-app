import Joi from "joi";

export const commentSchema = Joi.object({
    content: Joi.string().required().trim().min(3).max(500).required(),
    id: Joi.string().required()
});

export const postSchema = Joi.object({
  body: Joi.string().trim().min(3).max(1000),
  file:Joi.object({
    fieldname: Joi.string().valid('image').required(),
    originalname: Joi.string().required(),
    encoding: Joi.string().required(),
    mimetype: Joi.string().required(),
    destination: Joi.string().required(),
    filename: Joi.string().required(),
    path: Joi.string().required(),
    size: Joi.number().required()
  })
}).or('body', 'file');
