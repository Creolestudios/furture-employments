import React, { FC, useEffect, useState } from 'react';
import { Form, Button } from 'antd';
import { FileFilled } from '@ant-design/icons';
import { UploadChangeParam } from 'antd/es/upload';
import AppLayout from '../../../components/layout';
import UploadFileWrapper from '../../../components/common/formElements/upload';
import ButtonWrapper from '../../../components/common/formElements/buttonWrapper';
import candidateService from '../../../services/candidate/candidateService';
import Notification from '../../../components/common/Notification';
import Loader from '../../../components/common/loader';
import CANDIDATE_PROFILE_FORM from '../../../constants/components/candidateProfileForm';
import { ICVArgs, ICvContentArgs } from '../../../interfaces';
import { downloadFile, isValidFile } from '../../../utils';
import { GET_CV_DETAIL } from '../../../graphql/queries/candidateQueries';

import StyledCvScreen from './cv.styles';

const Cv: FC = () => {
  const { data, loading, error } = candidateService.useGetCvDetail();
  const { update } = candidateService.useUpdateCV();
  const [cvContentUrlArgs, setCvContentUrlArgs] = useState<ICvContentArgs>({
    fileName: '',
    fetchQuery: false,
  });
  const {
    data: cvUrlData,
    loading: cvLoading,
    error: cvError,
  } = candidateService.useGetCvContentUrl(cvContentUrlArgs);

  useEffect(() => {
    if (error) {
      Notification({ type: 'error', message: error.message });
    }
  }, [error, cvError]);

  const fileValidator = () => ({
    validator(_: any, value: UploadChangeParam | undefined) {
      if (
        value
        && isValidFile(value.fileList)
        && value.fileList[0].name !== data.getCVDetails.fileName
      ) {
        return Promise.resolve();
      }
      return Promise.reject(
        new Error(CANDIDATE_PROFILE_FORM.CV_FILE.UPDATE.ERROR_MESSAGE),
      );
    },
  });

  const handleUpload = async (value: any) => {
    const cvArgs: ICVArgs = {
      userId: data.getCVDetails.id,
      cv: value.cv.fileList[0]?.originFileObj,
    };
    const { data: responseData } = await update({
      variables: cvArgs,
      refetchQueries: [GET_CV_DETAIL],
    });

    if (responseData) {
      Notification({
        type: 'success',
        message: responseData?.updateCV?.message,
      });
    }
  };

  const handleDownload = (value: string) => {
    setCvContentUrlArgs({
      fileName: value,
      fetchQuery: true,
    });
  };

  if (cvUrlData) {
    downloadFile(
      cvUrlData?.getCvContentUrl?.url,
      cvUrlData?.getCvContentUrl?.fileName,
    );
  }

  return (
    <AppLayout>
      <StyledCvScreen>
        <h1>Update CV</h1>
        <div className='cv-content'>
          <span>Current Version:</span>
          {data && (!loading || !cvLoading) && (
            <>
              {data?.getCVDetails?.fileName ? (
                <Button
                  className='app-btn download-btn'
                  onClick={() => handleDownload(data?.getCVDetails?.fileName)}
                >
                  Download
                </Button>
              ) : (
                <span className='file-not-exist'>File Not Available</span>
              )}
              <span className='update'>
                (Updated
                {' '}
                {data?.getCVDetails?.updatedAt}
                )
              </span>
            </>
          )}
          {(loading || cvLoading) && <Loader />}
        </div>
        <Form
          className='upload-form'
          initialValues={CANDIDATE_PROFILE_FORM.CV_INITIAL_VALUE}
          onFinish={handleUpload}
        >
          <h4>Upload new CV</h4>
          <UploadFileWrapper
            name={CANDIDATE_PROFILE_FORM.CV_FILE.NAME}
            label={CANDIDATE_PROFILE_FORM.CV_FILE.LABEL}
            helpMessage={CANDIDATE_PROFILE_FORM.CV_FILE.HELP_MESSAGE}
            maxCount={CANDIDATE_PROFILE_FORM.CV_FILE.MAX_COUNT}
            rules={[fileValidator]}
            className='file-upload'
          />
          <ButtonWrapper
            htmlType='submit'
            className='success-btn'
            icon={<FileFilled />}
          >
            Upload
          </ButtonWrapper>
        </Form>
      </StyledCvScreen>
    </AppLayout>
  );
};

export default Cv;
