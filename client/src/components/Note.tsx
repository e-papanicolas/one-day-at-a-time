import React from 'react';
import { Note } from '../__generated__/graphql';

type Props = {
  note: Note;
};

const NoteComponent = ({ note }: Props) => {
  console.log(note);
  // create UI for note
  // create gql query, run compile
  // fetch note from server
  // entry should render its notes
  // create form and mutation to update note
  // add delete mutation
  return <div>NoteComponent</div>;
};

export default NoteComponent;
