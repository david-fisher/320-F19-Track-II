import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "../../pages/Home/Home";
import About from "../../pages/About/About";
import Dashboard from "../../pages/Dashboard/Dashboard";
import Gallery from "../../pages/Gallery/Gallery";
import Login from "../../pages/Login/Login";
import Profile from "../../pages/Profile/Profile";
import Observations from "../../pages/Observations/Observations";
import AI from "../../pages/AI/AI";
import Data from "../../pages/Data/Data";
import Orchards from "../../pages/Orchards/Orchards";

import NotFound from "../../pages/NotFound/NotFound";
import UnauthenticatedRoute from "./UnauthenticatedRoute";
import AuthenticatedRoute from "./AuthenticatedRoute";

export default function Routes() {
  return (
    <Switch>
      <Redirect exact from="/" to="/home" />
      <Route path="/home" exact component={Home} />
      <Route path="/about" exact component={About} />
      <Route path="/gallery" exact component={Gallery} />>
      <AuthenticatedRoute path="/dashboard" exact component={Dashboard} />
      <UnauthenticatedRoute path="/login" exact component={Login} />
      <AuthenticatedRoute path="/profile" exact component={Profile} />
      <Route path="/ask-ai" exact component={AI} />
      <Route path="/observations" exact component={Observations} />
      <Route path="/data" exact component={Data} />
      <Route path="/orchards" exact component={Orchards} />
      <Route component={NotFound} />
    </Switch>
  );
}
