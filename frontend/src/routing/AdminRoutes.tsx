import React, { FC, Suspense } from 'react';
import {
  Routes, Route, Outlet, Navigate,
} from 'react-router-dom';
import Loader from '../components/common/loader';
import APP_ROUTES from '../constants/appRoutes';

// All the admin routes imported here which can only accessible when admin logged in

const AdminDashboard = React.lazy(
  () => import('../containers/admin/dashboard/Dashboard'),
);
const SearchClients = React.lazy(
  () => import('../containers/admin/clients/SearchClients'),
);
const Vacancies = React.lazy(
  () => import('../containers/admin/vacancies/Vacancies'),
);
const Candidates = React.lazy(
  () => import('../containers/admin/candidates/SearchCandidates'),
);
const Applications = React.lazy(
  () => import('../containers/admin/applications/Applications'),
);
const Admins = React.lazy(
  () => import('../containers/admin/adminAccounts/AdminAccounts'),
);
const NewAdmin = React.lazy(
  () => import('../containers/admin/adminAccounts/NewAdmin'),
);
const EditAdmin = React.lazy(
  () => import('../containers/admin/adminAccounts/EditAdmin'),
)
const CandidateDetails = React.lazy(
  () => import('../containers/admin/candidates/Details'),
);
const ClientDetails = React.lazy(
  () => import('../containers/admin/clients/Details'),
);
const ClientEdit = React.lazy(
  () => import('../containers/admin/clients/EditClient'),
);
const VacancyDetails = React.lazy(
  () => import('../containers/admin/vacancies/Details'),
);
const ApplicationDetails = React.lazy(
  () => import('../containers/admin/applications/Details'),
);

const Campaigns = React.lazy(
  () => import('../containers/admin/campaigns/Campaigns'),
);
const PageNotFound = React.lazy(() => import('../containers/404'));
const CandidateSignup = React.lazy(
  () => import('../containers/Signup/CandidateSignup'),
);
const UpdateCv = React.lazy(
  () => import('../containers/admin/applications/UpdateCv'),
);

const UpdateCandidateSkills = React.lazy(
  () => import('../containers/admin/candidates/CandidateUpdateDetails'),
);
const NewVacancy = React.lazy(
  () => import('../containers/employer/newVacancy/NewVacancy'),
);
const CvDownload = React.lazy(
  () => import('../containers/admin/candidates/pdf/CvDownload'),
);
const CandidateEdit = React.lazy(
  () => import('../containers/admin/candidates/EditCandidate'),
);

const CandidateNotesAddAndEdit = React.lazy(
  () => import('../containers/admin/candidates/CandidateNoteAddAndEdit'),
);

const ClientNotesAddAndEdit = React.lazy(
  () => import('../containers/admin/clients/ClientNotesAddAndEditForm'),
);
const ProspectClients = React.lazy(
  () => import('../containers/admin/prospect/ProspectClients'),
);
const ProspectClientDetails = React.lazy(
  () => import('../containers/admin/prospect/Details'),
);
// Routes when user logged in is admin or super admin.
const AdminRoutes: FC = () => (
  <Suspense fallback={<Loader />}>
    <Routes>
      <Route path={APP_ROUTES.DASHBOARD} element={<Outlet />}>
        <Route index element={<AdminDashboard />} />
        <Route path='clients' element={<SearchClients />} />
        <Route path='clients'>
          <Route index path='details/:id' element={<ClientDetails />} />
          <Route index path='edit/:id' element={<ClientEdit />} />
        </Route>
        <Route
          path={`${APP_ROUTES.CLIENT_DETAIL_ROUTE}/:id/${APP_ROUTES.ADD_NOTE}`}
          element={<ClientNotesAddAndEdit />}
        />
        <Route
          path={`${APP_ROUTES.CLIENT_DETAIL_ROUTE}/:id/${APP_ROUTES.UPDATE_NOTE}/:notesId`}
          element={<ClientNotesAddAndEdit />}
        />
        <Route path='vacancies' element={<Vacancies />} />
        <Route path='vacancies'>
          <Route index path='update/:id' element={<NewVacancy />} />
          <Route index path='details/:id' element={<VacancyDetails />} />
        </Route>
        <Route path={APP_ROUTES.CAMPAIGN_START}>
          <Route index path=':id' element={<Campaigns />} />
        </Route>
        <Route path={APP_ROUTES.CAMPAIGN_UPDATE}>
          <Route index path=':id' element={<Campaigns />} />
        </Route>

        <Route path='candidates' element={<Candidates />} />
        <Route path='candidates/signup/:id' element={<CandidateSignup />} />
        <Route path='candidates/details/:id' element={<CandidateDetails />} />
        <Route path='candidates/edit/:id' element={<CandidateEdit />} />
        <Route
          path={`${APP_ROUTES.CANDIDATE_DETAIL_ROUTE}/:id/${APP_ROUTES.ADD_NOTE}`}
          element={<CandidateNotesAddAndEdit />}
        />

        <Route
          path={`${APP_ROUTES.CANDIDATE_DETAIL_ROUTE}/:id/${APP_ROUTES.UPDATE_NOTE}/:notesId`}
          element={<CandidateNotesAddAndEdit />}
        />
        <Route path='applications' element={<Applications />} />
        <Route path='candidate'>
          <Route path='cv/:candidateId/:hide' element={<CvDownload />} />
        </Route>
        <Route path='applications'>
          <Route index path='details/:id' element={<ApplicationDetails />} />
          <Route path=':id/cv/:candidateId/:hide' element={<CvDownload />} />
        </Route>
        <Route path='candidate/updatecv/:id' element={<UpdateCv />} />
        <Route
          path='candidate/update/details/:id'
          element={<UpdateCandidateSkills />}
        />
        <Route path='admins' element={<Admins />} />
        <Route path='admins'>
          <Route index path='newadmin' element={<NewAdmin />} />
          <Route index path='edit/:id' element={<EditAdmin />} />
        </Route>
        <Route path='prospect-clients' element={<ProspectClients />} />
        <Route path='prospect-clients'>
          <Route index path='details/:id' element={<ProspectClientDetails />} />
        </Route>
        <Route path={APP_ROUTES.NOT_FOUND} element={<PageNotFound />} />
      </Route>
      <Route
        path={APP_ROUTES.NOT_FOUND}
        element={<Navigate to={APP_ROUTES.DASHBOARD} />}
      />
    </Routes>
  </Suspense>
);

export default AdminRoutes;
