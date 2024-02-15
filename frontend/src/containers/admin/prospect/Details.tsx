import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Icon from '@ant-design/icons';
import { Button, Form } from 'antd';
import AppLayout from '../../../components/layout';
import FormPageWrapper from '../../../styles/formContainer';
import ProspectClientDetail from '../../../components/prospectClientDetail/ClientDetails';
import {
  useProspectClientDetails,
  useUpdateProspectClient,
} from '../../../services/admin/adminService';
import { ReactComponent as EditIcon } from '../../../assets/images/pencil-alt-solid.svg';
import InputWrapper from '../../../components/common/formElements/inputWrapper';
import {
  PROSPECT_CLIENT_DETAILS,
  PROSPECT_CLIENT_TIMELINE,
} from '../../../graphql/queries/admin';
import Notification from '../../../components/common/Notification';
import Loader from '../../../components/common/loader';
import TextAreaField from '../../../components/common/formElements/TextAreaField';
import { validateTextLength } from '../../../utils';

const UpdateButtons = ({
  setNameEditable,
  setWebsiteEditable,
  setDescEditable,
}: any) => (
  <Form.Item>
    <Button
      htmlType='submit'
      style={{ marginLeft: '10px' }}
      className='success-btn'
    >
      Update
    </Button>
    <Button
      style={{ marginLeft: '10px' }}
      className='success-btn cancel'
      onClick={() => {
        setNameEditable(false);
        setWebsiteEditable(false);
        setDescEditable(false);
      }}
    >
      Cancel
    </Button>
  </Form.Item>
);

const ProspectClientDetails: FC = () => {
  const { id } = useParams();
  const [overviewForm] = Form.useForm();
  const [nameEditable, setNameEditable] = useState<boolean>(false);
  const [websiteEditable, setWebsiteEditable] = useState<boolean>(false);
  const [descEditable, setDescEditable] = useState<boolean>(false);
  const { loading, client } = useProspectClientDetails(Number(id));
  const { updateProspectClient } = useUpdateProspectClient();

  const {
    website,
    reminderType,
    status,
    additionalEmails,
    reminderDate,
    companyName,
    description,
    reminderNote,
    address,
    notes,
    people,
    convertedEmail,
    user,
  } = client || {};
  useEffect(() => {
    if (!loading) {
      overviewForm.setFieldsValue({ companyName });
      overviewForm.setFieldsValue({ website });
      overviewForm.setFieldsValue({ description });
    }
  }, [client, overviewForm]);
  const payload = {
    companyName,
    website,
    description,
    notes,
    reminderNote,
    reminderType,
    additionalEmails,
    reminderDate,
    status,
  };
  const handleSubmit = async (values: any) => {
    await updateProspectClient({
      variables: {
        prospectClientId: Number(id),
        clientData: {
          ...payload,
          ...values,
        },
      },
      refetchQueries: [PROSPECT_CLIENT_DETAILS, PROSPECT_CLIENT_TIMELINE],
    })
      .then((res) => {
        Notification({
          type: 'success',
          message: res?.data?.updateProspectClient?.message,
        });
        setNameEditable(false);
        setWebsiteEditable(false);
        setDescEditable(false);
      })
      .catch((error) => {
        Notification({ type: 'error', message: error.message });
      });
  };

  return (
    <AppLayout>
      <FormPageWrapper>
        {!loading && client && (
          <Form
            form={overviewForm}
            onFinish={handleSubmit}
            className='prospect-details-form'
          >
            <div className='page-header'>
              <span className='input-wrapper'>
                {!nameEditable ? (
                  <h1 className='company-name'>{companyName}</h1>
                ) : (
                  <InputWrapper
                    name='companyName'
                    label=''
                    rules={[{ validator: validateTextLength }]}
                  />
                )}
                {/* eslint-disable-next-line */}
                {!nameEditable ? (
                  <Icon
                    component={EditIcon}
                    style={{
                      margin: '-10px 0 0 10px',
                      cursor: 'pointer',
                    }}
                    onClick={() => setNameEditable(!nameEditable)}
                  />
                ) : !nameEditable
                  || !websiteEditable
                  || (!nameEditable && descEditable) ? (
                    <UpdateButtons
                      setNameEditable={setNameEditable}
                      setWebsiteEditable={setWebsiteEditable}
                      setDescEditable={setDescEditable}
                    />
                  ) : null}
              </span>
              <span className='input-wrapper'>
                {!websiteEditable ? (
                  <h3 className='website'>{website}</h3>
                ) : (
                  <InputWrapper
                    name='website'
                    label=''
                    rules={[{ validator: validateTextLength }]}
                  />
                )}
                {/* eslint-disable-next-line */}
                {!websiteEditable ? (
                  <Icon
                    component={EditIcon}
                    style={{ margin: '0 0 0 10px' }}
                    onClick={() => setWebsiteEditable(!websiteEditable)}
                  />
                ) : !websiteEditable || !descEditable ? (
                  <UpdateButtons
                    setNameEditable={setNameEditable}
                    setWebsiteEditable={setWebsiteEditable}
                    setDescEditable={setDescEditable}
                  />
                ) : null}
              </span>
            </div>
            <div className='page-header'>
              <span style={{ display: 'flex' }}>
                <h3 className='desc'>Overview</h3>
                {!descEditable ? (
                  <Icon
                    component={EditIcon}
                    style={{ margin: '0 0 0 10px' }}
                    onClick={() => setDescEditable(!descEditable)}
                  />
                ) : (
                  <UpdateButtons
                    setNameEditable={setNameEditable}
                    setWebsiteEditable={setWebsiteEditable}
                    setDescEditable={setDescEditable}
                  />
                )}
              </span>
              {/* {!description || (!descEditable && <p>N/A</p>)} */}
              {!descEditable ? (
                <p
                  style={
                    description || description !== ''
                      ? {
                        backgroundColor: 'rgb(229, 229, 229,0.5)',
                        padding: '5px',
                      }
                      : {}
                  }
                >
                  {description || 'N/A'}
                </p>
              ) : (
                <TextAreaField name='description' label='' rows={7} />
              )}
            </div>
          </Form>
        )}
        {!loading && client && (
          <ProspectClientDetail
            id={id}
            description={description}
            status={status}
            companyName={companyName}
            people={people}
            notes={notes}
            address={address}
            reminderNote={reminderNote}
            additionalEmails={additionalEmails}
            reminderDate={reminderDate}
            reminderType={reminderType}
            website={website}
            convertedEmail={convertedEmail}
            user={user}
          />
        )}
        {loading && <Loader />}
      </FormPageWrapper>
    </AppLayout>
  );
};

export default ProspectClientDetails;
