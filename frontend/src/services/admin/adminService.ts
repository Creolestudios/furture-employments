import { useMutation, useQuery } from '@apollo/client';
import moment from 'moment';
import {
  ISearchCandidateFilter,
  ISearchClientFilter,
} from '../../interfaces/search';
import {
  ADMIN_DETAILS,
  ADMIN_LIST,
  ADMIN_NOTES_BY_ID_FOR_EMPLOYER,
  ADMIN_NOTES_FOR_EMPLOYER,
  CANDIDATE_DETAIL_FOR_ADMIN,
  CANDIDATE_NOTES_BY_ADMIN,
  CANDIDATE_NOTES_BY_ID,
  CANDIDATE_SKILLS_DETAIL,
  GET_PDF_TO_MARKDOWN_TEXT,
  GET_SKILLS,
  PROSPECT_CLIENT_DETAILS,
  PROSPECT_CLIENT_TIMELINE,
  SEARCH_CANDIDATE,
  SEARCH_CLIENT,
  SEARCH_PROSPECT_CLIENT,
} from '../../graphql/queries/admin';
import { UPDATE_FUTURE_PROSPECTS_CV } from '../../graphql/mutations/candidate';
import { getFullName } from '../../utils';
import { FUTURE_PROSPECTS_CV_DETAILS } from '../../graphql/queries/applicationQueries';
import {
  EDIT_CANDIDATE,
  ADMIN_NOTES_UPDATE,
  ADMIN_NOTE_FOR_CANDIDATE,
  REMOVE_CANDIDATE,
  REMOVE_NOTES,
  UPDATE_CANDIDATE_SKILLS,
  ADD_NOTES_FOR_EMPLOYER,
  UPDATE_EMPLOYER_NOTES,
  REMOVE_EMPLOYER_NOTES,
  ADD_ADMIN,
  EDIT_ADMIN,
  DISABLE_ADMIN,
  REMOVE_ADMIN,
  ADD_SKILLS,
  INVITE_CANDIDATES,
  REMOVE_PROSPECT_ADDRESS,
  REMOVE_PROSPECT_PEOPLE,
  UPDATE_PROSPECT_CLIENT,
  UPDATE_PROSPECT_PEOPLE,
  UPDATE_PROSPECT_ADDRESS,
  NEW_PROSPECT_PEOPLE,
  NEW_PROSPECT_ADDRESS,
  NEW_PROSPECT_CLIENT,
  CONVERT_TO_CLIENT,
  CLOSE_CLIENT,
  UPDATE_CONVERTED_CLIENT,
  REMOVE_CLIENT,
  CREATE_APPLICATION,
} from '../../graphql/mutations/admin';
import { USER_ROLE, months } from '../../constants';

export function useUpdateCandidateFutureProspectsCv() {
  const [updateFutureProspectsCv, { data, error, loading }] = useMutation(
    UPDATE_FUTURE_PROSPECTS_CV
  );

  return {
    updateFutureProspectsCv,
    data,
    error,
    loading,
  };
}

export function useClientSearch(searchParams: ISearchClientFilter) {
  const { data, loading, error } = useQuery(SEARCH_CLIENT, {
    variables: { searchParams },
  });
  const { data: client, total } = data?.searchClients || {};
  return {
    data:
      client && client.length > 0
        ? client?.map((item: any) => ({
            key: item.id,
            companyName: item.companyName,
            contactName: `${item.user?.firstName} ${item.user?.lastName}`,
            email: item.user?.email,
            phoneNumber: item.user.phoneNumber,
            createdAt: moment(item.createdAt).format('DD/MM/YYYY'),
          }))
        : [],
    total,
    loading,
    error,
  };
}

