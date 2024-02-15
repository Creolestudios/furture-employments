import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import AppLayout from '../../../components/layout';
import FormPageWrapper from '../../../styles/formContainer';
import { useCandidateDetailForAdmin } from '../../../services/admin/adminService';
import CandidateProfileForm from '../../../components/candidate/candidateProfileForm';

const EditCandidate: FC = () => {
  const { id } = useParams();
  const { data } = useCandidateDetailForAdmin(Number(id));
  return (
    <AppLayout>
      <FormPageWrapper>
        <div>
          <h1>Edit Candidate</h1>
        </div>
        <CandidateProfileForm candidateData={data} />
      </FormPageWrapper>
    </AppLayout>
  );
};

export default EditCandidate;
