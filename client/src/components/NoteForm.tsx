import React, { useState } from 'react';
import { gql } from '../__generated__';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';

type Props = {
  errors: string[];
  setErrors: React.Dispatch<React.SetStateAction<string[]>>;
};

const CREATE_NOTE_MUTATION = gql(`
  mutation CreateNote($createNoteInput: CreateNoteInput!) {
  createNote(createNoteInput: $createNoteInput) {
    id
    entryId
    content
  }
}
`);

const NoteForm = ({ errors, setErrors }: Props) => {
  let { entryId } = useParams();
  const navigate = useNavigate();

  const [content, setContent] = useState<string>('');

  const [createNoteMutation] = useMutation(CREATE_NOTE_MUTATION, {
    onError: (error) => {
      setErrors([...errors, error.message]);
    },
  });

  const handleSubmitNote = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await createNoteMutation({
      variables: {
        createNoteInput: {
          content: content,
          entryId: Number(entryId),
        },
      },
    });

    navigate(`/entry/${entryId}`);
  };

  return (
    <div>
      <h2>Add a note</h2>
      <form onSubmit={handleSubmitNote}>
        <label htmlFor="content" className="content">
          <input
            type="text"
            name="content"
            onChange={(event) => {
              setContent(event.target.value);
            }}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NoteForm;
