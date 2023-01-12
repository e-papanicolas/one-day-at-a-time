import React, { useState } from 'react';
import { gql } from '../__generated__';
import { useMutation } from '@apollo/client';
import { UserContext } from './Root';
import { useNavigate } from 'react-router-dom';
import uploadToCloudinary from '../utils/cloudinary-upload';

type Props = {};

const CREATE_ENTRY_MUTATION = gql(`
  mutation CreateEntry($createEntryInput: CreateEntryInput!) {
    createEntry(createEntryInput: $createEntryInput) {
      id
      date
      image_url
    }
  }
`);

const EntryForm = (props: Props) => {
  const user = React.useContext(UserContext);
  const navigate = useNavigate();

  const [image, setImage] = useState<File | null>(null);

  const [createEntryMutation, { error }] = useMutation(CREATE_ENTRY_MUTATION);

  const handleSubmitEntry = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!image) console.error('no image'); // add some error handling
    else {
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
      {error && <p>{error.message}</p>}
    </div>
  );
};

export default EntryForm;
