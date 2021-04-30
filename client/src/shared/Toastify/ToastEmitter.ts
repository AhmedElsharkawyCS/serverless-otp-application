import { toast } from "react-toastify";

interface IProps {
  msg?: string;
  type?: "info" | "success" | "warning" | "error" | "default";
}
export default function ToastEmitter(props: IProps) {
  toast.dismiss();
  return toast(props.msg || "🦄 Wow so easy!", {
    position: "top-center",
    type: props.type || "default",
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}
