import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { gql } from '../__generated__';
import { Entry } from '../__generated__/graphql';
import { useMutation, useQuery } from '@apollo/client';
import NoteComponent from './Note';
import UpdateEntryForm from './UpdateEntryForm';
import uploadToCloudinary from '../utils/cloudinary-upload';
import '../styles/Entry.css';

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

const forbiddenUpdateErrorMessage = `Sorry! You can only update a picture on the same day it was uploaded.However if you really want, you can always delete the entry.`;

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
      setUpdating(false);
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

  const formatDate = (date: string) => {
    return new Date(date).toString().slice(0, 15);
  };

  return (
    <div className="entry-container">
      <div className="entry">
        <h2>{formatDate(currentEntry.date)}</h2>
        <div>
          <button onClick={() => setUpdating(true)}>edit entry</button>
          <button onClick={handleRemoveEntry}>delete entry</button>
        </div>

        {updating ? (
          <UpdateEntryForm
            setImage={setImage}
            handleUpdateEntry={handleUpdateEntry}
            setUpdating={setUpdating}
          />
        ) : (
          <img src={currentEntry.image_url} alt="entry" />
        )}

        <button onClick={handleAddNote}>Add a note for today's entry</button>
      </div>
      <div className="notes">
        <h3>Notes:</h3>
        {currentEntry.notes?.map((note) => {
          return (
            <NoteComponent
              key={note.id}
              note={note}
              refetchEntry={refetch}
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