export function useCandidateSearch(searchParams: ISearchCandidateFilter) {
  const { data, loading, error } = useQuery(SEARCH_CANDIDATE, {
    variables: { searchParams },
  });
  const { data: candidates, total } = data?.searchCandidate || {};

  return {
    data:
      candidates && candidates.length > 0
        ? candidates.map((candidate: any) => ({
            key: candidate.id,
            candidate_name: `${candidate?.user?.firstName} ${candidate?.user?.lastName}`,
            location: candidate?.city,
            postcode: candidate?.postcode,
            desired_salary: candidate?.jobPreference?.desiredSalary,
            email: candidate?.user?.email,
            registered_date: moment(candidate?.createdAt).format('DD/MM/YYYY'),
            phone_number: candidate?.user?.phoneNumber,
            userId: candidate?.user?.id,
          }))
        : [],
    loading,
    error,
    total,
  };
}
export const useCandidateDetailForAdmin = (
  candidateId: number,
  applicationId?: number
) => {
  const { data, loading, error } = useQuery(CANDIDATE_DETAIL_FOR_ADMIN, {
    variables: { candidateId, applicationId },
  });
  const { data: candidateDetail } = data?.candidateDetail || {};

  return {
    data: candidateDetail,
    fullName: getFullName(
      candidateDetail?.firstName,
      candidateDetail?.lastName
    ),
    userId: candidateDetail?.id,
    jobPreference: [
      {
        key: 1,
        name: 'Desired Salary',
        value: candidateDetail?.jobPreference?.desiredSalary,
      },
      {
        key: 2,
        name: 'Job Types',
        value: candidateDetail?.jobPreference?.jobTypes.toString(),
      },
      {
        key: 3,
        name: 'Preferred Industries',
        value: candidateDetail?.jobPreference?.categories.toString(),
      },
      {
        key: 4,
        name: 'Can Admin Apply',
        value: candidateDetail?.jobPreference?.canAdminApply,
      },
    ],
    aboutCandidate: [
      {
        key: '1',
        name: 'Languages',
        value: candidateDetail?.aboutCandidate?.languages,
      },
      {
        key: '2',
        name: 'Notice Period',
        value: `${candidateDetail?.aboutCandidate?.noticePeriodTime} ${candidateDetail?.aboutCandidate?.noticePeriodType}`,
      },
      {
        key: '3',
        name: 'Current Salary',
        value: candidateDetail?.aboutCandidate?.currentSalary,
      },
      {
        key: '4',
        name: 'Reason for leaving',
        value: candidateDetail?.aboutCandidate?.reasonForLeaving || 'N/A',
      },
    ],
    registeredAt: moment(candidateDetail?.candidateProfile?.createdAt).format(
      'DD/MM/YYYY'
    ),
    candidateCv: candidateDetail?.aboutCandidate?.cv,
    loading,
    error,
  };
};

export function useFutureProspectsCvDetail(profileId: number) {
  const { data, loading, error } = useQuery(FUTURE_PROSPECTS_CV_DETAILS, {
    variables: { profileId },
  });
  const { aboutCandidate, candidateProfile, id, firstName, lastName } =
    data?.futureProspectCvDetail?.data || {};
  return {
    about: aboutCandidate,
    profile: candidateProfile,
    user: {
      id,
      firstName,
      lastName,
    },
    loading,
    error,
  };
}

export function useCandidateSkills(profileId: number) {
  const { data, loading, error } = useQuery(CANDIDATE_SKILLS_DETAIL, {
    variables: { candidateId: profileId },
  });
  const { data: candidateSkillsDetails } = data?.candidateDetail || {};

  return {
    candidateSkillsDetails,
    loading,
    error,
  };
}
export function useUpdateCandidateSkills() {
  const [updateCandidateSkills, { data, loading, error }] = useMutation(
    UPDATE_CANDIDATE_SKILLS
  );
  return {
    updateCandidateSkills,
    data,
    loading,
    error,
  };
}
export function useRemoveCandidate() {
  const [removeCandidate, { data, loading, error }] =
    useMutation(REMOVE_CANDIDATE);

  return {
    removeCandidate,
    data,
    loading,
    error,
  };
}

export function useRemoveClient() {
  const [removeClient, { data, loading, error }] = useMutation(REMOVE_CLIENT);

  return {
    removeClient,
    data,
    loading,
    error,
  };
}

export const useEditCandidate = () => {
  const [edit, { data, loading, error }] = useMutation(EDIT_CANDIDATE);

  return {
    edit,
    loading,
    error,
    data,
  };
};

export function useAdminNotesForCandidate() {
  const [addNote, { data, loading, error }] = useMutation(
    ADMIN_NOTE_FOR_CANDIDATE
  );
  return {
    addNote,
    data,
    loading,
    error,
  };
}

export function useAdminNotesUpdate() {
  const [updateCandidateNote, { data, loading, error }] =
    useMutation(ADMIN_NOTES_UPDATE);
  return {
    updateCandidateNote,
    data,
    loading,
    error,
  };
}
export function useAdminNotesRemove() {
  const [removeCandidateNotes, { data, loading, error }] =
    useMutation(REMOVE_NOTES);
  return {
    removeCandidateNotes,
    data,
    loading,
    error,
  };
}

export function useAdminNotes(candidateId: number) {
  const { data, loading, error } = useQuery(CANDIDATE_NOTES_BY_ADMIN, {
    variables: { candidateId },
  });
  const { data: adminNotes } = data?.adminNotesForCandidate || {};

  return {
    adminNotes,
    loading,
    error,
  };
}
export function useAdminNotesById(notesId: number) {
  const { data, loading, error } = useQuery(CANDIDATE_NOTES_BY_ID, {
    variables: { notesId },
  });
  const { data: adminNote } = data?.getNotesById || {};

  return {
    adminNote,
    loading,
    error,
  };
}
export function useAddNotesForEmployer() {
  const [addNote, { data, loading, error }] = useMutation(
    ADD_NOTES_FOR_EMPLOYER
  );

  return {
    addNote,
    data,
    loading,
    error,
  };
}

