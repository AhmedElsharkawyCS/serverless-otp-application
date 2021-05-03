import { APIGatewayProxyResult } from "aws-lambda";
import { StatusCodes } from "http-status-codes";
import { validator, sendOTPSchemaValidation, verifyOTPSchemaValidation } from "../validation";
import OTPService from "../services/otp";
import { responseHandler, generateUniqueNumber, dateDiffInSeconds, sendEmailOTP } from "../utils";
import { IOTP } from "../@types";
import configs from "../config";

export default class OTPController {
  private otpService: OTPService;
  private body: IOTP;
  constructor(body: IOTP) {
    this.otpService = new OTPService(body);
    this.body = body;
  }

  public async sendOTP(): Promise<APIGatewayProxyResult> {
    const { isValid, message } = validator(this.body, sendOTPSchemaValidation);
    if (!isValid) return responseHandler(StatusCodes.BAD_REQUEST, { msg: message });
    //to measure how many otp we can send to one email and the limit will me {{Config.NUMBER_OF_EMAIL_USAGE}}
    const numberOfUsage = await this.otpService.checkEmailUsageCount();
    if (numberOfUsage >= configs.NUMBER_OF_EMAIL_USAGE)
      return responseHandler(StatusCodes.TOO_MANY_REQUESTS, {
        msg: `You can't send more than ${configs.NUMBER_OF_EMAIL_USAGE} per email, Please try with different email address`,
      });
    const otpCode: string = generateUniqueNumber(configs.OTP_CODE_LENGTH);
    const sent = await this.otpService.createOTP(otpCode);
    try {
      await sendEmailOTP(sent.otpCode, sent.email);
    } catch (error) {
      responseHandler(StatusCodes.INTERNAL_SERVER_ERROR, { msg: "Fail to send an OTP code, Please try again" });
    }

    return responseHandler(StatusCodes.CREATED, { data: sent, msg: "Successfully sent an OTP code" });
  }

  public async verifyOTP(): Promise<APIGatewayProxyResult> {
    const { isValid, message } = validator(this.body, verifyOTPSchemaValidation);
    if (!isValid) return responseHandler(StatusCodes.BAD_REQUEST, { msg: message });
    const otp = await this.otpService.checkOTP();
    if (!otp || otp.isUsed) return responseHandler(StatusCodes.NOT_FOUND, { msg: "Invalid OTP" });
    if (dateDiffInSeconds(otp.createdAt, new Date()) > configs.OTP_EXPIRE_IN_SECONDS)
      return responseHandler(StatusCodes.GONE, { msg: "OTP has been expired" });
    this.otpService.updateOTP({ id: otp.id, isUsed: true });
    return responseHandler(StatusCodes.OK, { data: otp, msg: "Successfully verified" });
  }
}
