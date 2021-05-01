import React from "react";
import Button, { ButtonProps } from "@material-ui/core/Button";
import { CircularProgress } from "../Spinner";
interface IProps extends ButtonProps {
  loading?: boolean;
}
export default function MuiButton({ loading, ...props }: IProps) {
  return (
    <Button {...props} disabled={loading}>
      {loading ? <CircularProgress color='inherit' /> : props.children || "empty title"}
    </Button>
  );
}
