import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import CircularProgress, { CircularProgressProps } from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      "& > * + *": {
        marginLeft: theme.spacing(2),
      },
    },
  }),
);
interface IProps extends CircularProgressProps {}
export default function MuiCircularProgress(props: IProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress size={25} {...props} />
    </div>
  );
}
