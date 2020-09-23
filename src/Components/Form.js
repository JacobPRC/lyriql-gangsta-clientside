import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";

import {
  ADD_SONG,
  EDIT_SONG,
  ADD_LYRIC_TO_SONG,
  EDIT_LYRIC,
} from "../queries/mutations";

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
// notes to self:
// for lyrics, input should become textarea, make a helper func to determin
// also it should redirect to song details instead of songlist
// and need to set input to title or content  - DONE
// lastly, somewhere in props for lyrics a property call lyrics is set to true
// use that to determine which mutation to call
const Form = (props) => {
  const [addSong] = useMutation(ADD_SONG);
  const [editSong] = useMutation(EDIT_SONG);
  const [addLyricToSong] = useMutation(ADD_LYRIC_TO_SONG);
  const [editLyric] = useMutation(EDIT_LYRIC);
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
    if (props.location.state.title) {
      return setInput(props.location.state.title);
    }
    return setInput(props.location.state.content);
  };

  useEffect(() => renderInput(), []);

  const inputOrTextArea = () => {
    if (!props.location) {
      return (
        <>
          <label style={{ color: "#ffe7aa" }}>Song Title</label>
          <input
            input={input}
            value={input}
            type="text"
            placeholder="Song Title"
            style={{ marginBottom: "20%" }}
            onChange={(e) => setInput(e.target.value)}
          />
        </>
      );
    }

    if (!props.location.state.lyrics) {
      return (
        <>
          <label style={{ color: "#ffe7aa" }}>Song Title</label>
          <input
            input={input}
            value={input}
            type="text"
            placeholder="Song Title"
            style={{ marginBottom: "20%" }}
            onChange={(e) => setInput(e.target.value)}
          />
        </>
      );
    }

    return (
      <textarea
        rows="2"
        input={input}
        value={input}
        type="text"
        placeholder="Add some new lyrics"
        style={{ marginBottom: "20%" }}
        onChange={(e) => setInput(e.target.value)}
      />
    );
  };

  return (
    <div style={divStyle}>
      <h1 style={{ margin: "2%" }}>
        {props.title || props.location.state.title}
      </h1>
      <br />
      <form class="ui form" onSubmit={(e) => mutationCheck(e)}>
        {inputOrTextArea()}
        <div class="field"></div>
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
