import React, { useEffect, useState } from 'react';
import { Button, Form } from 'antd';
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { CheckOutlined, EyeFilled } from '@ant-design/icons';
import dayjs from 'dayjs';
import moment from 'moment';
import InputWrapper from '../common/formElements/inputWrapper';
import TextAreaField from '../common/formElements/TextAreaField';
import CheckboxField from '../common/formElements/CheckboxField';
import CAMPAIGN_FORM from '../../constants/components/campaignForm';
import DatePickerWrapper from '../common/formElements/datePickerWrapper';
import { validateMessage } from '../../utils';
import StyledForm from './index.styles';
import appRoutes from '../../constants/appRoutes';
import {
  useCampaignDetails,
  useUpdateCampaign,
} from '../../services/vacancies/vacancyService';
import { DATE_FORMAT, DATE_MONTH_FORMAT } from '../../constants';
import Notification from '../common/Notification';
import { CAMPAIGN_DETAILS } from '../../graphql/queries/vacancies';
import ModalWrapper from '../common/modalWrapper';
import CommonEditorField from '../common/formElements/CommonEditorField';

const UpdateCampaignForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const vacancyId = params.get('vacancyId');

  // fetch campaign details
  const { data: campaign } = useCampaignDetails(Number(id));

  // update campign

  const { updateCampaign } = useUpdateCampaign();

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleFinish = async (values: any) => {
    await updateCampaign({
      variables: {
        updateCampaignDto: {
          ...values,
          id: Number(id),
          keyword: values?.keyword?.split(','),
        },
      },
      refetchQueries: [
        { query: CAMPAIGN_DETAILS, variables: { campaignId: Number(id) } },
      ],
    })
      .then((res) => {
        Notification({
          type: 'success',
          message: res?.data?.updateCampaign?.message,
        });
        navigate(`${appRoutes.VACANCY_DETAILS}/${vacancyId}`);
      })
      .catch((error) => Notification({ type: 'error', message: error?.message }));
  };

  const disabledDate = (current: any) => current && current < dayjs().endOf('day');

  useEffect(() => {
    if (campaign) {
      form.setFieldsValue({
        ...campaign.campaignDetails,
        startDate: dayjs(
          moment(campaign?.campaignDetails?.startDate).format(
            DATE_MONTH_FORMAT,
          ),
          DATE_FORMAT,
        ),
        endDate: dayjs(
          moment(campaign?.campaignDetails?.endDate).format(DATE_MONTH_FORMAT),
          DATE_FORMAT,
        ),
        keyword: campaign?.campaignDetails?.keyword?.join(','),
      });
    }
  }, [campaign]);

  return (
    <>
      <StyledForm
        validateMessages={validateMessage()}
        onFinish={handleFinish}
        form={form}
      >
        <div className='page-top'>
          <h2 className='sub-heading margin0'>Run new website campaign</h2>
          <Link to={`${appRoutes.VACANCY_DETAILS}/${vacancyId}`}>
            Back to vacancy details
          </Link>
        </div>
        <InputWrapper
          name={CAMPAIGN_FORM.TITLE.NAME}
          label={CAMPAIGN_FORM.TITLE.LABEL}
          rules={CAMPAIGN_FORM.TITLE.VALIDATION_RULE}
        />
        <div>
          <InputWrapper
            name={CAMPAIGN_FORM.SLUG.NAME}
            label={CAMPAIGN_FORM.SLUG.LABEL}
          />
          <p className='field-sub'>
            This will form the URL to your campaign. Leave blank for the system
            to auto-generate.
          </p>
        </div>
        <div>
          <TextAreaField
            name={CAMPAIGN_FORM.JOB_SUMMARY.NAME}
            label={CAMPAIGN_FORM.JOB_SUMMARY.LABEL}
            rules={CAMPAIGN_FORM.JOB_SUMMARY.VALIDATION_RULE}
          />
          <p className='field-sub'>
            This will form the URL to your campaign. Leave blank for the system
            to auto-generate.
          </p>
        </div>
        <CommonEditorField
          name={CAMPAIGN_FORM.JOB_DESCRIPTION.NAME}
          label={CAMPAIGN_FORM.JOB_DESCRIPTION.LABEL}
          rules={CAMPAIGN_FORM.JOB_DESCRIPTION.VALIDATION_RULE}
          className={CAMPAIGN_FORM.JOB_DESCRIPTION.CLASSNAME}
          height={300}
        />

        <Form.Item wrapperCol={{ offset: 3 }} className='action-campaign'>
          <Button
            type='primary'
            icon={<EyeFilled />}
            style={{ backgroundColor: '#ba4160' }}
            onClick={handleModalOpen}
          >
            Preview
          </Button>
        </Form.Item>
        <DatePickerWrapper
          name={CAMPAIGN_FORM.START_DATE.NAME}
          label={CAMPAIGN_FORM.START_DATE.LABEL}
          dateFormat='DD/MM/YYYY'
          rules={CAMPAIGN_FORM.START_DATE.VALIDATION_RULE}
          disabledDate={disabledDate}
        />
        <DatePickerWrapper
          name={CAMPAIGN_FORM.END_DATE.NAME}
          label={CAMPAIGN_FORM.END_DATE.LABEL}
          dateFormat='DD/MM/YYYY'
          rules={CAMPAIGN_FORM.END_DATE.VALIDATION_RULE}
          disabledDate={disabledDate}
        />
        <div>
          <InputWrapper
            name={CAMPAIGN_FORM.KEYWORDS.NAME}
            label={CAMPAIGN_FORM.KEYWORDS.LABEL}
          />
          <p className='field-sub'>
            A comma-separated list of tags that help describe your content.
          </p>
        </div>
        <CheckboxField
          name={CAMPAIGN_FORM.FEATURED.NAME}
          label={CAMPAIGN_FORM.FEATURED.LABEL}
        />
        <Form.Item
          wrapperCol={{ offset: 3, span: 10 }}
          className='action-campaign'
        >
          <Button
            type='primary'
            htmlType='submit'
            icon={<CheckOutlined />}
            style={{ backgroundColor: '#6cb33f' }}
          >
            Update Campaign Details
          </Button>
        </Form.Item>
      </StyledForm>
      <ModalWrapper
        title='Preview'
        isOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => setIsModalOpen(false)}
        moduleClass='campaign-module'
        footer={[
          <Button
            key='link'
            type='primary'
            onClick={() => setIsModalOpen(false)}
            style={{ backgroundColor: '#6cb33f' }}
            className='footer-action'
          >
            Close
          </Button>,
        ]}
      >
        <div
          dangerouslySetInnerHTML={{
            __html: campaign?.campaignDetails?.description,
          }}
        />
      </ModalWrapper>
    </>
  );
};

export default UpdateCampaignForm;
