import React, { useEffect, useState } from 'react';
import { Button, Form } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
  useRunCampaign,
  useVacancyDetailsForCampaign,
} from '../../services/vacancies/vacancyService';
import { DATE_FORMAT } from '../../constants';
import Notification from '../common/Notification';
import { CAMPAIGN_LIST } from '../../graphql/queries/vacancies';
import ModalWrapper from '../common/modalWrapper';
import CommonEditorField from '../common/formElements/CommonEditorField';

const CampaignForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  // fetch vacancy details
  const { data: vacancy } = useVacancyDetailsForCampaign(Number(id));

  // run campaign
  const { runCampaign } = useRunCampaign();
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleFinish = async (values: any) => {
    await runCampaign({
      variables: {
        vacancyId: Number(id),
        campaignsDto: {
          ...values,
          keyword: values?.keyword?.split(','),
        },
      },
      refetchQueries: [{ query: CAMPAIGN_LIST, variables: { vacancyId: id } }],
    })
      .then((res) => {
        Notification({
          type: 'success',
          message: res?.data?.startCampaign?.message,
        });
        navigate(`${appRoutes.VACANCY_DETAILS}/${id}`);
      })
      .catch((error) => Notification({ type: 'error', message: error?.message }));
  };

  useEffect(() => {
    if (vacancy) {
      const { position, description } = vacancy?.vacancyDetails || {};
      form.setFieldsValue({
        title: position,
        description,
        startDate: dayjs(moment().format('DD/MM/YYYY'), DATE_FORMAT),
        endDate: dayjs(
          moment().add(28, 'days').format('DD/MM/YYYY'),
          DATE_FORMAT,
        ),
      });
    }
  }, [vacancy]);

  const disabledDate = (current: any) => current && current < dayjs().endOf('day');

  return (
    <>
      <StyledForm
        validateMessages={validateMessage()}
        onFinish={handleFinish}
        form={form}
      >
        <div className='page-top'>
          <h1 className='sub-heading margin0'>Run new website campaign</h1>
          <Link to={`${appRoutes.VACANCY_DETAILS}/${id}`}>
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
            Run Campaign
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
        {vacancy?.vacancyDetails?.description}
      </ModalWrapper>
    </>
  );
};

export default CampaignForm;
