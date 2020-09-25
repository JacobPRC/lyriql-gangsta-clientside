import React, { useEffect } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { Link, useHistory, useParams } from "react-router-dom";

import { DELETE_SONG, DELETE_LYRIC } from "../queries/mutations";

const divStyle = {
  width: "100%",
  height: "100vh",
  backgroundColor: "#ffe7aa",
  color: "#000",
  fontFamily: "'Atlas Grotesk Web', 'Open Sans', sans-serif",
};

const divLyricsStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "2rem",
};

const buttonDivStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "2rem",
};

const newLyricDivStyle = {
  position: "absolute",
  bottom: "7rem",
  right: "10rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "1.5rem",
};

const SongDetails = () => {
  const [deleteSong] = useMutation(DELETE_SONG);
  const [deleteLyric] = useMutation(DELETE_LYRIC);

  let history = useHistory();
  let params = useParams();

  const { id } = params;

  const FETCH_SONG = gql`
    {
        song(id: "${id}"){
            title
            lyrics{
                content
                id
            }
        }
    }
    `;

  const { loading, error, data, refetch } = useQuery(FETCH_SONG);

  if (loading) return null;
  if (error) return <h1>{error.message}</h1>;

  const { title, lyrics } = data.song;

  const destroySong = () => {
    deleteSong({ variables: { id } });
    history.push("/songs");
  };

  const destroyLyric = (id) => {
    deleteLyric({ variables: { id } });
    refetch();
  };

  const renderSongLyrics = () =>
    lyrics.map((lyric) => {
      return (
        <li>
          {lyric.content}
          <Link
            to={{
              pathname: `/songs/${id}/edit-lyrics`,
              state: {
                content: lyric.content,
                lyricEdit: lyric.id,
                lyrics: true,
              },
            }}
          >
            <i className="edit icon"></i>
          </Link>
          <i
            className="trash icon"
            style={{ cursor: "pointer" }}
            onClick={() => destroyLyric(lyric.id)}
          ></i>
        </li>
      );
    });

  const toRenderOrNotToRender = () => {
    return lyrics.length > 0 ? (
      renderSongLyrics()
    ) : (
      <h2>
        No lyrics have been created for this song. Would you like to make some?
      </h2>
    );
  };

  return (
    <div style={divStyle}>
      <h1 style={{ textAlign: "center", paddingTop: "2%" }}>
        {title}
        <Link to={{ pathname: `/songs/${id}/edit`, state: { title } }}>
          <i
            className="edit icon"
            style={{ paddingLeft: "2%", paddingRight: "2%" }}
          ></i>{" "}
          - Edit Song Title
        </Link>
      </h1>
      <br />
      <div className="div-lyrics" style={divLyricsStyle}>
        <ol>{toRenderOrNotToRender()}</ol>
      </div>
      <div style={buttonDivStyle}>
        <Link to="/songs">
          <button className="ui button primary">Back to song list</button>
        </Link>
        <button
          className="ui button negative"
          onClick={() => destroySong()}
          style={{ marginLeft: "5%" }}
        >
          Delete Song
        </button>
      </div>
      <div style={newLyricDivStyle}>
        <Link
          to={{
            pathname: `/songs/${id}/new-lyrics`,
            state: { newLyrics: true, lyrics: true },
          }}
        >
          <i className="plus icon" style={{ fontSize: "2rem" }}></i>
        </Link>
        <p>Add New Lyric</p>
      </div>
    </div>
  );
};

export default SongDetails;
