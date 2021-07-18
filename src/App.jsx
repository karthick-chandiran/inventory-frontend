import "./styles.css";

import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Vendor from "./components/vendor/index";
import { AppBar } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles({
  logo: {
    margin: "10px 20px"
  },
  container: {
    margin: "10px 20px"
  },
  appBar: {
    backgroundColor: "var(--primary-color)"
  },
  logoText: {
    textDecoration: "none",
    color: "white"
  }
});

export default function App() {
  const classes = useStyles();
  return (
    <>
      <BrowserRouter>
        <AppBar position="static" className={classes.appBar}>
          <Typography className={classes.logo} variant="h4">
            <Link to="/" className={classes.logoText}>
              Inventory Management
            </Link>
          </Typography>
        </AppBar>
        <div className={classes.container}>
          <Switch>
            <Route
              exact
              path="/"
              component={() => (
                <div>
                  <Link to="/vendor"> To Vendor Page</Link>
                </div>
              )}
            />
            <Route path="/vendor" component={Vendor} />
          </Switch>
        </div>
      </BrowserRouter>
    </>
  );
}
