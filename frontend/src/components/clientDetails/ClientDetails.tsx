import React from 'react';
import { useParams } from 'react-router-dom';
import ApplicationDetailWrapper from '../applicationDetails/ApplicationDetail.styles';
import DetailsTab from './DetailsTab';
import NotesTab from '../candidateDetails/NotesTab';
import { useAdminNotesForEmployer } from '../../services/admin/adminService';
import appRoutes from '../../constants/appRoutes';
import TabsWrapper from '../common/tabsWrapper/TabsWrapper';
import usePagination from '../../hooks/usePagination';
import CommonVacancyTable from '../commonVacancyTable/CommonVacancyTable';
import { PAGINATION, USER_ROLE } from '../../constants';
import {
  useEmployerDetailsById,
  useEmployerVacanciesList,
} from '../../services/employer/employerService';

const ClientsDetails: React.FC<any> = ({
  companyName,
  addressLine1,
  addressLine2,
  city,
  county,
  postcode,
  description,
  country,
  registrationNo,
  vatNo,
  email,
  phoneNumber,
  createdAt,
}) => {
  const { id } = useParams();

  const { adminNotes, loading } = useAdminNotesForEmployer(Number(id));

  const { data } = useEmployerDetailsById(Number(id));
  const userId = data?.getEmployerDetailsById?.data?.user?.id;
  const { vacancies } = useEmployerVacanciesList({
    searchParams: {
      query: '',
      current: 0,
      pageSize: 0,
    },
    employerId: Number(id),
    userId,
  });

  const items: any = [
    {
      label: 'Details',
      key: '#details',
      children: (
        <DetailsTab
          companyName={companyName}
          addressLine1={addressLine1}
          addressLine2={addressLine2}
          city={city}
          county={county}
          postcode={postcode}
          description={description}
          country={country}
          registrationNo={registrationNo}
          vatNo={vatNo}
          email={email}
          phoneNumber={phoneNumber}
          id={id}
        />
      ),
    },
    {
      label: 'Notes',
      key: '#notes',
      children: (
        <NotesTab
          redirectAddNote={`${appRoutes.DASHBOARD}/${appRoutes.CLIENT_DETAIL_ROUTE}/${id}/${appRoutes.ADD_NOTE}`}
          redirectEditNote={`${appRoutes.DASHBOARD}/${appRoutes.CLIENT_DETAIL_ROUTE}/${id}/${appRoutes.UPDATE_NOTE}`}
          adminNotes={adminNotes}
          loading={loading}
        />
      ),
    },
    vacancies?.length > 0 && {
      label: 'Vacancies',
      key: '#vacancies',
      children: <CommonVacancyTable role={USER_ROLE.ADMIN} data={vacancies} />,
    },
  ];

  return (
    <ApplicationDetailWrapper>
      <div className='details'>
        <div>
          <div className='details-item'>
            <strong>Company Name:</strong>
            <span>{companyName}</span>
          </div>
          <div className='details-item'>
            <strong>Date Registered: </strong>
            <span>{createdAt}</span>
          </div>
        </div>
        <div>
          <div className='details-item'>
            <strong>Company Reg. No.:</strong>
            <span>{registrationNo}</span>
          </div>
          <div className='details-item'>
            <strong>VAT No.: </strong>
            <span>{vatNo}</span>
          </div>
        </div>
      </div>
      <TabsWrapper items={items} />
    </ApplicationDetailWrapper>
  );
};

export default ClientsDetails;
