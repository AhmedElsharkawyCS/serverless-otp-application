import { EActionTypes, IPayload } from "../actions";
interface IAction {
  payload: IPayload;
  type: EActionTypes;
}
const initState = {
  message: "",
};
function otp(state: IPayload = initState, { payload, type }: IAction) {
  switch (type) {
    case EActionTypes.SEND_OTP:
    case EActionTypes.VERIFY_OTP:
      return { message: payload.message };
    default:
      return state;
  }
}

export default otp;
