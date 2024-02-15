import React, { useEffect, useState } from 'react';
import { Tag } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import ApplicationDetailWrapper from '../applicationDetails/ApplicationDetail.styles';
import DetailsTab from './DetailsTab';

import NotesTab from './NotesTab';
import appRoutes from '../../constants/appRoutes';
import {
  useAdminNotes,
  useCandidateDetailForAdmin,
} from '../../services/admin/adminService';
import usePagination from '../../hooks/usePagination';

import { IGetApplicationsQuery } from '../../interfaces';
import { useGetCandidateApplications } from '../../services/applications/applicationsService';
import ApplicationsWrapper from '../candidate/applicationsWrapper';
import { PAGE_NO, PAGE_SIZE, PAGINATION, USER_ROLE } from '../../constants';
import TabsWrapper from '../common/tabsWrapper/TabsWrapper';
import candidateService from '../../services/candidate/candidateService';
import { downloadFile } from '../../utils';
import ApplyForJob from '../candidate/ApplyForJob';
import { useAdminVacancyList } from '../../services/vacancies/vacancyService';

const CandidateDetails: React.FC<any> = ({
  skills,
  candidateName,
  registeredDate,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [applyData, setApplyData] = useState<any>([]);
  const { pagination, paginationConfig, setTotal } = usePagination({
    current: PAGE_NO,
    pageSize: PAGE_SIZE,
  });
  const { adminNotes, loading } = useAdminNotes(Number(id));
  const [cvContentUrlArgs, setCvContentUrlArgs] = useState<any>({
    fileName: '',
    fetchQuery: false,
  });
  const { vacancies,total } = useAdminVacancyList({
    current:0,
    pageSize: 0,
  });
  const { applications }: IGetApplicationsQuery = useGetCandidateApplications({
    current: PAGINATION.CURRENT,
    pageSize: PAGINATION.PAGE_SIZE,
    candidateId: Number(id),
  });
  const { data, aboutCandidate, candidateCv, jobPreference,userId } =
    useCandidateDetailForAdmin(Number(id));
  const { data: cvUrlData } =
    candidateService.useGetCvContentUrl(cvContentUrlArgs);

  if (cvUrlData) {
    downloadFile(
      cvUrlData?.getCvContentUrl?.url,
      cvUrlData?.getCvContentUrl?.fileName
    );
  }

  useEffect(() => {
    if (total) {
      setTotal(total);
    }
  }, [total, pagination]);

  useEffect(() => {
    if (vacancies) {
      const array: any = [];
      vacancies?.forEach((item: any) => {
        const appliedList = applications?.filter(
          (application: any) => application.vacancyId === item.id
        )[0];
        const value = {
          key: item.id,
          position: item.position,
          status: appliedList ? 'Applied' : 'Not Applied',
          id: item.id,
        };
        item.status === 2 && array.push(value);
      });
      setApplyData(array);
    }
  }, [vacancies, applications]);

  const items: any = [
    {
      label: 'Details',
      key: '#details',
      children: (
        <DetailsTab
          data={data}
          aboutCandidate={aboutCandidate}
          jobPreference={jobPreference}
        />
      ),
    },
    {
      label: 'Notes',
      key: '#notes',
      children: (
        <NotesTab
          redirectAddNote={`${appRoutes.DASHBOARD}/${appRoutes.CANDIDATE_DETAIL_ROUTE}/${id}/${appRoutes.ADD_NOTE}`}
          redirectEditNote={`${appRoutes.DASHBOARD}/${appRoutes.CANDIDATE_DETAIL_ROUTE}/${id}/${appRoutes.UPDATE_NOTE}`}
          adminNotes={adminNotes}
          loading={loading}
        />
      ),
    },
    applications?.length > 0 && {
      label: 'Applications',
      key: '#application',
      children: (
        <ApplicationsWrapper
          isCandidate
          data={applications}
          role={USER_ROLE.CANDIDATE}
        />
      ),
    },
    jobPreference[3].value && {
      label: 'Apply for a Job',
      key: '#applyForJob',
      children: (
        <ApplyForJob
          applyData={applyData}
          userId={userId}
          paginationConfig={paginationConfig}
        />
      ),
    },
  ];
  const handleDownload = (value: string) => {
    setCvContentUrlArgs({
      fileName: value,
      fetchQuery: true,
    });
  };

  return (
    <ApplicationDetailWrapper>
      {skills && (
        <div className='tags'>
          {skills?.map((skill: string) => (
            <Tag
              color='#58474C'
              onClick={() => {
                window.location.assign(
                  `/portal/dashboard/candidates?page=1&skills=${skill}`
                );
              }}
            >
              {skill}
            </Tag>
          ))}
        </div>
      )}
      <div className='details'>
        <div>
          <div className='details-item'>
            <strong>Candidate Name: </strong>
            <span className='link'>{candidateName}</span>
          </div>
          <div className='details-item'>
            <strong>Candidate CV: </strong>
            {candidateCv ? (
              <span
                className='link'
                onClick={() => handleDownload(candidateCv)}
                onKeyDown={() => {}}
                role='button'
                tabIndex={0}
              >
                Download
              </span>
            ) : (
              <span>N/A</span>
            )}
          </div>
        </div>
        <div>
          <div className='details-item'>
            <strong>Date Registered: </strong>
            <span>{registeredDate}</span>
          </div>
        </div>
      </div>
      <TabsWrapper items={items} />
    </ApplicationDetailWrapper>
  );
};

export default CandidateDetails;
