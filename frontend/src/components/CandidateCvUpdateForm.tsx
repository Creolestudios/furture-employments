import { Button, Form } from 'antd';
import React, { useEffect, useState } from 'react';
import { CheckOutlined, EyeFilled } from '@ant-design/icons';
import MDEditor from '@uiw/react-md-editor';
import UPDATE_CV_FORM from '../constants/components/updateCv';
import ModalWrapper from './common/modalWrapper';
import CommonEditorField from './common/formElements/CommonEditorField';
import {
  useGetPdfToMarkdownText,
  useUpdateCandidateFutureProspectsCv,
} from '../services/admin/adminService';
import { getErrorResponse, getSuccessResponse } from '../utils';
import { GET_APPLICATIONS_DETAILS } from '../graphql/queries/applicationQueries';
import CheckboxField from './common/formElements/CheckboxField';
import { Colors } from '../styles/variable';

const CandidateCvUpdateForm = ({
  fileName,
  cvText,
  futureProspectsCv,
  aboutId,
  applicationId,
}: {
  fileName: string;
  cvText: string[];
  futureProspectsCv: string | null;
  aboutId: number;
  applicationId: number;
}) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleResetModalOpen = () => {
    setIsResetModalOpen(true);
  };
  const { updateFutureProspectsCv } = useUpdateCandidateFutureProspectsCv();

  const { pdfText } = useGetPdfToMarkdownText(fileName);

  useEffect(() => {
    if (futureProspectsCv) {
      form.setFieldsValue({
        cvContent: futureProspectsCv,
      });
    } else {
      form.setFieldsValue({
        cvContent: pdfText,
      });
    }
  }, [futureProspectsCv, form, cvText, pdfText]);

  const handleUpdate = (values: any) => {
    updateFutureProspectsCv({
      variables: {
        futureProspectsCv: values?.cvContent,
        aboutId,
      },
      refetchQueries: [
        {
          query: GET_APPLICATIONS_DETAILS,
          variables: { applicationId },
        },
      ],
    })
      .then((res: any) => {
        getSuccessResponse(
          res?.data?.updateCandidateFutureProspectsCv?.message,
        );
      })
      .catch((error: any) => getErrorResponse(error.message));
  };

  return (
    <>
      {/* <CheckboxField
        title='Select Content From Candidate CV'
        className='select-cvContent'
        onChange={() => {
          setShowContent(!showContent);
        }}
      /> */}
      <Form form={form} onFinish={handleUpdate} className='candidatecvform'>
        {/* <div className='select-from-cv'> */}
        {/* {showContent && (
            <div className='cv-box'>
              <h3> Candidate Cv</h3>
              <CommonEditorField name='cvText' height={370} />
            </div>
          )} */}
        <div className='cv-box'>
          <CommonEditorField
            name={UPDATE_CV_FORM.NAME}
            label={UPDATE_CV_FORM.LABEL}
            rules={UPDATE_CV_FORM.VALIDATION_RULE}
            height={370}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Form.Item wrapperCol={{ offset: 3 }} className='action-cv'>
              <Button
                type='primary'
                icon={<EyeFilled />}
                style={{ backgroundColor: '#ba4160' }}
                onClick={handleModalOpen}
              >
                Preview
              </Button>
            </Form.Item>
            {pdfText && (
              <Button
                type='primary'
                style={{ backgroundColor: Colors.PANTONE_BLUE_STRONG }}
                onClick={handleResetModalOpen}
              >
                Reset to Candidate CV
              </Button>
            )}
          </div>
        </div>
        {/* </div> */}

        <hr />
        <Form.Item
          wrapperCol={{ offset: 3, span: 10 }}
          className='action-cv candidate'
        >
          <Button
            type='primary'
            htmlType='submit'
            icon={<CheckOutlined />}
            style={{ backgroundColor: '#6cb33f' }}
          >
            Update cv contents
          </Button>
        </Form.Item>
      </Form>
      <ModalWrapper
        title='Preview'
        isOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => setIsModalOpen(false)}
        moduleClass='campaign-module preview-modal'
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
        <div className='cv-content'>
          <MDEditor.Markdown
            source={form.getFieldValue(UPDATE_CV_FORM.NAME)}
            style={{ whiteSpace: 'pre-wrap' }}
          />
        </div>
      </ModalWrapper>
      <ModalWrapper
        title='Reset to Candidate CV'
        isOpen={isResetModalOpen}
        onCancel={() => setIsResetModalOpen(false)}
        onOk={() => setIsResetModalOpen(false)}
        moduleClass='campaign-module'
        footer={[
          <Button
            key='link'
            type='primary'
            onClick={() => {
              form.setFieldsValue({
                cvContent: pdfText,
              });
              setIsResetModalOpen(false);
            }}
            style={{ backgroundColor: Colors.PANTONE_BLUE_STRONG }}
            className='footer-action'
          >
            Reset
          </Button>,
          <Button
            key='link'
            type='primary'
            onClick={() => setIsResetModalOpen(false)}
            style={{ backgroundColor: '#6cb33f' }}
            className='footer-action'
          >
            Cancel
          </Button>,
        ]}
      >
        <div>Are you sure to reset the content with candidate CV ?</div>
      </ModalWrapper>
    </>
  );
};

export default CandidateCvUpdateForm;
