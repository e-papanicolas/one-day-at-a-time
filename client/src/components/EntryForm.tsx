import React, { useState } from 'react';
import { gql } from '../__generated__';
import { useMutation } from '@apollo/client';
import { UserContext } from './Root';
import { useNavigate } from 'react-router-dom';
import uploadToCloudinary from '../utils/cloudinary-upload';
import '../styles/Entry.css';

type Props = {
  errors: string[];
  setErrors: React.Dispatch<React.SetStateAction<string[]>>;
};

const CREATE_ENTRY_MUTATION = gql(`
  mutation CreateEntry($createEntryInput: CreateEntryInput!) {
    createEntry(createEntryInput: $createEntryInput) {
      id
      date
      image_url
    }
  }
`);

const cannotAddEntryErrorMessage = `Sorry! You can only add one entry per day.`;

const EntryForm = ({ errors, setErrors }: Props) => {
  const user = React.useContext(UserContext);
  const navigate = useNavigate();

  const [image, setImage] = useState<File | null>(null);

  const [createEntryMutation] = useMutation(CREATE_ENTRY_MUTATION, {
    onError: (error) => {
      setErrors([...errors, error.message]);
    },
  });

  const checkThatEntryForTodayAlreadyExists = () => {
    const currentDate = new Date().toString().slice(0, 15);
    const entryForToday = user!.entries.find((entry) => {
      return new Date(entry.date).toString().slice(0, 15) === currentDate;
    });
    return entryForToday ? true : false;
  };

  const handleSubmitEntry = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (checkThatEntryForTodayAlreadyExists()) {
      setErrors([...errors, cannotAddEntryErrorMessage]);
      navigate('/');
      return;
    }

    if (!image) {
      setErrors([...errors, 'Please select an image']);
    } else {
      const url = await uploadToCloudinary(image);
      const newEntry = await createEntryMutation({
        variables: {
          createEntryInput: {
            date: new Date(),
            image_url: url,
            userId: user!.id,
          },
        },
      });

      navigate(`/entry/${newEntry.data?.createEntry.id}`);
    }
  };

  return (
    <div>
      <h2>Upload today's pic</h2>
      <form onSubmit={handleSubmitEntry}>
        <label htmlFor="image" className="upload-photo-label">
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(event) => {
              if (event.target.files) {
                setImage(event.target.files[0]);
              }
            }}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EntryForm;
