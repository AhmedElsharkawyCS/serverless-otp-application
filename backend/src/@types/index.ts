export interface IOTP {
  id?: number;
  email?: string;
  otpCode?: string;
  isUsed?: boolean;
  createdAt?: Date;
}
export interface ILambdaEvent {
  path: string;
  body: object | any;
  queryStringParameters: object | any;
  method: string;
  headers: object | any;
}
