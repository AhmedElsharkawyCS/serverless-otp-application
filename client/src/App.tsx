import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { ToastContainer } from "./shared/Toastify";
import { PropagateLoader } from "./shared/Spinner";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
const AppContainer = React.lazy(() => import("./container/index"));
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: "#E6E6E6",
      width: "100%",
      height: "100vh",
    },
  }),
);
export default function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Router>
        <Switch>
          <React.Suspense fallback={<PropagateLoader />}>
            <Route component={AppContainer} />
          </React.Suspense>
        </Switch>
      </Router>
      <ToastContainer />
    </div>
  );
}
