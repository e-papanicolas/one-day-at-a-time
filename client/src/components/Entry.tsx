import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { gql } from '../__generated__';
import { Entry } from '../__generated__/graphql';
import { useMutation, useQuery } from '@apollo/client';
import NoteComponent from './Note';
import UpdateEntryForm from './UpdateEntryForm';
import uploadToCloudinary from '../utils/cloudinary-upload';

// TODO: clean this component up, maybe make a file for gql queries/mutations

type Props = {
  errors: string[];
  setErrors: React.Dispatch<React.SetStateAction<string[]>>;
};

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

const forbiddenUpdateErrorMessage = `You can only update a picture on the same day it was uploaded.However if you really want, you can always delete the entry.`;

const EntryComponent = ({ errors, setErrors }: Props) => {
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
    onError: (error) => {
      setErrors([...errors, error.message]);
    },
  });
  refetch({ entryId: Number(entryId) });

  const [removeEntryMutation] = useMutation(REMOVE_ENTRY_MUTATION, {
    onError: (error) => {
      setErrors([...errors, error.message]);
    },
  });
  const [updateEntryMutation] = useMutation(UPDATE_ENTRY_MUTATION, {
    onError: (error) => {
      setErrors([...errors, error.message]);
    },
  });

  const handleAddNote = () => {
    navigate(`/new-note/${entryId}`);
  };

  const isCurrentDateEqualToEntryDate = () => {
    const currentDate = new Date().toString().slice(0, 15);
    const entryDate = new Date(currentEntry.date).toString().slice(0, 15);

    return currentDate === entryDate;
  };

  const handleUpdateEntry = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isCurrentDateEqualToEntryDate()) {
      setErrors([...errors, forbiddenUpdateErrorMessage]);
      return;
    }

    if (!image) {
      setErrors([...errors, 'Please select an image']);
    }

    const url = await uploadToCloudinary(image!);
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
          setUpdating={setUpdating}
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
          return (
            <NoteComponent
              key={note.id}
              note={note}
              refetch={refetch}
              errors={errors}
              setErrors={setErrors}
            />
          );
        })}
      </div>
    </div>
  );
};

export default EntryComponent;
