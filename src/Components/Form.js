import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
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

const Form = (props) => {
  const [addSong] = useMutation(ADD_SONG);
  const [editSong] = useMutation(EDIT_SONG);
  const [addLyricToSong] = useMutation(ADD_LYRIC_TO_SONG);
  const [editLyric] = useMutation(EDIT_LYRIC);
  const [input, setInput] = useState("");

  let history = useHistory();
  let params = useParams();
  let location = useLocation();

  const { id } = params;

  const addSongSubmit = (e) => {
    e.preventDefault();
    addSong({ variables: { title: input } });
    history.push("/songs");
  };

  const editSongSubmit = (e) => {
    e.preventDefault();
    editSong({ variables: { title: input, id } });
    history.push("/songs");
  };

  const addLyricSubmit = (e) => {
    e.preventDefault();
    addLyricToSong({ variables: { songId: id, content: input } });
    history.push(`/songs/${id}`);
  };

  const editLyricSubmit = (e) => {
    e.preventDefault();
    editLyric({
      variables: { id: location.state.lyricEdit, content: input },
    });
    history.push(`/songs/${id}`);
  };

  const mutationCheck = (e) => {
    if (!props.location) {
      return addSongSubmit(e);
    }

    const { title, lyricEdit } = location.state;

    if (title) return editSongSubmit(e);

    if (lyricEdit) return editLyricSubmit(e);

    return addLyricSubmit(e);
  };

  const renderInput = () => {
    if (!props.location) {
      return;
    }
    if (location.state.title) return setInput(location.state.title);

    return setInput(location.state.content);
  };

  const exitButton = () => {
    if (!props.location) {
      return (
        <>
          <Link to="/songs">
            <button className="ui button negative">Exit</button>
          </Link>
        </>
      );
    }
    return (
      <>
        <Link to={`/songs/${id}`}>
          <button className="ui button negative">Exit</button>
        </Link>
      </>
    );
  };

  useEffect(() => renderInput(), []);

  const inputOrTextArea = () => {
    const inputTag = (
      <input
        input={input}
        value={input}
        type="text"
        placeholder="Song Title"
        style={{ marginBottom: "20%" }}
        onChange={(e) => setInput(e.target.value)}
      />
    );

    if (location) {
      return (
        <>
          <label style={{ color: "#ffe7aa" }}>Song Title</label>
          {inputTag}
        </>
      );
    }

    if (!location.state.lyrics) {
      return (
        <>
          <label style={{ color: "#ffe7aa" }}>Song Title</label>
          {inputTag}
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
        {props.title || location.state.title || "Make some beautiful words!"}
      </h1>
      <br />
      <form class="ui form" onSubmit={(e) => mutationCheck(e)}>
        {inputOrTextArea()}
        <div class="field"></div>
        <button className="ui button primary" style={{ marginRight: "15%" }}>
          Submit
        </button>
        {exitButton()}
      </form>
    </div>
  );
};

export default Form;
