import React from "react";
import { Route, Switch } from "react-router-dom";
import DynamicImport from "./utils/lazyImport";

const MainPage = DynamicImport(() => import("./components/pages/main"));
const SignIn = DynamicImport(() => import("./components/pages/signIn"));
const MapPage = DynamicImport(() => import("./components/pages/map"));
const OrderListPage = DynamicImport(() => import("./components/pages/orders"));
const NotFoundPage = DynamicImport(() => import("./components/pages/404"));

const RouteMap = () => {
  return (
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route path="/signin" component={SignIn} />
      <Route path="/map" component={MapPage} />
      <Route path="/orders" component={OrderListPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default RouteMap;
