import React from "react";
import { MemoryRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { ConfigProvider } from "antd";
import Navbar from "./components/Navbar";
import TransactionHistoryPage from "./pages/TransactionHistoryPage";
import "./styles/theme.css";
import NotFound from "./pages/NotFound";

export interface RootProps {
  name?: string;
}

export default function Root({ name }: RootProps) {
  return (
    <ConfigProvider>
      <Router>
        <div style={{ padding: 20 }}>
          <Switch>
            <Route exact path="/">
              <Redirect to="/transactions" />
            </Route>

            <Route path="/transactions" component={TransactionHistoryPage} />

            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    </ConfigProvider>
  );
}
