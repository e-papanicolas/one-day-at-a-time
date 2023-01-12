import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { gql } from '../__generated__';
import { Entry } from '../__generated__/graphql';
import { useMutation, useQuery } from '@apollo/client';
import NoteComponent from './Note';
import UpdateEntryForm from './UpdateEntryForm';
import uploadToCloudinary from '../utils/cloudinary-upload';

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

const REMOVE_ENTRY_MUTATION = gql(`
  mutation RemoveEntry($removeEntryId: Float!) {
    removeEntry(id: $removeEntryId) {
      id
    }
  }
`);

const UPDATE_ENTRY_MUTATION = gql(`
  mutation UpdateEntry($updateEntryInput: UpdateEntryInput!) {
    updateEntry(updateEntryInput: $updateEntryInput) {
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
  const navigate = useNavigate();

  const [currentEntry, setEntry] = useState<Entry>({} as Entry);
  const [updating, setUpdating] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);

  const { refetch } = useQuery(ENTRY_QUERY, {
    variables: { entryId: Number(entryId) },
    onCompleted: (data) => {
      setEntry(data.entry);
    },
  });
  refetch({ entryId: Number(entryId) });

  const [removeEntryMutation] = useMutation(REMOVE_ENTRY_MUTATION);
  const [updateEntryMutation, { error }] = useMutation(UPDATE_ENTRY_MUTATION);

  const handleAddNote = () => {
    navigate(`/new-note/${entryId}`);
  };

  const handleUpdateEntry = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!image) console.error('no image'); // add some error handling
    else {
      const url = await uploadToCloudinary(image);
      const updatedEntry = await updateEntryMutation({
        variables: {
          updateEntryInput: {
            id: Number(entryId),
            date: new Date(),
            image_url: url,
          },
        },
      });

      setEntry(updatedEntry.data!.updateEntry);
      setUpdating(false);
    }
  };

  const handleRemoveEntry = async () => {
    await removeEntryMutation({
      variables: { removeEntryId: Number(entryId) },
    });

    navigate('/');
  };

  return (
    <div>
      <h2>Entry</h2>
      <div>
        <button onClick={() => setUpdating(true)}>edit entry</button>
        <button onClick={handleRemoveEntry}>delete entry</button>
      </div>
      <div>{currentEntry.date}</div>

      {updating ? (
        <UpdateEntryForm
          setImage={setImage}
          handleUpdateEntry={handleUpdateEntry}
        />
      ) : (
        <img
          src={currentEntry.image_url}
          alt="entry"
          style={{ width: '250px' }}
        />
      )}

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
