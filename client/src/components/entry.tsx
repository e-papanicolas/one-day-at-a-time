import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

// create form and mutation to update entry
// add delete mutation

const EntryComponent = (props: Props) => {
  let { entryId } = useParams();
  const navigate = useNavigate();

  const [currentEntry, setEntry] = useState<Entry>({} as Entry);

  const { error, refetch } = useQuery(ENTRY_QUERY, {
    variables: { entryId: Number(entryId) },
    onCompleted: (data) => {
      setEntry(data.entry);
    },
  });
  refetch({ entryId: Number(entryId) });

  const handleAddNote = () => {
    navigate(`/new-note/${entryId}`);
  };

  return (
    <div>
      <h2>Entry</h2>
      <div>{currentEntry.date}</div>
      <img
        src={currentEntry.image_url}
        alt="entry"
        style={{ width: '250px' }}
      />
      <div>
        Do you want to add a note for today so you can remember how you are
        feeling?
      </div>
      <button onClick={handleAddNote}>add a note</button>
      <div>
        <h3>notes:</h3>
        {currentEntry.notes?.map((note) => {
          return <NoteComponent key={note.id} note={note} refetch={refetch} />;
        })}
      </div>
      {error && <p>{error.message}</p>}
    </div>
  );
};

export default EntryComponent;
