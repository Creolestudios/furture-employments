import React, { useEffect, useState } from 'react';
import { Button, Modal, Tabs } from 'antd';
import {
  EditFilled,
  CheckOutlined,
  FolderOutlined,
  PlaySquareOutlined,
} from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import ApplicationDetailWrapper from '../applicationDetails/ApplicationDetail.styles';
import JobDescription from '../jobDescription/JobDescription';
import ApplicationsPerVacancy from '../applicationsPerVacancy';
import StatusTagWithPopover from '../vacancyStatus/VacancyStatus';
import { filterVacancyStatus } from '../../utils/filterStatus';
import { USER_ROLE, USER_ROLE_KEY } from '../../constants';
import appRoutes from '../../constants/appRoutes';
import TextAreaField from '../common/formElements/TextAreaField';
import Notification from '../common/Notification';
import {
  useApproveVacancyService,
  useCloseVacancyService,
} from '../../services/vacancies/vacancyService';
import {
  VACANCIES_DETAILS,
  VACANCIES_LIST,
} from '../../graphql/queries/vacancies';
import CampaignsList from '../campaignsList';
import datesLesserThanCurrent from '../../utils/datesLesserThanCurrent';
import { useGetApplicationsForVacancy } from '../../services/applications/applicationsService';
import { Colors, FontFamily } from '../../styles/variable';
import InviteCandidates from '../InviteCandidates/InviteCandidates';

interface IProps {
  vacancyId: number;
  status: number;
  category: string;
  type: string;
  salary: string;
  weeklyHours: number;
  companyName: string;
  city: string;
  country: string;
  description: string;
  campaignCreatedAt?: any;
  employerId?: any;
  additionalFileName?: any;
}

const ROLE: any = sessionStorage.getItem(USER_ROLE_KEY);

