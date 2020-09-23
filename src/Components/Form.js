import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_SONG } from "../queries/mutations";

const Form = (props) => {
  const [addSong, { data }] = useMutation(ADD_SONG);
  const [input, setInput] = useState("");
  const history = useHistory();

  const addSongSubmit = (e) => {
    e.preventDefault();
    addSong({ variables: { title: input } });
    history.push("/songs");
  };

  return (
    <div
      style={{
        backgroundColor: "#0d2f81",
        height: "95vh",
        width: "100%",
        display: "gird",
        color: "#ffe7aa",
        fontFamily: "'Atlas Grotesk Web', 'Open Sans', sans-serif;",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1 style={{ margin: "2%" }}>{props.title}</h1>
      <br />
      <form class="ui form" onSubmit={(e) => addSongSubmit(e)}>
        <div class="field">
          <label style={{ color: "#ffe7aa" }}>Song Title</label>
          <input
            input={input}
            type="text"
            name="first-name"
            placeholder="Song Title"
            style={{ marginBottom: "20%" }}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <button className="ui button primary" style={{ marginRight: "15%" }}>
          Submit
        </button>
        <Link to="/songs">
          <button className="ui button negative">Exit</button>
        </Link>
      </form>
    </div>
  );
};

export default Form;
