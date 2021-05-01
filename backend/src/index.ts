import "reflect-metadata";
import { APIGatewayProxyResult, APIGatewayProxyCallback, Context } from "aws-lambda";
import { StatusCodes } from "http-status-codes";
import { InitConnection } from "./database";
import { ILambdaEvent } from "./@types";
import { getApiPath, responseHandler } from "./utils";
import OTPController from "./controllers/otp";

/**

 * Use API Gateway's custom request authorizers to authorize your APIs using bearer token authorization strategies, such as OAuth 2.0 or SAML. For each incoming request, the following happens:
 *API Gateway checks for a properly-configured custom authorizer.
 *API Gateway calls the custom authorizer (which is a Lambda function) with the authorization token.
 *If the authorization token is valid, the custom authorizer returns the appropriate AWS Identity and Access Management (IAM) policies.
 *API Gateway uses the policies returned in step 3 to authorize the request.
 * @param {event, context, callback}
 * @returns {policyDocument, principalId, context, usageIdentifierKey}
 */

export const handler = async (event: ILambdaEvent, context: Context, callback: APIGatewayProxyCallback): Promise<APIGatewayProxyResult> => {
  console.info("lambda request info", event, context);
  const { body, method, path } = event;
  try {
    console.time("init database connection and init controller");
    await InitConnection.connect();
    const otpController = new OTPController(body);
    console.timeEnd("init database connection and init controller");
    switch (getApiPath(path, method)) {
      case "post::/send-otp":
        return await otpController.sendOTP();
      case "post::/verify-otp":
        return await otpController.verifyOTP();
      default:
        return responseHandler(StatusCodes.NOT_FOUND, { msg: "Invalid resource path" });
    }
  } catch (err) {
    console.error("login catch error =>", err);
    console.log(responseHandler(StatusCodes.INTERNAL_SERVER_ERROR));
    return responseHandler(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};
