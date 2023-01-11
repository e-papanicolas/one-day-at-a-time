import React, { useState } from 'react';
import { gql } from '../__generated__';
import { useMutation } from '@apollo/client';
import { UserContext } from './Root';
import { Navigate, useNavigate } from 'react-router-dom';

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

  const uploadToCloudinary = async () => {
    const data = new FormData();
    data.append('file', image as File);
    data.append('cloud_name', 'eleni');
    data.append('upload_preset', 'yuf8gy6c');
    const response = await fetch(
      'https://api.cloudinary.com/v1_1/eleni/image/upload',
      {
        method: 'POST',
        body: data,
      },
    );
    const file = await response.json();
    const newUrl: string = file.secure_url;
    return newUrl;
  };

  const [createEntryMutation, { error, data }] = useMutation(
    CREATE_ENTRY_MUTATION,
  );
  console.log(data);

  const handleSubmitEntry = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const url = await uploadToCloudinary();
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
            // on change update image state
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