export function useUpdateEmployerNotes() {
  const [updateNote, { data, loading, error }] = useMutation(
    UPDATE_EMPLOYER_NOTES
  );
  return {
    updateNote,
    data,
    loading,
    error,
  };
}
export function useRemoveEmployerNotes() {
  const [removeNote, { data, loading, error }] = useMutation(
    REMOVE_EMPLOYER_NOTES
  );
  return {
    removeNote,
    data,
    loading,
    error,
  };
}

export function useAdminNotesForEmployer(employerId: number) {
  const { data, loading, error } = useQuery(ADMIN_NOTES_FOR_EMPLOYER, {
    variables: { employerId },
  });
  const { data: adminNotes } = data?.adminNotesForEmployer || {};

  return {
    adminNotes,
    loading,
    error,
  };
}
export function useAdminNoteByIdForEmployer(notesId: number) {
  const { data, loading, error } = useQuery(ADMIN_NOTES_BY_ID_FOR_EMPLOYER, {
    variables: { notesId },
  });
  const { data: adminNote } = data?.adminNotesByIdForEmployer || {};

  return {
    adminNote,
    loading,
    error,
  };
}
export function useAddAdmin() {
  const [SubmitAdmin, { data, loading, error }] = useMutation(ADD_ADMIN);
  return {
    SubmitAdmin,
    data,
    loading,
    error,
  };
}

export function useEditAdmin() {
  const [editAdmin, { data, loading, error }] = useMutation(EDIT_ADMIN);
  return {
    editAdmin,
    data,
    loading,
    error,
  };
}

export function useDisableAdmin() {
  const [disableAdmin, { data, loading, error }] = useMutation(DISABLE_ADMIN);
  return {
    disableAdmin,
    data,
    loading,
    error,
  };
}

export function useRemoveSuperAdmin() {
  const [removeSuperAdmin, { data, loading, error }] =
    useMutation(REMOVE_ADMIN);
  return {
    removeSuperAdmin,
    data,
    loading,
    error,
  };
}

export function useGetAdminList(searchParams: any) {
  const { data, loading, error } = useQuery(ADMIN_LIST, {
    variables: { searchParams },
  });

  const { data: adminList, total } = data?.allAdminList || {};

  return {
    adminList:
      adminList && adminList
        ? adminList.map((admin: any) => ({
            id: admin.id,
            name: getFullName(admin.firstName, admin.lastName),
            email: admin.email,
            role:
              Number(admin.role) === Number(USER_ROLE.ADMIN)
                ? 'Admin'
                : 'Admin, SuperAdmin',
          }))
        : [],
    loading,
    error,
    total,
  };
}

export function useGetAdminDetails(id: number) {
  const { data, loading, error } = useQuery(ADMIN_DETAILS, {
    variables: { userId: id },
  });
  const { adminDetails } = data || {};

  return {
    data: adminDetails && {
      ...adminDetails,
      role:
        Number(adminDetails.role) === Number(USER_ROLE.ADMIN)
          ? 'Admin'
          : 'Admin, SuperAdmin',
    },
    loading,
    error,
  };
}

export const useAddSkills = () => {
  const [addSkills, { data, loading, error }] = useMutation(ADD_SKILLS);
  return {
    addSkills,
    data,
    loading,
    error,
  };
};

export const useGetPdfToMarkdownText = (fileName: string) => {
  const { data, loading, error } = useQuery(GET_PDF_TO_MARKDOWN_TEXT, {
    variables: { fileName },
  });
  const { pdfText } = data?.getPdfToMarkdownText || {};
  return {
    loading,
    error,
    pdfText,
  };
};
export const useGetSkills = (skill: string) => {
  const { data, loading, error } = useQuery(GET_SKILLS, {
    variables: { searchSkill: skill },
  });

  const { data: newSkills } = data?.getSkills || {};

  return {
    newSkills:
      newSkills &&
      newSkills?.length > 0 &&
      newSkills.map((skill: any) => ({
        label: skill.skill,
        value: skill.skill,
      })),
    loading,
    error,
  };
};

export function useInviteCandidates() {
  const [inviteCandidates, { data, loading, error }] =
    useMutation(INVITE_CANDIDATES);
  return {
    inviteCandidates,
    data,
    loading,
    error,
  };
}

