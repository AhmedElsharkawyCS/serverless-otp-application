import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
}));

interface IProps {
  children: React.ReactNode;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  noValidate?: boolean;
  className?: string | undefined;
}
export default function Form(props: IProps) {
  const classes = useStyles();
  return (
    <div>
      <form className={classes.form} onSubmit={props.onSubmit} noValidate={props.noValidate}>
        {props.children}
        {/* <TextField
          variant='standard'
          margin='normal'
          required
          fullWidth
          id='postTitle'
          label='Post Title'
          name='postTitle'
          autoComplete='title'
          multiline
          autoFocus
          value={postTitle}
          onChange={({ target: { value } }) => setPostTitle(value)}
        /> */}
        {/* <MuiButton type='submit' fullWidth variant='contained' color='primary' className={classes.submit} loading={loading}>
          Publish
        </MuiButton> */}
      </form>
    </div>
  );
}
