export interface ProspectPeopleDataType {
  key: string;
  firstName: string;
  lastName: string;
  email: string;
  registered_date: string;
  extension: string;
  phoneNumber: string;
  converted: boolean;
}

export interface IProspectPeople {
  tableData: ProspectPeopleDataType[];
  convertModal: boolean;
  setConvertPerson?: any;
  setChangeDetails?: any;
  initialPeopleId?: any;
  changeDetails?: any;
  deleted?: any;
  setDeleted?: any;
  convertPerson?: any;
  status?: any;
}

export interface ProspectAddressDataType {
  key: number;
  addressLine1: string;
  addressLine2: string;
  city: string;
  county: string;
  country: string;
  postcode: string;
  converted: boolean;
}

export interface IProspectAddress {
  tableData: ProspectAddressDataType[];
  convertModal: boolean;
  setConvertAddress?: any;
  setChangeDetails?: any;
  initialAddressId?: any;
  changeDetails?: any;
  deleted?: any;
  setDeleted?: any;
  convertAddress?: any;
  status?: any;
}
