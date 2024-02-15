import React, { FC } from 'react';
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../../../components/layout';
import FormPageWrapper from '../../../styles/formContainer';

import appRoutes from '../../../constants/appRoutes';
import CommonVacancyTable from '../../../components/commonVacancyTable/CommonVacancyTable';
import { USER_ROLE } from '../../../constants';
import ApplicationsWrapper from '../../../components/candidate/applicationsWrapper';
import { useVacanciesAwaitingApproval } from '../../../services/vacancies/vacancyService';
import { useGetApplicationWaitingForApproval } from '../../../services/applications/applicationsService';

const Dashboard: FC = () => {
  const navigate = useNavigate();
  const { vacancies, loading, total } = useVacanciesAwaitingApproval();

  const {
    applications,
    loading: applicationLoading,
    total: applicationTotal,
  } = useGetApplicationWaitingForApproval();

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: (
        <div>
          You have
          {' '}
          <strong>{total}</strong>
          {' '}
          {total > 1 ? 'vacancies' : 'vacancy'}
          {' '}
          awaiting approval.
          {' '}
          <span className='pull-right'>Show/Hide</span>
        </div>
      ),
      children: (
        <>
          {!loading && vacancies.length > 0 && (
            <CommonVacancyTable
              role={USER_ROLE.ADMIN}
              isPagination={false}
              data={vacancies}
              isDashboard
              className='vacancy-wrapper'
            />
          )}
          <div
            className='view-all'
            onClick={() => navigate(appRoutes.VACANCIES)}
            onKeyDown={() => navigate(appRoutes.VACANCIES)}
            role='button'
            tabIndex={0}
          >
            View all vacancies
          </div>
        </>
      ),
    },
  ];

  const items2: CollapseProps['items'] = [
    {
      key: '1',
      label: (
        <div>
          You have
          {' '}
          <strong>{applicationTotal}</strong>
          {' '}
          application
          {applicationTotal > 1 && 's'}
          {' '}
          awaiting approval.
          {' '}
          <span className='pull-right'>Show/Hide</span>
        </div>
      ),
      children: (
        <>
          {!applicationLoading && applications.length > 0 && (
            <ApplicationsWrapper
              isPagination={false}
              role={USER_ROLE.ADMIN}
              isCandidate={false}
              data={applications}
              isDashboard
            />
          )}
          <div
            className='view-all'
            onClick={() => navigate(appRoutes.USER_APPLICATIONS)}
            onKeyDown={() => navigate(appRoutes.USER_APPLICATIONS)}
            role='button'
            tabIndex={0}
          >
            View all applications
          </div>
        </>
      ),
    },
  ];

  const onChange = () => {
    // console.log(key);
  };

  return (
    <AppLayout>
      <FormPageWrapper>
        <div>
          <h1>My Dashboard</h1>
        </div>
        <div>
          <h2 className='sub-heading'>Vacancies awaiting approval</h2>
          <Collapse
            items={items}
            defaultActiveKey={['1']}
            onChange={onChange}
          />
        </div>
        <div>
          <h2 className='sub-heading'>Applications awaiting approval</h2>
          <Collapse
            items={items2}
            defaultActiveKey={['1']}
            onChange={onChange}
          />
        </div>
      </FormPageWrapper>
    </AppLayout>
  );
};

export default Dashboard;
