import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AppLayout from '../../../components/layout';
import FormPageWrapper from '../../../styles/formContainer';
import { useEmployerDetailsById } from '../../../services/employer/employerService';
import Loader from '../../../components/common/loader';
import ProfileForm from '../../../components/profileForm';

const EditClient: FC = () => {
  const { id } = useParams();
  const { data, loading } = useEmployerDetailsById(Number(id));
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  if (loading) <Loader />;

  const clientData = data?.getEmployerDetailsById?.data;
  return (
    <AppLayout>
      <FormPageWrapper>
        <div>
          <h1>Edit Client</h1>
        </div>
        <ProfileForm clientData={clientData} />
      </FormPageWrapper>
    </AppLayout>
  );
};

export default EditClient;
