import React, { useState } from "react";
import { TextInput, Form, Card, MuiButton, ToastEmitter } from "../../shared";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import { otpRgx } from "../../constants";
import { Grid } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(15),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {},
  submit: {
    marginTop: theme.spacing(3),
  },
  buttonsGroup: { maxWidth: 700, marginTop: theme.spacing(3), marginBottom: theme.spacing(2) },
  card: {},
}));
export default function VerifyOTP() {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const [otp, setOTP] = useState<string>("");

  const onHandleSend = (ev: any) => {
    ev.preventDefault();
    const isValidOTP = otp.match(otpRgx);
    console.log("isValidOTP");
    if (!isValidOTP) return ToastEmitter({ msg: "Invalid OTP code!", type: "error" });
    setLoading(true);
    console.log("send");
    //call the api and send the email and handle the error
    // setLoading(false);
  };
  const goBack = () => {
    history.push("/");
  };
  return (
    <div className={classes.paper}>
      <Card>
        <Form onSubmit={onHandleSend} className={classes.form}>
          <TextInput
            value={otp}
            onChange={(value: string) => setOTP(value)}
            placeholder={"OTP"}
            name={"otp"}
            helperTxt={otp ? undefined : "OTP should be 8 digits"}
          />
          <Grid container justify='center' spacing={3} className={classes.buttonsGroup}>
            <Grid key={1} item xs={6}>
              <MuiButton onClick={goBack} type='button' fullWidth variant='contained' color='default' startIcon={<ArrowBackIcon />}>
                Back
              </MuiButton>
            </Grid>
            <Grid key={2} item xs={6}>
              <MuiButton
                loading={loading}
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                endIcon={!loading && <CheckCircleOutlineIcon />}
              >
                Confirm OTP
              </MuiButton>
            </Grid>
          </Grid>
        </Form>
      </Card>
    </div>
  );
}