export function useProspectClientSearch(searchParams: ISearchClientFilter) {
  const { data, loading, error } = useQuery(SEARCH_PROSPECT_CLIENT, {
    variables: { searchParams },
  });
  const { data: client, total } = data?.getProspectClients || {};
  return {
    data:
      client && client.length > 0
        ? client?.map((item: any) => {
            function formatDate(inputDateString: any) {
              const date = new Date(inputDateString);
              const formattedTime = date.toLocaleString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
              });
              const formattedDate = `${
                months[date.getMonth()]
              } ${date.getDate()}, ${date.getFullYear()}`;
              return `${formattedTime}  |  ${formattedDate}`;
            }
            return {
              key: item.id,
              companyName: item.companyName,
              personAssigned: item.personAssigned,
              notes: item.notes,
              status: item.status,
              reminderDate: formatDate(item.reminderDate),
              createdAt: moment(item.createdAt).format('DD/MM/YYYY'),
            };
          })
        : [],
    total,
    loading,
    error,
  };
}

export function useProspectClientDetails(prospectClientId: number) {
  const { data, loading, error } = useQuery(PROSPECT_CLIENT_DETAILS, {
    variables: { prospectClientId },
  });
  const { data: details } = data?.getProspectClientDetails || {};
  const enrichPeople =
    details &&
    details.people.map((person: any) => ({ ...person, key: person.id }));
  const enrichAddress =
    details && details.address.map((item: any) => ({ ...item, key: item.id }));
  const client = { ...details, people: enrichPeople, address: enrichAddress };
  return {
    client,
    loading,
    error,
  };
}

export function useProspectTimeline(prospectClientId: number) {
  const { data, loading, error } = useQuery(PROSPECT_CLIENT_TIMELINE, {
    variables: { prospectClientId },
  });
  const { data: timeline } = data?.getProspectTimeline || {};
  return {
    timeline,
    loading,
    error,
  };
}

export function useRemoveProspectPeople() {
  const [removePeople, { data, loading, error }] = useMutation(
    REMOVE_PROSPECT_PEOPLE
  );
  return {
    removePeople,
    data,
    loading,
    error,
  };
}

export function useRemoveProspectAddress() {
  const [removeAddress, { data, loading, error }] = useMutation(
    REMOVE_PROSPECT_ADDRESS
  );
  return {
    removeAddress,
    data,
    loading,
    error,
  };
}

export function useUpdateProspectClient() {
  const [updateProspectClient, { data, loading, error }] = useMutation(
    UPDATE_PROSPECT_CLIENT
  );
  return {
    updateProspectClient,
    data,
    loading,
    error,
  };
}

export function useUpdateProspectPeople() {
  const [updateProspectPeople, { data, loading, error }] = useMutation(
    UPDATE_PROSPECT_PEOPLE
  );
  return {
    updateProspectPeople,
    data,
    loading,
    error,
  };
}

export function useNewProspectPeople() {
  const [newProspectPerson, { data, loading, error }] =
    useMutation(NEW_PROSPECT_PEOPLE);
  return {
    newProspectPerson,
    data,
    loading,
    error,
  };
}

export function useNewProspectAddress() {
  const [newProspectAddress, { data, loading, error }] =
    useMutation(NEW_PROSPECT_ADDRESS);
  return {
    newProspectAddress,
    data,
    loading,
    error,
  };
}

export function useUpdateProspectAddress() {
  const [updateProspectAddress, { data, loading, error }] = useMutation(
    UPDATE_PROSPECT_ADDRESS
  );
  return {
    updateProspectAddress,
    data,
    loading,
    error,
  };
}

export function useNewProspectClient() {
  const [newProspectClient, { data, loading, error }] =
    useMutation(NEW_PROSPECT_CLIENT);
  return {
    newProspectClient,
    data,
    loading,
    error,
  };
}

export function useConvertToClient() {
  const [convertToClient, { data, loading, error }] =
    useMutation(CONVERT_TO_CLIENT);
  return {
    convertToClient,
    data,
    loading,
    error,
  };
}

export function useCloseProspectClient() {
  const [closeProspectClient, { data, loading, error }] =
    useMutation(CLOSE_CLIENT);
  return {
    closeProspectClient,
    data,
    loading,
    error,
  };
}

export function useUpdateConvertedClient() {
  const [updateConvertedClient, { data, loading, error }] = useMutation(
    UPDATE_CONVERTED_CLIENT
  );
  return {
    updateConvertedClient,
    data,
    loading,
    error,
  };
}


export function useCreateApplication() {
  const [createApplication, { data, loading, error }] =
    useMutation(CREATE_APPLICATION);

  return {
    createApplication,
    data,
    loading,
    error,
  };
}