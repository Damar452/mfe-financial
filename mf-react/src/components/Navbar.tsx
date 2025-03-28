import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Layout } from "antd";
import { DashboardOutlined, TableOutlined } from "@ant-design/icons";

const { Header } = Layout;

export default function Navbar() {
  const location = useLocation(); // Para resaltar la opción activa

  const menuItems = [
    {
      key: "/",
      icon: <DashboardOutlined />,
      label: <Link to="/">Dashboard</Link>,
    },
    {
      key: "/transactions",
      icon: <TableOutlined />,
      label: <Link to="/transactions">Historial de Transacciones</Link>,
    },
  ];

  return (
    <Header style={{ background: "#001529", padding: 0 }}>
      <Menu
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={menuItems}
        style={{ display: "flex", justifyContent: "center" }}
      />
    </Header>
  );
}
