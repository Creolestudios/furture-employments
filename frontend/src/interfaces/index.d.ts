import { ApolloError } from '@apollo/client';
import { UploadChangeParam } from 'antd/es/upload';
import {
  IAboutCandidate,
  ICandidateProfile,
  IJobPreference,
} from './formElements';

export interface IOption {
  label: string;
  value: string | number;
  key?: string;
}

export interface IFormValidateType {
  email: string;
  number: string;
}

export interface IFormValidateString {
  min: string;
  max: string;
}

export interface IValidateMessage {
  required: string;
  types: IFormValidateType;
  string: IFormValidateString;
}

export interface IUserDetail {
  id: number | null;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string | null;
  role?: number;
}

export interface IErrorObject {
  code: string;
  message: string;
  name: string;
}

export interface IRequest {
  loading: boolean;
  error?: ApolloError | null | undefined;
}
export interface IUserDetailQuery extends IRequest {
  data: { getUserDetails: IUserDetail } | undefined;
}

export type GetCandidateProfile =
  | IUserDetail
  | ICandidateProfile
  | IAboutCandidate;
export interface ICandidateProfileQuery extends IRequest {
  aboutCandidate: IAboutCandidate;
  candidateProfile: ICandidateProfile;
  user: IUserDetail;
}

export interface IUserArgs extends Omit<IUserDetail, 'id'> {}

export interface IAboutCandidateArgs extends IAboutCandidate {
  noticePeriodTime?: number;
  noticePeriodType?: number;
  currentSalary?: string;
  reasonForLeaving?: string;
}

export interface ICandidateRegistrationVariableArgs extends IJobPreference {
  id: number | null;
  role?: number;
  cv: null | UploadChangeParam;
  isUploadCvLater: boolean;
  isTermsCondition: boolean | undefined;
}

export interface IJobPreferenceResponse extends IJobPreference {
  id: number;
}

export interface IJobPreferenceQueryResponse extends IRequest {
  preference: IJobPreferenceResponse;
}

export interface ICVArgs {
  userId: number;
  cv: UploadChangeParam;
}

export interface IApplicationStatusItem {
  status: number;
  name: string;
  desc: string;
  color: string;
}

export interface IPagination {
  current: number;
  pageSize: number;
}

export interface IApplication {
  id: number;
  position: string;
  status: number;
  createdAt: string;
}

export interface IGetApplicationsQuery extends IRequest {
  applications: IApplication[];
  total: number;
}

export interface ICardColumn {
  key: string;
  value: string;
  isTag?: boolean;
  isDownloadCv?: boolean;
}

export interface ICardRow {
  row: ICardColumn[];
  cvUrlData?: any;
}

export interface ICvContentArgs {
  fileName: string;
  fetchQuery: boolean;
}
