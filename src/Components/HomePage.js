import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div
      style={{
        backgroundColor: "#0d2f81",
        height: "95vh",
        width: "100%",
        display: "gird",
      }}
    >
      <h2
        style={{
          color: "#ffe7aa",
          fontFamily: "'Atlas Grotesk Web', 'Open Sans', sans-serif;",
          fontSize: "2rem",
          placeSelf: "center stretch",
          paddingTop: "2rem",
          paddingLeft: "2rem",
        }}
      >
        Lyriql Gangsta
      </h2>
      <div style={{ display: "flex" }}>
        <h3
          style={{
            color: "#ffe7aa",
            fontFamily: "'Atlas Grotesk Web', 'Open Sans', sans-serif;",
            fontSize: "3.5rem",
            width: "35%",
            paddingLeft: "10rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Build songs and have friends collaborate on the lyrics
        </h3>
        <img src="/"></img>
      </div>
      <div style={{ float: "right", paddingRight: "35rem" }}>
        <Link to="/songs">
          <button
            className="ui button"
            style={{
              backgroundColor: "#fff",
              color: "#000",
              fontSize: "1.5rem",
            }}
          >
            Let's make some music!
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
