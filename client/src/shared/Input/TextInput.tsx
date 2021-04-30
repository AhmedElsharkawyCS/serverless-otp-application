import React from "react";
import TextField from "@material-ui/core/TextField";

interface IProps {
  name?: string;
  placeholder?: string;
  value: string;
  onChange?: (value: string) => void;
  className?: string | undefined;
  helperTxt?: string;
}
export default function TextInput(props: IProps) {
  return (
    <TextField
      variant='standard'
      margin='normal'
      required
      className={props.className}
      fullWidth
      id={props.name || Math.random().toString()}
      label={props.placeholder || "label"}
      name={props.name || "name"}
      autoComplete={props.name}
      autoFocus
      helperText={props.helperTxt}
      error={!!props.helperTxt}
      value={props.value}
      onChange={({ target: { value } }) => props.onChange?.(value)}
    />
  );
}
