import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AppLayout from '../../../components/layout';
import FormPageWrapper from '../../../styles/formContainer';
import NotesForm from '../../../components/notesForm/NotesForm';
import {
  useAdminNotesById,
  useAdminNotesForCandidate,
  useAdminNotesRemove,
  useAdminNotesUpdate,
  useCandidateSkills,
} from '../../../services/admin/adminService';
import appRoutes from '../../../constants/appRoutes';
import { USER_ROLE } from '../../../constants';
import { getFullName } from '../../../utils';

const CandidateNoteAddAndEdit = () => {
  const navigate = useNavigate();
  const { id, notesId } = useParams();
  const { addNote } = useAdminNotesForCandidate();
  const { updateCandidateNote } = useAdminNotesUpdate();
  const { adminNote } = useAdminNotesById(Number(notesId));
  const { removeCandidateNotes } = useAdminNotesRemove();
  const { candidateSkillsDetails } = useCandidateSkills(Number(id));

  return (
    <AppLayout>
      <FormPageWrapper>
        <div className='page-header'>
          <h1>
            {notesId ? 'Update Note For' : 'Add Note For'}
            {' '}
            {getFullName(
              candidateSkillsDetails?.firstName,
              candidateSkillsDetails?.lastName,
            )}
          </h1>
          <div
            className='vacancy-link'
            onClick={() => navigate(`${appRoutes.CANDIDATES_DETAILS}/${id}`)}
            onKeyDown={() => navigate(`${appRoutes.CANDIDATES_DETAILS}/${id}`)}
            role='button'
            tabIndex={0}
          >
            Back to candidate details
          </div>
        </div>
        <NotesForm
          id={Number(id)}
          notesId={notesId ? Number(notesId) : null}
          addNote={addNote}
          updateNote={updateCandidateNote}
          note={adminNote}
          removeNotes={removeCandidateNotes}
          redirectRoute={`${appRoutes.DASHBOARD}/${appRoutes.CANDIDATE_DETAIL_ROUTE}/${id}`}
          role={USER_ROLE.CANDIDATE}
        />
      </FormPageWrapper>
    </AppLayout>
  );
};

export default CandidateNoteAddAndEdit;
