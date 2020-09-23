import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import HomePage from "./Components/HomePage";
import SongList from "./Components/SongList";
import SongForm from "./Components/SongForm";
import SongDetails from "./Components/SongDetails";
import LyricsForm from "./Components/LyricsForm";

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
              component={() => <SongForm title="Create a new song!" />}
            />
            <Route path="/songs/:id/" exact component={SongDetails} />
            <Route path="/songs/:id/new-lyrics" exact component={LyricsForm} />
            <Route path="/songs/:id/edit" exact component={SongForm} />
            <Route path="/songs/:id/edit-lyrics" exact component={LyricsForm} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
};
