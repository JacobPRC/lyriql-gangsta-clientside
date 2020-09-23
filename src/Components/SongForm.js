import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_SONG, EDIT_SONG } from "../queries/mutations";

const divStyle = {
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
};

const Form = (props) => {
  const [addSong, { data }] = useMutation(ADD_SONG);
  const [editSong] = useMutation(EDIT_SONG);
  const [input, setInput] = useState("");
  const history = useHistory();

  const addSongSubmit = (e) => {
    e.preventDefault();
    addSong({ variables: { title: input } });
    history.push("/songs");
  };

  const editSongSubmit = (e) => {
    e.preventDefault();
    const { id } = props.match.params;
    editSong({ variables: { title: input, id } });
    history.push("/songs");
  };

  const mutationCheck = (e) => {
    if (!props.location) {
      return addSongSubmit(e);
    }
    return editSongSubmit(e);
  };

  const renderInput = () => {
    if (!props.location) {
      return console.log("no props");
    }
    return setInput(props.location.state.title);
  };
  useEffect(() => renderInput(), []);

  return (
    <div style={divStyle}>
      <h1 style={{ margin: "2%" }}>
        {props.title || props.location.state.title}
      </h1>
      <br />
      <form class="ui form" onSubmit={(e) => mutationCheck(e)}>
        <div class="field">
          <label style={{ color: "#ffe7aa" }}>Song Title</label>
          <input
            input={input}
            value={input}
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
