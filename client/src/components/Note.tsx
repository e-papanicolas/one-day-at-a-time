import React, { useState } from 'react';
import { EntryQuery, Note } from '../__generated__/graphql';
import { gql } from '../__generated__';
import { ApolloQueryResult, useMutation } from '@apollo/client';

type Props = {
  note: Note;
  refetch: (
    variables?:
      | Partial<{
          entryId: number;
        }>
      | undefined,
  ) => Promise<ApolloQueryResult<EntryQuery>>;
};

const UPDATE_NOTE_MUTATION = gql(`
  mutation UpdateNote($updateNoteInput: UpdateNoteInput!) {
  updateNote(updateNoteInput: $updateNoteInput) {
    id
    entryId
    content
  }
}
`);

const REMOVE_NOTE_MUTATION = gql(`
  mutation RemoveNote($removeNoteId: Float!) {
  removeNote(id: $removeNoteId) {
    id
  }
}
`);

const NoteComponent = ({ refetch, note }: Props) => {
  const [currentNote, setNote] = useState<Note>(note);
  const [updating, setUpdating] = useState<boolean>(false);
  const [content, setContent] = useState<string>(currentNote.content);

  const [updateNoteMutation, { error }] = useMutation(UPDATE_NOTE_MUTATION);
  const [removeNoteMutation] = useMutation(REMOVE_NOTE_MUTATION);

  const handleUpdateNote = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const updatedNote = await updateNoteMutation({
      variables: {
        updateNoteInput: {
          id: currentNote.id,
          content: content,
        },
      },
    });
    setNote(updatedNote.data!.updateNote);
    setUpdating(false);
  };

  const handleRemoveNote = async () => {
    await removeNoteMutation({
      variables: {
        removeNoteId: currentNote.id,
      },
    });
    refetch({ entryId: currentNote.entryId });
  };

  return (
    <div>
      <h3>Note</h3>
      <div>{currentNote.content}</div>
      <button onClick={() => setUpdating(true)}>edit</button>
      <button onClick={handleRemoveNote}>delete</button>

      {updating && (
        <div>
          <form onSubmit={handleUpdateNote}>
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
      )}
      {error && <p>{error.message}</p>}
    </div>
  );
};

export default NoteComponent;
