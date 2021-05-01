import Joi from "joi";
const emailRgx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const otpRgx = /^[a-zA-Z0-9]{10,10}$/;

export const sendOTPSchemaValidation = Joi.object({
  email: Joi.string().regex(emailRgx).required().error(new Error("Invalid email, it should be like this format example@domain.com")),
});

export const verifyOTPSchemaValidation = Joi.object({
  otpCode: Joi.string().regex(otpRgx).required().error(new Error("Invalid OTP code, it should be equal 10 digits.")),
});
