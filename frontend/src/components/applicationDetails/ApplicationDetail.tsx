import React, { useEffect, useState } from 'react';
import { Button, Popover, Tag } from 'antd';
import {
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
  FileOutlined,
  StarFilled,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
import ApplicationDetailWrapper from './ApplicationDetail.styles';
import { APPLICATION_STATUS, USER_ROLE } from '../../constants';
import ModalWrapper from '../common/modalWrapper';
import TextAreaField from '../common/formElements/TextAreaField';
import {
  useAcceptApplication,
  useApproveApplicationByAdmin,
  useRejectApplication,
  useShortlistApplication,
} from '../../services/applications/applicationsService';
import candidateService from '../../services/candidate/candidateService';
import {
  downloadFile,
  getErrorResponse,
  getSuccessResponse,
} from '../../utils';
import ButtonWrapper from '../common/formElements/buttonWrapper';
import { GET_APPLICATIONS_DETAILS } from '../../graphql/queries/applicationQueries';
import GetWindowDimensions from '../../utils/useWindowDimension';
import appRoutes from '../../constants/appRoutes';
import CheckboxField from '../common/formElements/CheckboxField';

const getApplicationButton = ({
  userRole,
  status,
  futureProspectsCv,
  setIsModalOpen,
}: {
  userRole: number;
  status: number;
  futureProspectsCv: string | null;
  setIsModalOpen: (params: boolean) => void;
}) => {
  if (userRole === USER_ROLE.EMPLOYER) {
    switch (status) {
      case 2:
        return (
          <ButtonWrapper
            icon={<StarFilled />}
            className='success-btn'
            onClick={() => setIsModalOpen(true)}
          >
            Shortlist
          </ButtonWrapper>
        );
      case 3:
        return (
          <ButtonWrapper
            icon={<CheckOutlined />}
            className='success-btn'
            onClick={() => setIsModalOpen(true)}
          >
            Accept application
          </ButtonWrapper>
        );
      default:
        return null;
    }
  } else if (
    status === 1
    && userRole === USER_ROLE.ADMIN
    && futureProspectsCv
  ) {
    return (
      <ButtonWrapper
        className='success-btn'
        onClick={() => setIsModalOpen(true)}
      >
        Create Recommendation
      </ButtonWrapper>
    );
  } else {
    return null;
  }
};

const getApplicationsModal = ({
  status,
  userName,
  setApproveReason,
}: {
  status: number;
  userName: string;
  setApproveReason: (params: string) => void;
}) => {
  switch (status) {
    case 1:
      return {
        modalTitle: 'Create Recommendation',
        content: (
          <div>
            <div>Reason for approving</div>
            <TextAreaField
              onChange={(e: any) => setApproveReason(e.target.value)}
              rows={8}
            />
            <p>
              Note: This will be displayed to clients when they receive the
              application.
            </p>
          </div>
        ),
        btnLabel: 'Create Recommendation',
      };
    case 2:
      return {
        modalTitle: 'Shortlist Application',
        content: 'Add this application to your candidate Shortlist.',
        btnLabel: 'Shortlist Application',
      };
    case 3:
      return {
        modalTitle: 'Accept Applications',
        content: `By accepting this application you confirm that ${userName} has accepted your offer`,
        btnLabel: 'Accept Application',
      };
    default:
      return {};
  }
};

const getApplicationAction = ({
  status,
  userRole,
  id,
  approveReason,
  applicationApprove,
  applicationShortlist,
  setIsModalOpen,
  applicationAccept,
}: {
  status: number;
  userRole: number;
  id: number;
  approveReason: string;
  applicationApprove: any;
  applicationShortlist: any;
  applicationAccept: any;
  setIsModalOpen: (params: boolean) => void;
}) => {
  if (userRole === USER_ROLE.EMPLOYER) {
    switch (status) {
      case 2:
        return applicationShortlist({
          variables: { applicationId: id },
          refetchQueries: [
            {
              query: GET_APPLICATIONS_DETAILS,
              variables: { applicationId: id },
            },
          ],
        })
          .then((res: any) => {
            setIsModalOpen(false);
            getSuccessResponse(res.data.shortListApplication.message);
          })
          .catch((error: any) => getErrorResponse(error.message));
      case 3:
        return applicationAccept({
          variables: { applicationId: id },
          refetchQueries: [
            {
              query: GET_APPLICATIONS_DETAILS,
              variables: { applicationId: id },
            },
          ],
        })
          .then((res: any) => {
            setIsModalOpen(false);
            getSuccessResponse(res.data.acceptApplication.message);
          })
          .catch((error: any) => getErrorResponse(error.message));
      default:
        return null;
    }
  } else if (status === 1 && userRole === USER_ROLE.ADMIN) {
    return applicationApprove({
      variables: { applicationId: id, approveReason },
      refetchQueries: [
        {
          query: GET_APPLICATIONS_DETAILS,
          variables: { applicationId: id },
        },
      ],
    })
      .then((res: any) => {
        setIsModalOpen(false);
        getSuccessResponse(res.data.applicationApprove.message);
      })
      .catch((error: any) => getErrorResponse(error.message));
  } else {
    return null;
  }
};

const ApplicationDetail = ({
  userRole,
  applicant,
  vacancy,
  createdAt,
  futureProspectsCv,
  status,
  profile,
  user,
  approveReasons,
  id,
  about,
  approvedBy,
  updatedAt,
}: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [hideContact, setHideContact] = useState(false);
  const [isRecommendationModalOpen, setRecommendationModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [recommendation, setRecommendation] = useState<any>('');
  const [approveReason, setApproveReason] = useState('');
  const { applicationShortlist } = useShortlistApplication();
  const { applicationAccept } = useAcceptApplication();
  const { applicationReject } = useRejectApplication();
  const size = GetWindowDimensions();

  const isAdmin = userRole === USER_ROLE.ADMIN;

  const [cvContentUrlArgs, setCvContentUrlArgs] = useState<any>({
    fileName: '',
    fetchQuery: false,
  });

  const { data: cvUrlData } = candidateService.useGetCvContentUrl(cvContentUrlArgs);
  const { applicationApprove } = useApproveApplicationByAdmin();

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const navigate = useNavigate();

  const statusTag = () => {
    const popOver: any = APPLICATION_STATUS.filter(
      (item: any) => item.status === status,
    );
    return (
      <Popover
        className='status-popover'
        placement={size.width > 425 ? 'left' : 'top'}
        title={popOver[0]?.name}
        content={popOver[0]?.desc}
      >
        <Tag color={popOver[0]?.color} key={status}>
          <span style={{ fontWeight: 'bold' }}>
            {' '}
            {popOver[0]?.name}
          </span>
        </Tag>
      </Popover>
    );
  };

  const handleReject = () => {
    applicationReject({
      variables: { rejectReason, applicationId: Number(id) },
      refetchQueries: [
        { query: GET_APPLICATIONS_DETAILS, variables: { applicationId: id } },
      ],
    })
      .then((res: any) => getSuccessResponse(res?.data?.rejectApplication?.message))
      .catch((error: any) => getErrorResponse(error.message));
  };
  const handleDownload = (value: string) => {
    setCvContentUrlArgs({
      fileName: value,
      fetchQuery: true,
    });
  };

  if (cvUrlData) {
    downloadFile(
      cvUrlData?.getCvContentUrl?.url,
      cvUrlData?.getCvContentUrl?.fileName,
    );
  }

  const { modalTitle, content, btnLabel } = getApplicationsModal({
    status,
    setApproveReason,
    userName: applicant,
  }) || {};

  const updateReason = () => {
    setRecommendationModalOpen(true);
  };

  useEffect(() => {
    setRecommendation(approveReasons);
  }, [approveReasons]);
  return (
    <ApplicationDetailWrapper>
      <div className='details'>
        <div>
          <div className='details-item'>
            <strong>
              {isAdmin ? 'Candidate Name:' : 'Applicant Name:'}
              {' '}
            </strong>
            <span className={isAdmin ? 'link' : ''}>
              {isAdmin ? (
                <div
                  onClick={() => navigate(`${appRoutes.CANDIDATES_DETAILS}/${profile.id}`)}
                  onKeyDown={() => navigate(`${appRoutes.CANDIDATES_DETAILS}/${profile.id}`)}
                  role='button'
                  tabIndex={0}
                >
                  {applicant}
                </div>
              ) : (
                applicant
              )}
            </span>
          </div>
          <div className='details-item'>
            <strong>
              {isAdmin ? 'Position:' : 'Vacancy:'}
              {' '}
            </strong>
            <span className='link'>
              <div
                onClick={() => navigate(`${appRoutes.VACANCY_DETAILS}/${vacancy.id}`)}
                onKeyDown={() => navigate(`${appRoutes.VACANCY_DETAILS}/${vacancy.id}`)}
                role='button'
                tabIndex={0}
              >
                {vacancy?.position}
              </div>
            </span>
          </div>
          {isAdmin && (
            <div className='details-item'>
              <strong>Client Name: </strong>
              <span className='link'>
                {' '}
                <div
                  onClick={() => navigate(
                    `${appRoutes.CLIENT_DETAILS}/${vacancy.employer.id}`,
                  )}
                  onKeyDown={() => navigate(
                    `${appRoutes.CLIENT_DETAILS}/${vacancy.employer.id}`,
                  )}
                  role='button'
                  tabIndex={0}
                >
                  {vacancy?.employer?.companyName}
                </div>
              </span>
            </div>
          )}
        </div>
        <div>
          <div className='details-item'>
            <strong>Date Received: </strong>
            <span>{createdAt}</span>
          </div>
          <div className='details-item status-tag'>
            <strong>Status: </strong>
            <span>{statusTag()}</span>
          </div>
          {isAdmin && (
            <div>
              <strong>Candidate CV: </strong>
              <span
                className='link'
                onClick={() => handleDownload(about?.cv)}
                onKeyDown={() => {}}
                role='button'
                tabIndex={0}
              >
                Download
              </span>
            </div>
          )}
        </div>
      </div>
      {status === 5 && (
        <div className='reason'>
          <p className='heading'>test</p>
          <p className='small'>Reason for rejecting</p>
        </div>
      )}
      {futureProspectsCv === null ? (
        <div className='futureProspects'>
          <h3>Missing Future Employment CV</h3>
          <p>
            Before you can approve this application you must create a Future
            Prospects version of the candidates CV.
          </p>
        </div>
      ) : (
        <>
          {approveReasons && (
            <div className='updates-reason'>
              <div className='approve-reasons'>{approveReasons}</div>
              {isAdmin ? (
                <div>
                  Recommendation:
                  {' '}
                  <ButtonWrapper
                    className='update-reason'
                    onClick={updateReason}
                  >
                    Update
                  </ButtonWrapper>
                </div>
              ) : (
                <div className='approve'>
                  {approvedBy}
                  {' '}
                  Future Employments
                </div>
              )}
            </div>
          )}
          <div className='hide-contact'>
            <CheckboxField
              title='Hide contact information in pdf'
              onChange={() => setHideContact(!hideContact)}
            />
          </div>
          <div className='applicant-details'>
            <h2>Curriculum Vitae</h2>
            <div className='updated'>
              <Link
                to={`/dashboard/applications/${id}/cv/${profile?.id}/${
                  hideContact ? 1 : 0
                }`}
              >
                <Button icon={<FileOutlined />}> Download PDF</Button>
              </Link>
              <div className='updated-date'>{updatedAt}</div>
            </div>

            <div className='contact-details'>
              <div className='contact'>
                <strong>{applicant}</strong>
                <p>{profile?.addressLine1}</p>
                <p>{profile?.addressLine2}</p>
                <p>{profile?.city}</p>
                <p>{profile?.county}</p>
                <p>{profile?.country}</p>
                <p>{profile?.postcode}</p>
              </div>
              {!hideContact && (
                <div className='contact'>
                  <p>
                    Phone:
                    {user?.phoneNumber}
                  </p>
                  <p>
                    Email:
                    {' '}
                    <span className='link'>{user?.email}</span>
                  </p>
                </div>
              )}
            </div>
            <hr />
            <div className='cv-content'>
              <MDEditor.Markdown source={futureProspectsCv} />
            </div>
          </div>
        </>
      )}
      <div className='actions application-act'>
        <div className='left-action'>
          {isAdmin && (
            <ButtonWrapper
              className='secondary-btn'
              onClick={() => navigate(`/dashboard/candidate/updatecv/${profile?.id}`)}
              icon={<EditOutlined />}
            >
              Update Candidate CV
            </ButtonWrapper>
          )}
        </div>
        <div className='right-action'>
          {getApplicationButton({
            status,
            userRole,
            futureProspectsCv,
            setIsModalOpen,
          })}
          {status < 4 && (
            <ButtonWrapper
              className='danger-btn'
              onClick={handleReject}
              icon={<CloseOutlined />}
            >
              Reject application
            </ButtonWrapper>
          )}
        </div>
      </div>

      <ModalWrapper
        title={modalTitle ?? ''}
        isOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => setIsModalOpen(false)}
        moduleClass='campaign-module recommendation-modal'
        footer={[
          <Button key='link' type='primary' onClick={handleOk}>
            Close
          </Button>,
          <Button
            icon={status === 2 ? <StarFilled /> : <CheckOutlined />}
            onClick={() => getApplicationAction({
              status,
              id,
              userRole,
              setIsModalOpen,
              approveReason,
              applicationAccept,
              applicationApprove,
              applicationShortlist,
            })}
            style={{ backgroundColor: '#6cb33f', color: '#fff' }}
          >
            {btnLabel}
          </Button>,
        ]}
      >
        <div>{content}</div>
      </ModalWrapper>
      <ModalWrapper
        title='Update Recommendation'
        isOpen={isRecommendationModalOpen}
        onCancel={() => setRecommendationModalOpen(false)}
        onOk={() => setRecommendationModalOpen(false)}
        moduleClass='campaign-module recommendation-modal'
        footer={[
          <Button
            key='link'
            type='primary'
            onClick={() => setRecommendationModalOpen(false)}
          >
            Close
          </Button>,
          <Button
            icon={<CheckOutlined />}
            key={id}
            onClick={() => {
              applicationApprove({
                variables: { applicationId: id, approveReason: recommendation },
                refetchQueries: [
                  {
                    query: GET_APPLICATIONS_DETAILS,
                    variables: { applicationId: id },
                  },
                ],
              })
                .then((res: any) => {
                  setRecommendationModalOpen(false);
                  getSuccessResponse(
                    'The application recommendation was updated successfully.',
                  );
                })
                .catch((error: any) => getErrorResponse(error.message));
            }}
            style={{ backgroundColor: '#6cb33f', color: '#fff' }}
          >
            Update Recommendation
          </Button>,
        ]}
      >
        <div>
          <div>Recommendation</div>
          <TextAreaField
            value={recommendation}
            onChange={(e: any) => setRecommendation(e.target.value)}
            rows={10}
          />
        </div>
      </ModalWrapper>
      <ModalWrapper
        title='Reject Application'
        isOpen={isRejectOpen}
        onCancel={() => setIsRejectOpen(false)}
        onOk={() => setIsRejectOpen(false)}
        moduleClass='campaign-module'
        // style={{ top: 10 }}
        footer={[
          <Button
            key='link'
            type='primary'
            onClick={handleOk}
            // style={{ backgroundColor: '#fff', color:'black'}}
          >
            Close
          </Button>,
          <Button
            icon={<CloseOutlined />}
            onClick={() => {
              handleReject();
              setIsRejectOpen(false);
            }}
            style={{ backgroundColor: '#d41e24', color: '#fff' }}
          >
            Reject Application
          </Button>,
        ]}
      >
        <div>
          <div style={{ margin: '-15px 0 15px 0', fontSize: '16px' }}>
            {' '}
            Reason for rejecting
          </div>
          <TextAreaField
            onChange={(e: any) => setRejectReason(e.target.value)}
          />
        </div>
      </ModalWrapper>
    </ApplicationDetailWrapper>
  );
};

export default ApplicationDetail;
