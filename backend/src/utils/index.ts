import { APIGatewayProxyResult } from "aws-lambda";
import { StatusCodes } from "http-status-codes";
import AWS from "aws-sdk";
import configs from "../config";
interface IOptions {
  msg?: string;
  data?: object;
}
export const responseHandler = (code: number, options?: IOptions): APIGatewayProxyResult => {
  switch (code) {
    case StatusCodes.OK:
      return { statusCode: code, body: JSON.stringify({ message: options?.msg || "Success", data: options?.data }) };
    case StatusCodes.NOT_FOUND:
      return { statusCode: code, body: JSON.stringify({ message: options?.msg || "Not exist" }) };
    case StatusCodes.CREATED:
      return { statusCode: code, body: JSON.stringify({ message: options?.msg || "Successfully created", data: options?.data }) };
    case StatusCodes.TOO_MANY_REQUESTS:
      return { statusCode: code, body: JSON.stringify({ message: options?.msg || "Limit has been reached" }) };
    case StatusCodes.BAD_REQUEST:
      return { statusCode: code, body: JSON.stringify({ message: options?.msg || "Invalid request data" }) };
    case StatusCodes.GONE:
      return { statusCode: code, body: JSON.stringify({ message: options?.msg || "Expired" }) };
    default:
      return { statusCode: code, body: JSON.stringify({ message: options?.msg || "Something went wrong, try again" }) };
  }
};

export const generateUniqueNumber = (len: number): string => {
  return Math.floor(Math.pow(10, len - 1) + Math.random() * 9 * Math.pow(10, len - 1)).toString();
};

export const getApiPath = (route: string, method: string): string => {
  if (!route) throw new Error("Invalid Api route");
  if (!method) throw new Error("Invalid Api method");
  return method.toLowerCase() + "::" + route.replace(/\/prod|\/api/g, "");
};

export const dateDiffInSeconds = (start: Date, end: Date): number => {
  return (end.getTime() - start.getTime()) / 1000;
};

export const sendEmailOTP = async (otp: string, to: string) => {
  AWS.config.update({
    region: configs.AWS.AWS_ACCESS_REGION,
    apiVersion: "2010-12-01",
    accessKeyId: configs.AWS.AWS_ACCESS_KEY_ID,
    secretAccessKey: configs.AWS.AWS_ACCESS_SECRET_KEY,
  });
  console.log(configs.AWS);
  const params = {
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `<div style="text-algin:center;"><h2>Your verification code is: <code>${otp}</code></h2><small>This code valid for 2 minutes</small></div>`,
        },
        Text: {
          Charset: "UTF-8",
          Data: "TEXT_FORMAT_BODY",
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "OTP verification code",
      },
    },
    Source: configs.SENDER_EMAIL /* required */,
  };
  try {
    const sent = await new AWS.SES().sendEmail(params).promise();
    console.log(sent);
  } catch (error) {
    console.log("sending email error:", error);
  }
};
