import React from "react";
import Loadable from "react-loadable";
import { Spin } from "antd";

const LoadingComponent = () => <Spin size="large" />;

const DynamicImport = LoaderComponent =>
  Loadable({
    loader: LoaderComponent,
    loading: LoadingComponent
  });

export default DynamicImport;
