import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { FETCH_SONGS } from "../queries/queries";

const divStyle = {
  width: "100%",
  height: "100vh",
  backgroundColor: "#ffe7aa",
  color: "#000",
  fontFamily: "'Atlas Grotesk Web', 'Open Sans', sans-serif",
};

const iconStyle = {
  fontSize: "3rem",
  color: "#0d2f81",
  alignItems: "center",
  justifyContent: "center",
  marginLeft: "25%",
};

const itemStyle = {
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "2rem",
};

const addNewDivStyle = {
  position: "absolute",
  bottom: "8rem",
  right: "8rem",
  display: "flex",
  flexDirection: "column",
};

const List = () => {
  const { loading, error, data, refetch } = useQuery(FETCH_SONGS);

  const renderSongs = () =>
    data.songs.map((song) => {
      return (
        <div className="item" key={song.id} style={itemStyle}>
          <i className="music icon" />
          <div className="content">
            <Link
              to={{ pathname: `/songs/${song.id}`, state: { id: song.id } }}
            >
              <div className="header">{song.title}</div>
            </Link>
          </div>
        </div>
      );
    });

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error! {error.message}</h1>;

  refetch();

  return (
    <div style={divStyle}>
      <h1
        style={{
          textAlign: "center",
          paddingTop: "2rem",
          color: "#0d2f81",
          fontSize: "2.5rem",
        }}
      >
        Song List
      </h1>
      <div
        className="ui middle aligned animated list"
        style={{ marginLeft: "40em", paddingTop: "3rem" }}
      >
        {renderSongs()}
      </div>
      <div className="add-new" style={addNewDivStyle}>
        <Link to="/songs/new">
          <i className="plus icon" style={iconStyle}></i>
        </Link>
        <h4 style={{ color: "#0d2f81", fontSize: "1.5rem" }}>Add New Song</h4>
      </div>
    </div>
  );
};

export default List;
