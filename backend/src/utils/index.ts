import { APIGatewayProxyResult } from "aws-lambda";
import { StatusCodes } from "http-status-codes";
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
