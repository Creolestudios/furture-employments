import React, { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AppLayout from '../../../components/layout';
import FormPageWrapper from '../../../styles/formContainer';
import VacancyDetail from '../../../components/vacancyDetails/VacancyDetail';
import appRoutes from '../../../constants/appRoutes';
import Loader from '../../../components/common/loader';
import { useVacancyDetails } from '../../../services/vacancies/vacancyService';

const VacancyDetails: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, data } = useVacancyDetails(Number(id));

  if (loading) return <Loader />;

  const {
    description,
    id: vacancyId,
    status,
    category,
    type,
    position,
    salary,
    weeklyHours,
    employer,
    campaigns,
    additionalFileName,
  } = data?.vacancyDetails || {};
  const { companyName, city, country } = employer || {};
  return (
    <AppLayout>
      <FormPageWrapper>
        <div className='page-header'>
          <h1>{position}</h1>
          <div
            className='vacancy-link'
            onClick={() => navigate(appRoutes.VACANCIES)}
            onKeyDown={() => navigate(appRoutes.VACANCIES)}
            role='button'
            tabIndex={0}
          >
            Back to all vacancies
          </div>
        </div>
        <VacancyDetail
          employerId={employer.id}
          vacancyId={vacancyId}
          description={description}
          status={status}
          category={category}
          type={type}
          salary={salary}
          weeklyHours={weeklyHours}
          companyName={companyName}
          city={city}
          country={country}
          campaignCreatedAt={campaigns}
          additionalFileName={additionalFileName}
        />
      </FormPageWrapper>
    </AppLayout>
  );
};

export default VacancyDetails;
