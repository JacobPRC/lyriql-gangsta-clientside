import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import HomePage from "./Components/HomePage";
import SongList from "./Components/SongList";
import Form from "./Components/Form";
import SongDetails from "./Components/SongDetails";

export default () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/songs" exact component={() => <SongList />} />
            <Route
              path="/songs/new"
              exact
              component={() => <Form title="Create a new song!" />}
            />
            <Route path="/songs/:id/" exact component={SongDetails} />
            <Route path="/songs/:id/new-lyrics" exact component={Form} />
            <Route path="/songs/:id/edit" exact component={Form} />
            <Route path="/songs/:id/edit-lyrics" exact component={Form} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
};
