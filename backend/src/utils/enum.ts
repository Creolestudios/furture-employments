import { registerEnumType } from '@nestjs/graphql';

export enum Role {
  CANDIDATE = 1,
  EMPLOYER = 2,
  ADMIN = 3,
  SUPER_ADMIN = 4,
  CANDIDATE_SIGN_UP = 5,
  EMPLOYER_SIGN_UP = 6,
}
registerEnumType(Role, { name: 'Role' });

export enum LoginType {
  DEFAULT_REGISTRATION = 1,
  LINKEDIN = 2,
}
registerEnumType(LoginType, { name: 'LoginType' });

export enum NoticePeriodType {
  DAYS = 0,
  WEEKS = 1,
  MONTHS = 2,
  YEARS = 3,
}
registerEnumType(NoticePeriodType, { name: 'NoticePeriodType' });

export enum ApplicationStatus {
  UNAPPROVED = 1,
  OPEN = 2,
  SHORTLISTED = 3,
  ACCEPTED = 4,
  CLOSED = 5,
}
registerEnumType(ApplicationStatus, { name: 'ApplicationStatus' });

export enum VacancyStatus {
  UNAPPROVED = 1,
  OPEN = 2,
  CLOSE = 3,
}
registerEnumType(VacancyStatus, { name: 'VacancyStatus' });

export enum Relocation {
  NO = 1,
  LOCALLY = 2,
  INTERNATIONALLY = 3,
}
registerEnumType(Relocation, { name: 'Relocation' });
export enum CampaignsStatus {
  START = 1,
  STOP = 2,
}
registerEnumType(CampaignsStatus, { name: 'CampaignsStatus' });

export enum ProspectClientStatus {
  OPEN = 1,
  CONVERTED = 2,
  CLOSED=3
}
registerEnumType(ProspectClientStatus, { name: 'ProspectClientStatus' });
