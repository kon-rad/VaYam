import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./features/home/Home";
import About from "./features/about/About";
import "./App.css";

interface Props {}

const App = (props: Props) => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
