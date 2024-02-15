import React from 'react';
import { useParams } from 'react-router-dom';
import AppLayout from '../../../components/layout';
import FormPageWrapper from '../../../styles/formContainer';
import NotesForm from '../../../components/notesForm/NotesForm';
import {
  useAddNotesForEmployer,
  useAdminNoteByIdForEmployer,
  useRemoveEmployerNotes,
  useUpdateEmployerNotes,
} from '../../../services/admin/adminService';
import appRoutes from '../../../constants/appRoutes';
import { USER_ROLE } from '../../../constants';

const ClientNoteAddAndEdit = () => {
  const { id, notesId } = useParams();
  const { addNote } = useAddNotesForEmployer();
  const { updateNote } = useUpdateEmployerNotes();
  const { adminNote } = useAdminNoteByIdForEmployer(Number(notesId));
  const { removeNote } = useRemoveEmployerNotes();

  return (
    <AppLayout>
      <FormPageWrapper>
        <NotesForm
          id={Number(id)}
          notesId={notesId ? Number(notesId) : null}
          addNote={addNote}
          updateNote={updateNote}
          note={adminNote}
          removeNotes={removeNote}
          redirectRoute={`${appRoutes.DASHBOARD}/${appRoutes.CLIENT_DETAIL_ROUTE}/${id}`}
          role={USER_ROLE.EMPLOYER}
        />
      </FormPageWrapper>
    </AppLayout>
  );
};

export default ClientNoteAddAndEdit;
