import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Route, Switch } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { PropagateLoader } from "../../shared";
import { routes } from "../../routes";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    container: {},
    content: { display: "flex", flexDirection: "column", alignItems: "center" },
  }),
);

export default function DefaultLayout() {
  const classes = useStyles();

  return (
    <main className={classes.root}>
      <Container maxWidth='xl' className={classes.container}>
        <div className={classes.content}>
          <Switch>
            <React.Suspense fallback={<PropagateLoader />}>
              {routes.map((route, idx) => {
                return <Route key={idx} path={route.path} exact={route.exact} component={route.component} />;
              })}
            </React.Suspense>
          </Switch>
        </div>
      </Container>
    </main>
  );
}
