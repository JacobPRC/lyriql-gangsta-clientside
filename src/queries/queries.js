import { gql } from "@apollo/client";

export const FETCH_SONGS = gql`
  {
    songs {
      title
      id
    }
  }
`;

export const FETCH_SONG = gql`
  query FetchSong($ID: ID!) {
    song {
      title
      lyrics {
        content
        id
      }
    }
  }
`;
