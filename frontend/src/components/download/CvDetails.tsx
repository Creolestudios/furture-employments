import {
  Document,
  Image,
  PDFViewer,
  Page,
  Text,
  View,
} from '@react-pdf/renderer';
import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import MarkdownIt from 'markdown-it';
import LOGO from '../../assets/images/logo.svg';

import { useCandidateDetailForAdmin } from '../../services/admin/adminService';
import CustomPdf from './CustomPdf';
import { getFullName } from '../../utils';
import { styles } from './CvDetails.styles';

const CvDetails = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const { candidateId, id, hide } = useParams();
  const { data } = useCandidateDetailForAdmin(
    Number(candidateId),
    id ? Number(id) : undefined,
  );
  const markdownIt = new MarkdownIt({
    html: true,
  });

  const htmlContent = data?.aboutCandidate?.futureProspectsCv
    && markdownIt.render(data?.aboutCandidate?.futureProspectsCv);

  return (
    <PDFViewer style={styles.screen} showToolbar>
      <Document title={`cv - ${candidateId}`}>
        <Page size='A4' wrap style={styles.page}>
          <View
            style={{
              width: '100%',
              marginTop: 20,
            }}
          >
            <Image src={LOGO} style={styles.futureProspectsLogo} />
          </View>
          <View style={styles.basicProfileContainer}>
            <View style={[styles.profileTitle]}>
              <Text>Curriculum Vitae</Text>
            </View>
            <View style={[styles.profileItem, styles.name]}>
              <Text>{getFullName(data?.firstName, data?.lastName)}</Text>
            </View>

            <View style={[styles.profileItem]}>
              <Text>{data?.candidateProfile?.addressLine1}</Text>
            </View>
            <View style={[styles.profileItem]}>
              <Text>{data?.candidateProfile?.addressLine2}</Text>
            </View>
            <View style={[styles.profileItem]}>
              <Text>{data?.candidateProfile?.county}</Text>
            </View>
            <View style={[styles.profileItem]}>
              <Text>{data?.candidateProfile?.city}</Text>
            </View>
            {Number(hide) !== 1 && (
              <>
                <View style={[styles.profileItem]}>
                  <Text>
                    Phone:
                    {data?.phoneNumber}
                    {' '}
                    (Main)
                  </Text>
                </View>
                <View style={styles.emailContainer}>
                  <View>
                    <Text>Email: </Text>
                    {' '}
                  </View>
                  <View style={styles.email}>
                    <Text>{data?.email}</Text>
                  </View>
                </View>
              </>
            )}

            {candidateId && id && (
              <View>
                <Text style={styles.title}>
                  Future Employments Recommendation
                </Text>
                <Text>{data?.applications?.[0]?.approveReason || 'NA'}</Text>
              </View>
            )}
          </View>
          <Text />
          <View style={styles.contentContainer} break>
            <Image src={LOGO} style={styles.resumeLogo} fixed />
            <Text style={styles.underline} fixed />
            <CustomPdf htmlContent={htmlContent} />
          </View>

          <Text style={styles.bottomUnderline} fixed />

          <Text
            style={styles.footer}
            render={({ pageNumber }) => {
              setPageNumber(pageNumber);

              return 'Future Employments , Balderton Hall, Fernwood, Nottinghamshire, NG24 3JR';
            }}
            fixed
          />
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default CvDetails;
