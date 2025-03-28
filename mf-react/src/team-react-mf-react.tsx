import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import Root from "./root.component";
import "antd/dist/antd.css";
import "./styles/theme.css"; // Mantén los estilos globales

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root,
  errorBoundary(err, info, props) {
    return <div>Ocurrió un error en la aplicación</div>;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
