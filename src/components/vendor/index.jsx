import ListVendor from "./ListVendor";
import CreateVendor from "./CreateVendor";
import ViewVendor from "./DisplayVendorDetails";
import { Switch, Route } from "react-router-dom";
import { vendorCreatePath, vendorViewPath } from "../../utils/routepath";
export default function Vendor() {
  return (
    <Switch>
      <Route exact path={vendorCreatePath}>
        <CreateVendor />
      </Route>
      <Route path={vendorViewPath}>
        <ViewVendor />
      </Route>
      <Route path="*">
        <ListVendor />
      </Route>
    </Switch>
  );
}
