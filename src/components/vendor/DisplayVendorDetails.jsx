import { useLocation, Redirect } from "react-router-dom";
import { vendorPath } from "../../utils/routepath";
import {
  Typography,
  Breadcrumbs,
  Link as BreadCrumbLink
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  breadCrumbText: {
    color: "inherit"
  }
});
export default function DisplayVendorDetails(props) {
  const location = useLocation();
  const classes = useStyles();
  const { vendorData } = location.state;
  if (!vendorData.id) return <Redirect to={vendorPath} />;
  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <BreadCrumbLink color="inherit">
          <Link to="/" className={classes.breadCrumbText}>
            Material-UI
          </Link>
        </BreadCrumbLink>
        <BreadCrumbLink color="inherit">
          <Link to={vendorPath} className={classes.breadCrumbText}>
            Vendors
          </Link>
        </BreadCrumbLink>
        <Typography color="textPrimary">{vendorData.name}</Typography>
      </Breadcrumbs>
      <Typography variant="h4">Vendor Details</Typography>

      <div>
        {Object.keys(vendorData).map((key) => {
          return (
            <div>
              <b>{key.replaceAll("_", " ").toUpperCase()}</b> -{" "}
              {vendorData[key]}
            </div>
          );
        })}
      </div>
    </div>
  );
}
