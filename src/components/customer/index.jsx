import ListCustomer from "./ListCustomer";
import CreateCustomer from "./CreateCustomer";
import ViewCustomer from "./DisplayCustomerDetails";
import { Switch, Route } from "react-router-dom";
import { customerCreatePath, customerViewPath } from "../../utils/routepath";
export default function Customer() {
  return (
    <Switch>
      <Route exact path={customerCreatePath}>
        <CreateCustomer />
      </Route>
      <Route path={customerViewPath}>
        <ViewCustomer />
      </Route>
      <Route path="*">
        <ListCustomer />
      </Route>
    </Switch>
  );
}
