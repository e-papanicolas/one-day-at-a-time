import React from 'react';

type Props = {
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
  handleUpdateEntry: (event: React.FormEvent<HTMLFormElement>) => void;
};

const UpdateEntryForm = ({ setImage, handleUpdateEntry }: Props) => {
  return (
    <form onSubmit={handleUpdateEntry}>
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
  );
};

export default UpdateEntryForm;
