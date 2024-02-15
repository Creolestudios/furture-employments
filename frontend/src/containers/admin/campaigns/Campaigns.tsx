import React from 'react';
import { useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekYear from 'dayjs/plugin/weekYear';
import AppLayout from '../../../components/layout';
import FormPageWrapper from '../../../styles/formContainer';
import CampaignForm from '../../../components/campaignForm/CampaignForm';
import UpdateCampaignForm from '../../../components/campaignForm/UpdateCampaignForm';

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

const Campaigns = () => {
  const [params] = useSearchParams();

  return (
    <AppLayout>
      <FormPageWrapper>
        {params.get('vacancyId') ? <UpdateCampaignForm /> : <CampaignForm />}
      </FormPageWrapper>
    </AppLayout>
  );
};

export default Campaigns;
