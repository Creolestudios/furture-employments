import { useMutation } from '@apollo/client';
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { LINKEDIN_LOGIN } from '../../../graphql/mutations/auth';
import { API_TOKEN, USER_ROLE_KEY } from '../../../constants';
import appRoutes from '../../../constants/appRoutes';
import Notification from '../../../components/common/Notification';
import Loader from '../../../components/common/loader';

const LinkedinLogin = () => {
  const navigate = useNavigate();
  const [linkedinLogin] = useMutation(LINKEDIN_LOGIN);
  const [params] = useSearchParams();

  useEffect(() => {
    const code = params.get('code');
    const state: any = params.get('state');
    const jsState = JSON.parse(state);
    if (code) {
      linkedinLogin({
        variables: { code, role: jsState.role },
      })
        .then((res) => {
          sessionStorage.setItem(API_TOKEN, res?.data?.logInLinkedIn?.token);
          sessionStorage.setItem(
            USER_ROLE_KEY,
            JSON.stringify(res?.data?.logInLinkedIn?.role),
          );
          navigate(appRoutes.DASHBOARD);
        })
        .catch((error) => {
          Notification({ type: 'error', message: error.message });
          navigate(appRoutes.HOME);
        });
    } else {
      Notification({ type: 'info', message: 'Please try again to login' });
      navigate(appRoutes.HOME);
    }
  }, []);
  return <Loader />;
};

export default LinkedinLogin;
