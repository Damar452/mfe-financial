import React from "react";
import { Button } from "antd";
import { useHistory } from "react-router-dom";

export default function NotFound() {
  const history = useHistory();

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1 style={{ fontSize: "48px", color: "var(--primary-400)" }}>404</h1>
      <h2 style={{ color: "var(--dark-500)" }}>Página no encontrada</h2>
      <p style={{ color: "var(--dark-400)" }}>
        Lo sentimos, la página que buscas no existe.
      </p>
      <Button type="primary" onClick={() => history.push("/transactions")}>
        Volver al historial
      </Button>
    </div>
  );
}
