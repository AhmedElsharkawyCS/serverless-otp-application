import dotenv from "dotenv";
dotenv.config();
export default {
  DB_CONFIG: {
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_SERVER: process.env.DB_SERVER,
    BD_DATABASE: process.env.BD_DATABASE,
  },
  AWS: {
    AWS_ACCESS_SECRET_KEY: process.env.AWS_ACCESS_SECRET_KEY,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_ID_KEY,
    AWS_ACCESS_REGION: process.env.AWS_ACCESS_REGION,
  },
  NUMBER_OF_EMAIL_USAGE: Number(process.env.NUMBER_OF_EMAIL_USAGE) || 5,
  OTP_CODE_LENGTH: Number(process.env.OTP_CODE_LENGTH || 10),
  OTP_EXPIRE_IN_SECONDS: Number(process.env.OTP_EXPIRE_IN_SECONDS || 120),
  SENDER_EMAIL: process.env.SENDER_EMAIL,
};
