import ListItems from "./ListItems";
import CreateItems from "./CreateItems";
import ViewItems from "./DisplayItemsDetails";
import { Switch, Route } from "react-router-dom";
import { itemsCreatePath, itemsViewPath } from "../../utils/routepath";
export default function Items() {
  return (
    <Switch>
      <Route exact path={itemsCreatePath}>
        <CreateItems />
      </Route>
      <Route path={itemsViewPath}>
        <ViewItems />
      </Route>
      <Route path="*">
        <ListItems />
      </Route>
    </Switch>
  );
}
