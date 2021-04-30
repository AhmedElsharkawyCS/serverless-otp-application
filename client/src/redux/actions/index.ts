export interface IPayload {
  message: string;
}
export enum EActionTypes {
  SEND_OTP = "SEND_OTP",
  VERIFY_OTP = "VERIFY_OTP",
}

export const sendOTP = (payload: IPayload) => ({
  type: EActionTypes.SEND_OTP,
  payload,
});

export const verifyOTP = (payload: IPayload) => ({
  type: EActionTypes.VERIFY_OTP,
  payload,
});
