import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';
import AppLayout from '../../../components/layout';
import ProfileForm from '../../../components/profileForm';
import appRoutes from '../../../constants/appRoutes';

const NewVacancy: FC = () => {
  const path = useLocation();
  return (
    <AppLayout>
      {path.pathname !== appRoutes.EMPLOYER_SIGNUP && (
        <h1>Update Profile</h1>
      )}
      <ProfileForm />
    </AppLayout>
  );
};

export default NewVacancy;
