import { Button, Table } from 'antd';
import React, { useState } from 'react';
import {
  AimOutlined,
  CloseOutlined,
  FileOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Link, useNavigate, useParams } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
import ApplicationDetailWrapper from '../applicationDetails/ApplicationDetail.styles';
import { useRemoveCandidate } from '../../services/admin/adminService';
import { getErrorResponse, getFullName, getSuccessResponse } from '../../utils';
import appRoutes from '../../constants/appRoutes';
import CheckboxField from '../common/formElements/CheckboxField';

const DetailsTab: React.FC<any> = ({ data, aboutCandidate, jobPreference }) => {
  const { id } = useParams();
  const [hideContact, setHideContact] = useState(false);
  const navigate = useNavigate();
  const { removeCandidate } = useRemoveCandidate();
  const profileColumns: any = [
    {
      title: '',
      dataIndex: 'name',
      key: 'name',
      render: (text: any) => <p>{text}</p>,
    },
    {
      title: '',
      dataIndex: 'value',
      key: 'value',
    },
  ];

  const jobColumns: any = [
    {
      title: '',
      dataIndex: 'name',
      key: 'name',
      render: (text: any) => <p>{text}</p>,
    },
    {
      title: '',
      dataIndex: 'value',
      key: 'value',
    },
  ];

  const handleRemoveCandidate = () => {
    removeCandidate({ variables: { candidateId: Number(id) } })
      .then((res) => {
        getSuccessResponse(res?.data?.candidateRemove?.message);
        navigate(appRoutes.CANDIDATES);
      })
      .catch((error) => getErrorResponse(error));
  };

  return (
    <ApplicationDetailWrapper>
      <div>
        <h2 className='sub-heading'>Contact Details</h2>
        <strong>{getFullName(data?.firstName, data?.lastName)}</strong>
        <p>{data?.candidateProfile?.addressLine1}</p>
        <p>{data?.candidateProfile?.addressLine2}</p>
        <p>{data?.candidateProfile?.county}</p>
        <p>{data?.candidateProfile?.city}</p>
        <p>{data?.candidateProfile?.postcode}</p>
        <Link
          to={`http://maps.google.co.uk/?q=${data?.candidateProfile?.postcode}`}
          target='_blank'
          className='link map'
        >
          <p>
            View on Google Maps <AimOutlined />
          </p>
        </Link>
        <p style={{ marginTop: '10px' }}>
          Phone:
          {data?.phoneNumber} (Main)
        </p>
        <p>
          Email: <span className='link'>{data?.email}</span>
        </p>
      </div>
      <div className='table'>
        <h2 className='sub-heading'>Profile</h2>
        <Table
          columns={profileColumns}
          dataSource={jobPreference}
          pagination={false}
        />
      </div>
      <div className='table'>
        <h2 className='sub-heading'>Job Preferences</h2>
        <Table
          columns={jobColumns}
          dataSource={aboutCandidate}
          scroll={{ x: 500 }}
          pagination={false}
        />
      </div>
      {!data?.aboutCandidate?.futureProspectsCv ? (
        <div className='missing-cv'>
          <h2>Missing Future Employment CV</h2>
          <p>
            You&#39;ve not yet created a Future Employments CV for this
            candidate.
          </p>
        </div>
      ) : (
        <div>
          <div className='hide-contact'>
            <CheckboxField
              title='Hide contact information in pdf'
              onChange={() => setHideContact(!hideContact)}
            />
          </div>
          <div className='applicant-details'>
            <h2>Curriculum Vitae</h2>
            <div className='updated'>
              <Link to={`/dashboard/candidate/cv/${id}/${hideContact ? 1 : 0}`}>
                <Button icon={<FileOutlined />}>Download PDF</Button>
              </Link>
            </div>
            <div className='cv-content'>
              <MDEditor.Markdown
                source={data?.aboutCandidate?.futureProspectsCv}
                style={{ whiteSpace: 'pre-wrap' }}
              />
            </div>
          </div>
        </div>
      )}
      <hr />
      <div className='actions vacancy details-tab-btn'>
        <div className='succes-btn'>
          <Link to={`/dashboard/candidate/update/details/${id}`}>
            <Button icon={<UserOutlined />}>Update Tags</Button>
          </Link>
          <Link to={`/dashboard/candidate/updatecv/${id}`}>
            <Button icon={<UserOutlined />}>Update Candidate CV</Button>
          </Link>
          <Link to={`${appRoutes.CANDIDATES_EDIT}/${id}`}>
            <Button icon={<UserOutlined />}>Edit Candidate</Button>
          </Link>
        </div>
        <div className='danger-btn'>
          <Button icon={<CloseOutlined />} onClick={handleRemoveCandidate}>
            Remove Candidate
          </Button>
        </div>
      </div>
    </ApplicationDetailWrapper>
  );
};

export default DetailsTab;
