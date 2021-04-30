import React from "react";
import { ToastContainer as Container } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function ToastContainer() {
  return <Container limit={1} position='top-center' autoClose={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable />;
}
