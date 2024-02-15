import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AppLayout from '../../../components/layout';
import CardWrapper from '../../../components/common/cardWrapper';
import { useGetCandidateApplication } from '../../../services/applications/applicationsService';
import { convertIntoCardData } from '../../../utils';
import { APPLICATION_STATUS_TYPE, USER_ROLE } from '../../../constants';
import Notification from '../../../components/common/Notification';
import Loader from '../../../components/common/loader';

import StyledApplicationDetails from './application-details.styles';

const GetApplicationContent: React.FC<{ applicationStatus: number }> = ({
  applicationStatus,
}) => {
  const getCheckContent = () => (
    <p>
      Please regularly check your online dashboard for updates on this
      application.
    </p>
  );

  switch (applicationStatus) {
    case APPLICATION_STATUS_TYPE.unapproved:
      return (
        <div>
          <p>
            Thank you for your application - this is now being reviewed by the
            Future Employments team.
          </p>
          {getCheckContent()}
        </div>
      );
    case APPLICATION_STATUS_TYPE.open:
      return (
        <div>
          <p>Your job application is awaiting review by the Employer.</p>
          {getCheckContent()}
        </div>
      );
    case APPLICATION_STATUS_TYPE.accepted:
      return (
        <div>
          <p>
            Congratulations - your job application has been accepted by the
            Employer.
          </p>
        </div>
      );
    case APPLICATION_STATUS_TYPE.shortlisted:
      return (
        <div>
          <p>Your job application has been shortlisted by the Employer</p>
          {getCheckContent()}
        </div>
      );
    case APPLICATION_STATUS_TYPE.unsuccessful:
      return (
        <div>
          <p>Thank you for your application.</p>
          <p>
            On this occasion unfortunately we feel that your experience is not
            quite suited to the role. Unfortunately due to high volume of
            applications we receive, we are unable to provide individual
            feedback.
          </p>
          <p>
            Please do keep referring to and applying for other employment
            opprtunities via your online dashboard on the Future Employments
            website.
          </p>
          <p>Than you again for your interest.</p>
        </div>
      );
    default:
      return null;
  }
};

const ApplicationDetails: React.FC = () => {
  const params = useParams();
  const { application, loading, error }: any = useGetCandidateApplication(
    Number(params.applicationId) ?? null,
  );

  useEffect(() => {
    if (error) {
      Notification({ type: 'error', message: error.message });
    }
  }, [error]);

  return (
    <AppLayout>
      <StyledApplicationDetails>
        <h1 className='page-heading'>Application Details</h1>
        {loading && <Loader />}
        {!loading && application && (
          <>
            <CardWrapper
              data={convertIntoCardData(application, USER_ROLE.CANDIDATE)}
            />
            <GetApplicationContent applicationStatus={application.status} />
          </>
        )}
      </StyledApplicationDetails>
    </AppLayout>
  );
};

export default ApplicationDetails;
