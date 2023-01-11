import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { gql } from '../__generated__';
import { Entry } from '../__generated__/graphql';
import { useQuery } from '@apollo/client';
import NoteComponent from './Note';

type Props = {};

const ENTRY_QUERY = gql(`
  query Entry($entryId: Float!) {
    entry(id: $entryId) {
      id
      date
      image_url
      userId
      notes {
        id
        entryId
        content
      }
    }
  }
`);

const EntryComponent = (props: Props) => {
  let { entryId } = useParams();

  const [currentEntry, setEntry] = useState<Entry>({} as Entry);

  const { loading, error, data } = useQuery(ENTRY_QUERY, {
    variables: { entryId: Number(entryId) },
    onCompleted: (data) => {
      console.log(data);
      setEntry(data.entry);
    },
  });
  // create button to link to add note form
  // create form and mutation to update entry
  // add delete mutation

  const handleAddNote = () => {
    console.log('add note');
    // navigate to add note form
    // add route in Root
  };

  return (
    <div>
      <h2>Entry</h2>
      <div>{currentEntry.date}</div>
      <img src={currentEntry.image_url} alt="entry" />
      <div>
        Do you want to add a note for today so you can remember how you are
        feeling?
      </div>
      <button onClick={handleAddNote}>add a note</button>
      <div>
        <h3>notes:</h3>
        {currentEntry.notes?.map((note) => {
          return <NoteComponent key={note.id} note={note} />;
        })}
      </div>
    </div>
  );
};

export default EntryComponent;