const StatusButtons = ({ status, vacancyId, campaignCreatedAt }: any) => {
  let buttonsToRender;
  const navigate = useNavigate();
  const { id } = useParams();
  const [closeReason, setReason] = useState<any>('');
  const [active, setActive] = useState<boolean>(false);

  const { approveVacancy } = useApproveVacancyService();
  const { closeVacancy } = useCloseVacancyService();

  const handleApproveVacancy = async () => {
    await approveVacancy({
      variables: { vacancyId },
      refetchQueries: [VACANCIES_DETAILS, VACANCIES_LIST],
    })
      .then((res) => {
        Notification({
          type: 'success',
          message: res?.data?.approveVacancy?.message,
        });
        navigate(`${appRoutes.CAMPAIGN_START}/${vacancyId}`);
      })
      .catch((error) => {
        Notification({ type: 'error', message: error.message });
      });
  };

  switch (status) {
    case 1:
      buttonsToRender = (
        <div className='succes-btn'>
          <Button icon={<CheckOutlined />} onClick={handleApproveVacancy}>
            Approve Vacancy
          </Button>
        </div>
      );
      break;
    case 2:
      buttonsToRender = datesLesserThanCurrent({
        dateList: campaignCreatedAt,
      }) ? null : (
        <div className='info-btn'>
          <Button
            icon={<PlaySquareOutlined />}
            onClick={() => navigate(`${appRoutes.CAMPAIGN_START}/${vacancyId}`)}
          >
            Run new campaign
          </Button>
        </div>
        );
      break;
    default:
      buttonsToRender = null;
  }

  const handleCancel = () => {
    setActive(false);
  };

  const handleCloseVacancy = async () => {
    await closeVacancy({
      variables: { vacancyId, closeReason },
      refetchQueries: [VACANCIES_DETAILS],
    })
      .then((res) => {
        Notification({
          type: 'success',
          message: res.data.closeVacancy.message,
        });
        setActive(false);
      })
      .catch((error) => {
        Notification({ type: 'error', message: error.message });
      });
  };

  return (
    <div className='actions vacancy'>
      {Number(ROLE) === USER_ROLE.ADMIN && buttonsToRender}
      <Modal
        open={active}
        title={null}
        className='close-vacancy'
        onCancel={handleCancel}
        footer={[
          <Button key='back' onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key='submit'
            type='primary'
            style={{
              color: ' #fff',
              backgroundColor: 'rgba(16, 24, 32, 0.66)',
            }}
            onClick={handleCloseVacancy}
          >
            Close Vacancy
          </Button>,
        ]}
      >
        <div>
          <h2>Close Vacancy</h2>
          <hr />
        </div>
        <div>
          <p>Reason for closing:</p>
          <TextAreaField
            rows={3}
            onChange={(e: any) => setReason(e.target.value)}
          />
        </div>
        <hr />
      </Modal>
      {status !== 3 && (
        <div className='detail-right-action'>
          <div className='succes-btn'>
            <Button
              icon={<EditFilled />}
              onClick={() => {
                navigate(`${appRoutes.EDIT_VACANCY}/${id}`);
              }}
            >
              Update Vacancy Details
            </Button>
          </div>
          {status !== 3 && (
            <div className='inverse-btn'>
              <Button icon={<FolderOutlined />} onClick={() => setActive(true)}>
                Close Vacancy
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const VacancyDetail: React.FC<IProps> = ({
  employerId,
  status,
  category,
  type,
  salary,
  weeklyHours,
  companyName,
  city,
  country,
  vacancyId,
  description,
  campaignCreatedAt,
  additionalFileName,
}) => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState<any>([]);
  const [payload, setPayload] = useState<any>({
    current: 1,
    pageSize: 5,
  });
  const [newData, setNewData] = useState<any>([]);
  const { applications, total, pageNo } = useGetApplicationsForVacancy({
    current: payload.current,
    pageSize: payload.pageSize,
    vacancyId,
  });
  useEffect(() => {
    if (applications.length !== tableData.length) {
      setTableData(applications);
    }
  }, [applications]);

  useEffect(() => {
    if (Number(sessionStorage.getItem(USER_ROLE_KEY)) === USER_ROLE.EMPLOYER) {
      const filteredData = tableData.filter((item: any) => item.status !== 1);
      setNewData(filteredData);
    } else {
      setNewData(tableData);
    }
  }, [tableData]);

  // if (loading) return <Loader />;
  const items: any = [
    {
      label: 'Details',
      key: 1,
      children: (
        <JobDescription
          description={description}
          additionalFileName={additionalFileName}
        />
      ),
    },
    newData.length > 0
      ? {
        label: 'Applications',
        key: 2,
        children: (
          <ApplicationsPerVacancy
            applicationData={newData}
            payload={payload}
            setPayload={setPayload}
            pageNo={pageNo}
            totalPages={total}
          />
        ),
      }
      : null,
    Number(ROLE) === USER_ROLE.ADMIN
    && campaignCreatedAt
    && campaignCreatedAt?.length > 0
      ? {
        label: 'Campaigns',
        key: 3,
        children: <CampaignsList status={status} />,
      }
      : null,
    Number(ROLE) === USER_ROLE.ADMIN && status === 2
      ? {
        label: 'Send to Candidates',
        key: 4,
        children: <InviteCandidates alreadyApplied={newData} />,
      }
      : null,
  ];

  return (
    <ApplicationDetailWrapper>
      <div className='details'>
        <div>
          {Number(ROLE) === USER_ROLE.ADMIN && (
            <div className='details-item'>
              <strong>Client: </strong>
              <span
                style={{
                  color: Colors.SUCCESS,
                  fontFamily: FontFamily.SOURCESANS_SEMI_BOLD,
                  cursor: 'pointer',
                }}
                onClick={() => {
                  navigate(`${appRoutes.CLIENT_DETAILS}/${employerId}`);
                }}
                onKeyDown={() => {
                  navigate(`${appRoutes.CLIENT_DETAILS}/${employerId}`);
                }}
                tabIndex={0}
                role='button'
              >
                {companyName}
              </span>
            </div>
          )}
          <div className='details-item'>
            <strong>Job Ref: </strong>
            <span>{vacancyId}</span>
          </div>
          <div className='details-item'>
            <strong>Job Category: </strong>
            <span>{category}</span>
          </div>
          <div className='details-item'>
            <strong>Job Type: </strong>
            <span>{Array.isArray(type) ? type.join(', ') : type}</span>
          </div>
          <div className='details-item'>
            <strong>Location: </strong>
            <span>
              {city}
              ,
              {country}
            </span>
          </div>
        </div>
        <div>
          <div className='details-item'>
            <strong>Contracted Weekly Hours: </strong>
            <span>{weeklyHours}</span>
          </div>
          <div className='details-item'>
            <strong>Salary: </strong>
            <span>
              {' '}
              {salary}
            </span>
          </div>
          <div>
            <strong>Status: </strong>
            <span>
              <StatusTagWithPopover tag={filterVacancyStatus(status)} />
            </span>
          </div>
        </div>
      </div>
      <Tabs
        // onChange={onChange}
        type='card'
        items={items}
      />
      <StatusButtons
        status={status}
        vacancyId={vacancyId}
        campaignCreatedAt={campaignCreatedAt}
      />
    </ApplicationDetailWrapper>
  );
};

export default VacancyDetail;

VacancyDetail.defaultProps = {
  campaignCreatedAt: '',
  employerId: undefined,
  additionalFileName: undefined,
};
