import React, { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import AppLayout from '../../../components/layout';
import FormPageWrapper from '../../../styles/formContainer';
import VacancyDetail from '../../../components/vacancyDetails/VacancyDetail';
import appRoutes from '../../../constants/appRoutes';
import { VACANCIES_DETAILS } from '../../../graphql/queries/vacancies';
import Loader from '../../../components/common/loader';

const VacancyDetails: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, data: vacancyData } = useQuery(VACANCIES_DETAILS, {
    variables: { vacancyId: Number(id) },
  });
  if (loading) return <Loader />;
  const {
    status,
    id: vacancyId,
    description,
    category,
    type,
    position,
    salary,
    weeklyHours,
    employer: { companyName, city, country },
    additionalFileName,
  } = vacancyData.vacancyDetails || {};
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
          additionalFileName={additionalFileName}
        />
      </FormPageWrapper>
    </AppLayout>
  );
};

export default VacancyDetails;
