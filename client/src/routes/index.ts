import React from "react";
const SendOTP = React.lazy(() => import("../pages/SendOTP"));
const VerifyOTP = React.lazy(() => import("../pages/VerifyOTP"));
interface IRoute {
  name: string;
  path: string;
  component: React.LazyExoticComponent<any>;
  exact: boolean;
}
export const routes: Array<IRoute> = [
  {
    name: "Send OTP",
    exact: true,
    path: "/",
    component: SendOTP,
  },
  {
    name: "Verify OTP",
    exact: true,
    path: "/verify",
    component: VerifyOTP,
  },
];
