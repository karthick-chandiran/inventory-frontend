import './styles.css';

import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Vendor from './components/vendor/index';
import Layout from './layout';
import { makeStyles } from '@material-ui/styles';
const useStyles = makeStyles({
  logo: {
    margin: '10px 20px',
  },
  container: {
    margin: '10px 20px',
  },
  appBar: {
    backgroundColor: 'var(--primary-color)',
  },
});

export default function App() {
  const classes = useStyles();
  return (
    <>
      <BrowserRouter>
        <Layout>
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
        </Layout>
      </BrowserRouter>
    </>
  );
}
