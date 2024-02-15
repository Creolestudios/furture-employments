import React, { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import AppLayout from '../../../components/layout';
import FormPageWrapper from '../../../styles/formContainer';
import appRoutes from '../../../constants/appRoutes';
import ClientsDetails from '../../../components/clientDetails/ClientDetails';
import { useEmployerDetailsById } from '../../../services/employer/employerService';
import Loader from '../../../components/common/loader';

const ClientDetail: FC = () => {
  const { id } = useParams();

  const { data, loading } = useEmployerDetailsById(Number(id));
  const navigate = useNavigate();
  if (loading) {
    <Loader />;
  }
  const employerData = data?.getEmployerDetailsById?.data || {};
  const user = employerData.user || {};

  const {
    companyName,
    addressLine1,
    addressLine2,
    city,
    county,
    postcode,
    description,
    country,
    registrationNo,
    vatNo,
    createdAt,
  } = employerData;

  const {
    firstName, lastName, email, phoneNumber,
  } = user;
  return (
    <AppLayout>
      <FormPageWrapper>
        <div className='page-header'>
          <h1>{companyName}</h1>
          <div
            className='vacancy-link'
            onClick={() => navigate(appRoutes.CLIENT_LIST)}
            onKeyDown={() => navigate(appRoutes.CLIENT_LIST)}
            role='button'
            tabIndex={0}
          >
            Back to all clients
          </div>
        </div>
        <ClientsDetails
          companyName={companyName}
          addressLine1={addressLine1}
          addressLine2={addressLine2}
          city={city}
          county={county}
          postcode={postcode}
          description={description}
          country={country}
          registrationNo={registrationNo}
          vatNo={vatNo}
          firstName={firstName}
          lastName={lastName}
          email={email}
          phoneNumber={phoneNumber}
          createdAt={moment(createdAt).format('DD/MM/YYYY')}
        />
      </FormPageWrapper>
    </AppLayout>
  );
};

export default ClientDetail;
