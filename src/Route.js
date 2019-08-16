import React from "react";
import { Route, Switch } from "react-router-dom";
import DynamicImport from "./utils/lazyImport";

const RouteMap = () => {
  return (
    <Switch>
      <Route
        exact
        path="/"
        component={DynamicImport(() => import("./components/pages/main"))}
      />
      <Route
        path="/orders"
        component={DynamicImport(() => import("./components/pages/orderList"))}
      />
      <Route
        path="/signin"
        component={DynamicImport(() => import("./components/pages/signIn"))}
      />
      <Route
        path="/order/:id"
        component={DynamicImport(() =>
          import("./components/pages/orderDetail")
        )}
      />
      <Route
        path="/map"
        component={DynamicImport(() => import("./components/pages/map"))}
      />
    </Switch>
  );
};

export default RouteMap;
