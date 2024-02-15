import { gql } from '@apollo/client';

export const UPDATE_CANDIDATE_SKILLS = gql`
  mutation ($updateSkillsDto: CandidateUpdateSkillsDTO!) {
    updateCandidateSkills(updateSkillsDto: $updateSkillsDto) {
      message
    }
  }
`;

export const REMOVE_CANDIDATE = gql`
  mutation ($candidateId: Int!) {
    candidateRemove(candidateId: $candidateId) {
      message
    }
  }
`;

export const REMOVE_CLIENT = gql`
  mutation ($clientId: Int!) {
    clientRemove(clientId: $clientId) {
      message
    }
  }
`;

export const EDIT_CANDIDATE = gql`
  mutation (
    $userArgs: UpdateUserBasicSignupDto!
    $profileArgs: UpdateCandidateProfileDto!
    $aboutArgs: UpdateAboutCandidateDto!
    $jobPreferenceArgs: UpdateCandidateJobPreferenceDto!
    $userId: Int!
    $cv: Upload
  ) {
    editCandidateByAdmin(
      userArgs: $userArgs
      profileArgs: $profileArgs
      aboutArgs: $aboutArgs
      jobPreferenceArgs: $jobPreferenceArgs
      userId: $userId
      cv: $cv
    ) {
      message
    }
  }
`;

export const ADMIN_NOTE_FOR_CANDIDATE = gql`
  mutation ($addNotesDto: AddNotesDTO!) {
    addNotes(addNotesDto: $addNotesDto) {
      message
    }
  }
`;

export const ADMIN_NOTES_UPDATE = gql`
  mutation ($updateNotesDto: UpdateNotesDTO!) {
    updateNotes(updateNotesDto: $updateNotesDto) {
      message
    }
  }
`;

export const REMOVE_NOTES = gql`
  mutation ($notesId: Int!) {
    removeNotes(notesId: $notesId) {
      message
    }
  }
`;

export const ADD_NOTES_FOR_EMPLOYER = gql`
  mutation ($addNotesDto: AddNotesDTO!) {
    addNotesForEmployer(addNotesDto: $addNotesDto) {
      message
    }
  }
`;

export const UPDATE_EMPLOYER_NOTES = gql`
  mutation ($updateNotesDto: UpdateNotesDTO!) {
    updateEmployerNotes(updateNotesDto: $updateNotesDto) {
      message
    }
  }
`;
export const REMOVE_EMPLOYER_NOTES = gql`
  mutation ($notesId: Int!) {
    removeEmployerNotes(notesId: $notesId) {
      message
    }
  }
`;
export const ADD_ADMIN = gql`
  mutation (
    $FirstName: String!
    $LastName: String!
    $Email: String!
    $Password: String!
    $ConfirmPassword: String!
  ) {
    addAdmin(
      addAdminDto: {
        firstName: $FirstName
        lastName: $LastName
        email: $Email
        password: $Password
        confirmPassword: $ConfirmPassword
      }
    ) {
      message
    }
  }
`;

export const EDIT_ADMIN = gql`
  mutation ($updateAdmin: UpdateAdminDto!) {
    updateAdmin(updateAdmin: $updateAdmin) {
      message
    }
  }
`;

export const DISABLE_ADMIN = gql`
  mutation ($disableAdminDto: DisableAdminDto!) {
    disableAdmin(disableAdminDto: $disableAdminDto) {
      message
    }
  }
`;

export const REMOVE_ADMIN = gql`
  mutation ($userId: Int!) {
    removeAdmin(userId: $userId) {
      message
    }
  }
`;

export const ADD_SKILLS = gql`
  mutation ($skills: SkillDTO!) {
    addSkills(skills: $skills) {
      message
    }
  }
`;

export const INVITE_CANDIDATES = gql`
  mutation ($candidates: InviteCandidatesDTO!) {
    inviteCandidates(candidates: $candidates) {
      message
    }
  }
`;

export const REMOVE_PROSPECT_PEOPLE = gql`
  mutation ($peopleId: Float!) {
    removeProspectPeople(peopleId: $peopleId) {
      message
    }
  }
`;

export const REMOVE_PROSPECT_ADDRESS = gql`
  mutation ($addressId: Float!) {
    removeProspectAddress(addressId: $addressId) {
      message
    }
  }
`;

export const UPDATE_PROSPECT_CLIENT = gql`
  mutation ($prospectClientId: Float!, $clientData: UpdateProspectClientDTO!) {
    updateProspectClient(
      prospectClientId: $prospectClientId
      clientData: $clientData
    ) {
      message
    }
  }
`;

export const UPDATE_PROSPECT_PEOPLE = gql`
  mutation (
    $prospectClientId: Float!
    $peopleId: Float!
    $peopleData: ProspectPeopleDTO!
  ) {
    updateProspectPeople(
      prospectClientId: $prospectClientId
      peopleId: $peopleId
      peopleData: $peopleData
    ) {
      message
    }
  }
`;

export const UPDATE_PROSPECT_ADDRESS = gql`
  mutation (
    $prospectClientId: Float!
    $addressId: Float!
    $addressData: ProspectAddressDTO!
  ) {
    updateProspectAddress(
      prospectClientId: $prospectClientId
      addressId: $addressId
      addressData: $addressData
    ) {
      message
    }
  }
`;

export const NEW_PROSPECT_PEOPLE = gql`
  mutation ($prospectClientId: Float!, $peopleData: ProspectPeopleDTO!) {
    newProspectPeople(
      prospectClientId: $prospectClientId
      peopleData: $peopleData
    ) {
      message
    }
  }
`;

export const NEW_PROSPECT_ADDRESS = gql`
  mutation ($prospectClientId: Float!, $addressData: ProspectAddressDTO!) {
    newProspectAddress(
      prospectClientId: $prospectClientId
      addressData: $addressData
    ) {
      message
    }
  }
`;

export const NEW_PROSPECT_CLIENT = gql`
  mutation ($prospectData: NewProspectDto!) {
    newProspectClient(prospectData: $prospectData) {
      message
    }
  }
`;

export const CONVERT_TO_CLIENT = gql`
  mutation (
    $prospectClientId: Float!
    $personId: Float!
    $addressId: Float!
    $clientData: EmployerProfileEditDto!
  ) {
    convertToClient(
      prospectClientId: $prospectClientId
      personId: $personId
      addressId: $addressId
      clientData: $clientData
    ) {
      message
    }
  }
`;

export const CLOSE_CLIENT = gql`
  mutation ($prospectClientId: Float!, $email: CloseClientDTO!) {
    closeProspectClient(prospectClientId: $prospectClientId, email: $email) {
      message
    }
  }
`;

export const UPDATE_CONVERTED_CLIENT = gql`
  mutation ($updateData: UpdateConvertedClientDTO!) {
    updateConvertedClient(updateData: $updateData) {
      message
    }
  }
`;

export const CREATE_APPLICATION = gql`
  mutation ($userId: Int!, $vacancyId: Int!) {
    createApplication(userId: $userId, vacancyId: $vacancyId) {
      id
      message
    }
  }
`;
