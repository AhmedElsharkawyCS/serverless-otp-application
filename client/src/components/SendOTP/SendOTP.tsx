import React, { useState } from "react";
import { TextInput, Form, Card, MuiButton, ToastEmitter } from "../../shared";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import { emailRgx } from "../../constants";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(15),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {},
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
export default function SendOTP() {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  const onHandleSend = (ev: any) => {
    ev.preventDefault();
    const isValidEmail = email.match(emailRgx);
    if (!isValidEmail) return ToastEmitter({ msg: "Invalid E-mail address format!", type: "error" });
    setLoading(true);
    console.log("send");
    //call the api and send the email and handle the error
    setLoading(false);
    history.push("/verify");
  };
  return (
    <div className={classes.paper}>
      <Card>
        <Form onSubmit={onHandleSend} className={classes.form}>
          <TextInput value={email} onChange={(value: string) => setEmail(value)} placeholder={"Your Email"} name={"email"} />
          <MuiButton loading={loading} type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
            Send OTP
          </MuiButton>
        </Form>
      </Card>
    </div>
  );
}
