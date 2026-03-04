import Joi from "joi"


export const registerSchema = Joi.object({
  userName: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({
      "string.empty": "Username is required",
      "string.min": "Username must be at least 3 characters",
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.email": "Invalid email format",
      "string.empty": "Email is required",
    }),

  password: Joi.string()
    .min(6)
    .pattern(new RegExp("^(?=.*[A-Z])(?=.*[0-9])"))
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain at least one uppercase letter and one number",
      "string.min": "Password must be at least 6 characters long",
    }),
})


export const loginSchema = Joi.object({
  identifier: Joi.string()
    .required()
    .messages({
      "string.empty": "Email or Username is required"
    }),

  password: Joi.string()
    .required()
    .messages({
      "string.empty": "Password is required",
    }),
})

export const resetPasswordSchema = Joi.object({
  newPassword: Joi.string()
    .min(6)
    .pattern(new RegExp("^(?=.*[A-Z])(?=.*[0-9])"))
    .required()
    .messages({
      "string.empty": "New password is required",
      "string.min": "Password must be at least 6 characters long",
      "string.pattern.base":
        "Password must contain at least one uppercase letter and one number",
    }),

  confirmPassword: Joi.string()
    .valid(Joi.ref("newPassword"))
    .required()
    .messages({
      "any.only": "Passwords do not match",
      "string.empty": "Confirm password is required",
    }),
})