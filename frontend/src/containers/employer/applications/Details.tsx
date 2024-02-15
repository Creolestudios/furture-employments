import React, { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AppLayout from '../../../components/layout';
import FormPageWrapper from '../../../styles/formContainer';
import ApplicationDetail from '../../../components/applicationDetails/ApplicationDetail';
import appRoutes from '../../../constants/appRoutes';
import { useGetApplicationsDetails } from '../../../services/applications/applicationsService';
import { getFullName } from '../../../utils';
import { USER_ROLE_KEY } from '../../../constants';

const ApplicationDetails: FC = () => {
  const userRole = sessionStorage.getItem(USER_ROLE_KEY);
  const navigate = useNavigate();
  const { id } = useParams();
  const { details } = useGetApplicationsDetails({
    applicationId: Number(id),
  });

  return (
    <AppLayout>
      <FormPageWrapper>
        <div className='page-header'>
          <h1>Application Details</h1>
          <div
            className='vacancy-link'
            onClick={() => navigate(`${appRoutes.VACANCY_DETAILS}/${details.vacancy?.id}`)}
            onKeyDown={() => navigate(`${appRoutes.VACANCY_DETAILS}/${details.vacancy?.id}`)}
            role='button'
            tabIndex={0}
          >
            View Vacancy Details
          </div>
        </div>
        <ApplicationDetail
          userRole={Number(userRole)}
          applicant={getFullName(
            details?.user?.firstName,
            details?.user?.lastName,
          )}
          user={details.user}
          vacancy={details.vacancy}
          createdAt={details.createdAt}
          status={details?.status}
          profile={details?.profile}
          about={details?.about}
          futureProspectsCv={details?.about?.futureProspectsCv}
          id={Number(id)}
          approveReasons={details?.approveReason}
          approvedBy={details?.approvedBy}
          updatedAt={details?.about?.updatedAt}
        />
      </FormPageWrapper>
    </AppLayout>
  );
};

export default ApplicationDetails;
