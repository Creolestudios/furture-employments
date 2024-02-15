import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CardWrapper from '../../../components/common/cardWrapper';
import { convertIntoCardData, getFullName } from '../../../utils';
import { USER_ROLE } from '../../../constants';
import AppLayout from '../../../components/layout';
import appRoutes from '../../../constants/appRoutes';
import { UpdateCvStyle } from '../../../styles/pages/applications.style';
import CandidateCvUpdateForm from '../../../components/CandidateCvUpdateForm';

import {
  useCandidateDetailForAdmin,
  useFutureProspectsCvDetail,
} from '../../../services/admin/adminService';
import PdfToText from '../../../components/candidateDetails/PdfToText';
import candidateService from '../../../services/candidate/candidateService';

const UpdateCv = () => {
  const { id } = useParams();
  const { candidateCv } = useCandidateDetailForAdmin(Number(id));
  const [cvContentUrlArgs, setCvContentUrlArgs] = useState<any>({
    fileName: '',
    fetchQuery: false,
  });
  const { about, profile, user } = useFutureProspectsCvDetail(Number(id));
  const { data: cvUrlData } = candidateService.useGetCvContentUrl(cvContentUrlArgs);
  const [textStrings, setTextStrings] = useState<string[]>([]);

  const handleTextStringsLoad = (loadedTextStrings: string[]) => {
    setTextStrings(loadedTextStrings);
  };

  useEffect(() => {
    setCvContentUrlArgs({
      fileName: candidateCv,
      fetchQuery: true,
    });
  }, [candidateCv]);

  return (
    <AppLayout>
      <UpdateCvStyle>
        <div className='candidate-cv-title'>
          <h3 className='sub-heading'>Update Candidate CV</h3>
          <Link to={`${appRoutes.CANDIDATES_DETAILS}/${profile?.id}`}>
            View candidate profile
          </Link>
        </div>

        {/* {cvUrlData && (
          <PdfToText
            onTextStringsLoad={handleTextStringsLoad}
            url={cvUrlData?.getCvContentUrl?.url}
          />
        )} */}
        <CardWrapper
          data={convertIntoCardData(
            {
              candidateName: getFullName(user?.firstName, user?.lastName),
              cvDownload: about?.cv,
            },
            USER_ROLE.ADMIN,
          )}
          cvUrlData={cvUrlData}
        />
        <CandidateCvUpdateForm
          fileName={candidateCv}
          cvText={textStrings}
          futureProspectsCv={about?.futureProspectsCv}
          aboutId={about?.id}
          applicationId={Number(id)}
        />
      </UpdateCvStyle>
    </AppLayout>
  );
};

export default UpdateCv;
