import { FormInstance, RuleConfig } from 'antd';
import { UploadChangeParam } from 'antd/es/upload';
import { IUserDetail } from '.';
// import { IOption } from '.';

export interface IColumnStyle {
  offset?: number;
  span?: number;
}

export type FormItemRule = RuleConfig | ((form: FormInstance) => RuleConfig);

export interface IFormItem {
  label: string;
  name: string;
  labelMinWidth?: string;
  wrapperCol?: IColumnStyle;
  labelCol?: IColumnStyle;
  dependencies?: string[];
  rules?: FormItemRule[];
}

export interface ICandidateProfile {
  addressLine1: string;
  addressLine2: string;
  city: string;
  county: string;
  postcode: string;
  country: string;
}

export interface ICurrentEmployed {
  noticePeriodTime: string;
  noticePeriodType: number;
  currentSalary: string;
  reasonForLeaving: string;
}

export interface IAboutCandidate extends ICurrentEmployed {
  languages: Array<string> | [];
  isCurrentlyEmployed: boolean;
  hasWorkRight: boolean | undefined;
}

export interface IJobPreference {
  jobTypes: Array<string> | [];
  desiredSalary: string;
  relocation: number;
  categories: Array<string>[];
  canAdminApply: boolean | undefined;
}

export interface ICandidateRegistration
  extends IUserDetail,
    ICandidateProfile,
    IAboutCandidate,
    IJobPreference {
  cv: null | UploadChangeParam;
  isUploadCvLater: boolean;
  isTermsCondition: boolean | undefined;
}
export interface ICandidateNoteAdd {
  description: string;
}
