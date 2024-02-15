import React, { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import AppLayout from '../../../components/layout';
import FormPageWrapper from '../../../styles/formContainer';
import appRoutes from '../../../constants/appRoutes';
import CandidateDetails from '../../../components/candidateDetails/CandidateDetails';
import { useCandidateSkills } from '../../../services/admin/adminService';
import { getFullName } from '../../../utils';
import { DATE_FORMAT } from '../../../constants';

const CandidateDetail: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { candidateSkillsDetails, loading } = useCandidateSkills(Number(id));

  return (
    <AppLayout>
      {!loading && candidateSkillsDetails && (
        <FormPageWrapper>
          <div className='page-header'>
            <h1>
              {getFullName(
                candidateSkillsDetails?.firstName,
                candidateSkillsDetails?.lastName,
              )}
            </h1>
            <div
              className='vacancy-link'
              onClick={() => navigate(appRoutes.CANDIDATES)}
              onKeyDown={() => navigate(appRoutes.CANDIDATES)}
              role='button'
              tabIndex={0}
            >
              Back to all candidates
            </div>
          </div>
          <CandidateDetails
            skills={candidateSkillsDetails?.aboutCandidate?.skills}
            candidateName={getFullName(
              candidateSkillsDetails?.firstName,
              candidateSkillsDetails?.lastName,
            )}
            registeredDate={moment(candidateSkillsDetails?.createdAt).format(
              DATE_FORMAT,
            )}
          />
        </FormPageWrapper>
      )}
    </AppLayout>
  );
};

export default CandidateDetail;
