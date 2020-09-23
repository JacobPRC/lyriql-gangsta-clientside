import { gql } from "@apollo/client";

export const ADD_SONG = gql`
  mutation AddSong($title: String!) {
    addSong(title: $title) {
      title
    }
  }
`;

export const ADD_LYRIC_TO_SONG = gql`
  mutation AddLyricToSong($songId: ID!, $content: String!) {
    addLyricToSong(songId: $songID, content: $content) {
      id
    }
  }
`;

export const DELETE_SONG = gql`
  mutation DeleteSong($id: ID!) {
    deleteSong(id: $id) {
      id
    }
  }
`;

export const DELETE_LYRIC = gql`
  mutation DeleteLyric($id: ID!) {
    deleteLyric(id: $id) {
      id
    }
  }
`;

export const EDIT_SONG = gql`
  mutation EditSong($id: ID!, $title: String!) {
    editSong(id: $id, title: $title) {
      id
    }
  }
`;

export const EDIT_LYRIC = gql`
  mutation EditLyric($id: ID!, $content: String!) {
    editSong(id: $id, content: $content) {
      id
    }
  }
`;
