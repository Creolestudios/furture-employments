export interface ISearchClientFilter {
  query?: string;
  current: number;
  pageSize: number;
}

export interface ISearchVacanciesFilter {
  query?: string;
  current: number;
  pageSize: number;
}
export interface ISearchCandidateFilter {
  query?: string;
  location?: string;
  skills?: string;
  salaryFrom?: string;
  salaryTo?: string;
  current: number;
  pageSize: number;
  sortBy?: string;
}
