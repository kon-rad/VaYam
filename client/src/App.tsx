import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Layout } from 'antd';
import Home from "./features/home/Home";
import About from "./features/about/About";
import Start from "./features/start/Start";
import LandingLayout from "./components/layout/LandingLayout";
import "./App.css";
const { Content } = Layout;

interface Props {}

const App = (props: Props) => {
  return (
    <div className="home">
      <Content>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <LandingLayout>
              <Home />
            </LandingLayout>
              </Route>
              <Route exact path="/about">
            <LandingLayout>
              <About />
            </LandingLayout>
              </Route>
              <Route exact path="/get-started">
            <LandingLayout>
              <Start />
            </LandingLayout>
          </Route>
        </Switch>
      </BrowserRouter>
      </Content>
    </div>
  );
};

export default App;
