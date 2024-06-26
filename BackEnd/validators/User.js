const joi = require("joi");

const EmailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const phonePattern =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

const userSchema = joi.object({
  firstName: joi.string().min(3).max(20).required(),
  lastName: joi.string().min(3).max(20),
  email: joi.string().regex(EmailPattern).required(),
  images: joi.string(),
  phoneNumber: joi.string().regex(phonePattern).min(11).max(11),
  password: joi.string().min(8).required(),
  address: joi.string(),
  role: joi.string(),
});

const validatUsers = (user) => userSchema.validate(user);

const userUpdateSchema = joi.object({
  firstName: joi.string().min(3).max(20),
  lastName: joi.string().min(3).max(20),
  phoneNumber: joi.string().regex(phonePattern).min(11).max(11),
  images: joi.array().items(joi.string()),
  address: joi.string(),
  role: joi.string(),
});

const validatUpdateUser = (user) => userUpdateSchema.validate(user);

const userUpdatePasswordSchema = joi.object({
  oldPassword: joi.string().required(),
  newPassword: joi.string().min(8).required(),
  confirmPassword: joi
    .string()
    .valid(joi.ref("newPassword"))
    .required()
    .messages({
      "any.only": "Confirm password must match new password",
    }),
});

const validatUpdateUserPassword = (user) =>
  userUpdatePasswordSchema.validate(user);

module.exports = { validatUpdateUser, validatUsers, validatUpdateUserPassword };
