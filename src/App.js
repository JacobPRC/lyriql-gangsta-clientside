import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import HomePage from "./Components/HomePage";
import List from "./Components/List";
import Form from "./Components/Form";

export default () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/songs" exact component={List} />
            <Route path="/songs/new" exact component={Form} />
            <Route path="/songs/:id/" exact component={List} />
            <Route path="/songs/:id/new-lyrics" exact component={Form} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
};
