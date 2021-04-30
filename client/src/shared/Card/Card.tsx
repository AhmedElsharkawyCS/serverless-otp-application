import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Card as MUICard, CardProps } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 600,
      width: 500,
    },
  }),
);

interface IProps extends CardProps {
  onCardClick?: () => void;
}
export default function Card(props: IProps) {
  const classes = useStyles();
  return (
    <MUICard className={classes.root} onClick={props.onCardClick} elevation={5}>
      <CardContent>{props.children}</CardContent>
    </MUICard>
  );
}
