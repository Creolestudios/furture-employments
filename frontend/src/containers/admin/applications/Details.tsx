import React, { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import AppLayout from '../../../components/layout';
import FormPageWrapper from '../../../styles/formContainer';
import appRoutes from '../../../constants/appRoutes';
import ApplicationDetail from '../../../components/applicationDetails/ApplicationDetail';
import { DATE_FORMAT, USER_ROLE_KEY } from '../../../constants';
import { useGetApplicationsDetails } from '../../../services/applications/applicationsService';
import { getFullName } from '../../../utils';

const ApplicationDetailAdmin: FC = () => {
  const { id } = useParams();

  const userRole = sessionStorage.getItem(USER_ROLE_KEY);

  const navigate = useNavigate();

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
            onClick={() => navigate(appRoutes.USER_APPLICATIONS)}
            onKeyDown={() => navigate(appRoutes.USER_APPLICATIONS)}
            role='button'
            tabIndex={0}
          >
            Back to all applications
          </div>
        </div>
        <ApplicationDetail
          userRole={Number(userRole)}
          id={Number(id)}
          applicant={getFullName(
            details?.user?.firstName,
            details?.user?.lastName,
          )}
          user={details.user}
          futureProspectsCv={details?.about?.futureProspectsCv}
          vacancy={details.vacancy}
          createdAt={details.createdAt}
          status={details?.status}
          profile={details?.profile}
          about={details?.about}
          approveReasons={details?.approveReason}
          updatedAt={moment(details?.about?.updatedAt).format(DATE_FORMAT)}
        />
      </FormPageWrapper>
    </AppLayout>
  );
};

export default ApplicationDetailAdmin;
