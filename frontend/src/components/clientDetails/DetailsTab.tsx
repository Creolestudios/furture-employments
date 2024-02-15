import { CloseOutlined, UserOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getErrorResponse, getSuccessResponse } from '../../utils';
import { useRemoveCandidate, useRemoveClient } from '../../services/admin/adminService';
import appRoutes from '../../constants/appRoutes';

const DetailsTab: React.FC<any> = ({
  companyName,
  addressLine1,
  addressLine2,
  city,
  county,
  postcode,
  description,
  country,
  email,
  id,
  phoneNumber,
}) => {
  const navigate = useNavigate();
  const { removeClient } = useRemoveClient();
  const handleRemoveCandidate = () => {
    removeClient({ variables: { clientId: Number(id) } })
      .then((res) => {
        getSuccessResponse(res?.data?.clientRemove?.message);
        navigate(appRoutes.CLIENT_LIST);
      })
      .catch((error) => getErrorResponse(error));
  };
  return (
    <>
      <div className='content-details'>
        <h2 className='sub-heading'>Description</h2>
        <p>{description}</p>
      </div>
      <div className='content-details'>
        <h2 className='sub-heading'>Head Office</h2>
        <p>{addressLine1}</p>
        <p>{addressLine2}</p>
        <p>{city}</p>
        <p>{county}</p>
        <p>{country}</p>
        <p>{postcode}</p>
      </div>
      <div className='content-details'>
        <h2 className='sub-heading'>Contacts</h2>
        <p>
          <strong style={{ paddingTop: '10px' }}>{companyName}</strong>
        </p>
        <p>{city}</p>
        <p className='link'>{email}</p>
        <p style={{ marginTop: '5px' }}>
          {phoneNumber}
          {' '}
          (Main)
        </p>
      </div>
      <div className='actions vacancy details-tab-btn'>
        <div className='succes-btn'>
          <Link to={`${appRoutes.CLIENT_EDIT}/${id}`}>
            <Button icon={<UserOutlined />}>Edit Client</Button>
          </Link>
        </div>
        <div className='danger-btn'>
          <Button icon={<CloseOutlined />} onClick={handleRemoveCandidate}>
            Remove Client
          </Button>
        </div>
      </div>
    </>
  );
};

export default DetailsTab;
