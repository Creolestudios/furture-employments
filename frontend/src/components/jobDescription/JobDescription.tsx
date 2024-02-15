import { Button, Form } from 'antd';
import React, { useState } from 'react';
import { FileOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { UploadChangeParam } from 'antd/es/upload';
import UpdateCVWrapper from '../updateCV/index.styles';
import UploadFileWrapper from '../common/formElements/upload';
import {
  GET_VACANCY_FILE,
  updateVacancyFileMutation,
} from '../../graphql/mutations/vacancies';
import Notification from '../common/Notification';
import { USER_ROLE, USER_ROLE_KEY } from '../../constants';
import { downloadFile, isValidFile } from '../../utils';
import candidateService from '../../services/candidate/candidateService';
import { VACANCIES_DETAILS } from '../../graphql/queries/vacancies';

const JobDescription = ({ description, additionalFileName }: any) => {
  const { id } = useParams();
  const [forms] = Form.useForm();
  const userRole = sessionStorage.getItem(USER_ROLE_KEY);
  const [submitForm] = useMutation(updateVacancyFileMutation);
  const { data } = useQuery(GET_VACANCY_FILE, {
    variables: { vacancyId: Number(id) },
  });
  const [fileUrlArgs, setFileUrlArgs] = useState<any>({
    fileName: '',
    fetchQuery: false,
  });
  const [additionalFileUrlArgs, setAdditionalFileUrlArgs] = useState<any>({
    fileName: '',
    fetchQuery: false,
  });
  const { data: cvUrlData } = candidateService.useGetCvContentUrl(fileUrlArgs);
  const { data: additionalFileData } = candidateService.useGetCvContentUrl(
    additionalFileUrlArgs
  );
  const handleDownload = () => {
    setFileUrlArgs({
      fileName: data?.downloadVacancyFile?.filename,
      fetchQuery: true,
    });
  };

  const handleAdditionalFileDownload = () => {
    setAdditionalFileUrlArgs({
      fileName: additionalFileName,
      fetchQuery: true,
    });
  };

  const onSubmit = (values: any) => {
    const descFile =
      values.desc_file && values.desc_file?.fileList[0].originFileObj;
    const addFile =
      values.additional_file &&
      values.additional_file?.fileList[0].originFileObj;
    submitForm({
      variables: {
        vacancyId: Number(id),
        uploadFile: descFile ?? null,
        additionalFile: addFile ?? null,
      },
      refetchQueries: [
        { query: GET_VACANCY_FILE, variables: { vacancyId: Number(id) } },
        VACANCIES_DETAILS
      ],
    })
      .then((res) => {
        Notification({
          type: 'success',
          message: res.data.updateJobDescriptionFile.message,
        });
        forms.setFieldsValue({
          desc_file: null,
          additional_file: null,
        });
      })
      .catch((error) => {
        Notification({ type: 'error', message: error.message });
      });
  };
  if (cvUrlData) {
    downloadFile(
      cvUrlData?.getCvContentUrl?.url,
      cvUrlData?.getCvContentUrl?.fileName
    );
  }
  if (additionalFileData) {
    downloadFile(
      additionalFileData?.getCvContentUrl?.url,
      additionalFileData?.getCvContentUrl?.fileName
    );
  }
  const cvFileValidator = () => ({
    validator(_: any, value: UploadChangeParam | undefined) {
      const descFile = forms.getFieldValue('desc_file');
      const additionalFile = forms.getFieldValue('additional_file');
      if (
        (descFile && isValidFile(descFile.fileList)) ||
        (additionalFile && isValidFile(additionalFile.fileList))
      ) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('Upload pdf or document file.'));
    },
  });
  return (
    <UpdateCVWrapper>
      <div>
        <h2 className='sub-heading'>Job Description</h2>
        {data?.downloadVacancyFile?.filename !== '' && (
          <div>
            <Button
              style={{
                backgroundColor: '#0094CA',
                color: '#fff',
                margin: '5px 0 8px 0',
              }}
              onClick={handleDownload}
            >
              Download Current File
            </Button>
            {additionalFileName && (
              <Button
                style={{
                  backgroundColor: '#0094CA',
                  color: '#fff',
                  margin: '5px 0 8px 5px',
                }}
                onClick={handleAdditionalFileDownload}
              >
                Download Additional File
              </Button>
            )}
          </div>
        )}
        {Number(userRole) === USER_ROLE.EMPLOYER && (
          <div className='form'>
            <h4>Upload new job description</h4>
            <Form name='upload_cv' onFinish={onSubmit} form={forms}>
              <UploadFileWrapper
                name='desc_file'
                label=''
                accept='.pdf,.docx'
                maxCount={1}
                rules={[cvFileValidator]}
                className='file-upload'
              />
              <span>
                Please upload your CV in either Word, Open Document or PDF
                format.
              </span>
              <Form.Item>
                <Button
                  type='primary'
                  htmlType='submit'
                  icon={<FileOutlined />}
                  style={{ backgroundColor: '#6cb33f', marginTop: '20px' }}
                >
                  Upload
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}
        <div className='form'>
          <h4>Upload new additional document</h4>
          <Form name='upload_cv' onFinish={onSubmit} form={forms}>
            <UploadFileWrapper
              name='additional_file'
              label=''
              accept='.pdf,.docx'
              maxCount={1}
              rules={[cvFileValidator]}
              className='file-upload'
            />
            <span>
              Please add any further documents that may add value, for example
              Benefits Packages or Company Values
            </span>
            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                icon={<FileOutlined />}
                style={{ backgroundColor: '#6cb33f', marginTop: '20px' }}
              >
                Upload
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div>
          <strong>Job Description Text</strong>
          <p>{description || 'N/A'}</p>
        </div>
      </div>
    </UpdateCVWrapper>
  );
};

export default JobDescription;
