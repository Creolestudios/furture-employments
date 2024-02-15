import { UploadFile } from 'antd';
import moment from 'moment';
import {
  VALIDATE_MESSAGE,
  ALLOWED_FILE_FORMATS,
  USER_ROLE,
  CAPITAL_ALPHABET_REGEX,
  DATE_FORMAT,
} from '../constants';
import { ICardColumn, IValidateMessage } from '../interfaces';
import Notification from '../components/common/Notification';
import FORM_VALIDATION_MESSAGE from '../constants/validationMessage';

export const validateMessage = (): IValidateMessage => ({
  required: VALIDATE_MESSAGE.REQUIRED,
  types: {
    email: VALIDATE_MESSAGE.EMAIL,
    number: VALIDATE_MESSAGE.NUMBER,
  },
  string: {
    min: VALIDATE_MESSAGE.MIN,
    max: VALIDATE_MESSAGE.MAX,
  },
});
// Allow specific file formats to be upload.
export const isValidFile = (values: UploadFile[]) => {
  if (values.length > 0) {
    const _values: Array<any> | [] = values.map(
      (value: UploadFile) => value.originFileObj?.type?.split('/')[1],
    ) ?? [];

    return _values.every((value: string) => ALLOWED_FILE_FORMATS.includes(value));
  }
  return false;
};

export const getDifferentObjectValues = (initial: any, current: any) => {
  const keys = Object.keys(initial);

  return keys.reduce((final: any, key) => {
    if (JSON.stringify(initial[key]) !== JSON.stringify(current[key])) {
      // eslint-disable-next-line
      final[key] = current[key] ?? null;
    }
    return final;
  }, {});
};

export const convertIntoCardData = (data: any, role: number) => {
  const createRow = (row: any) => {
    const _row: ICardColumn[] = Object.keys(row).map((key: string) => {
      const column: ICardColumn = { key: '', value: '' };
      column.key = key;
      column.value = row[key];
      if (key === 'status') {
        column.isTag = true;
      }
      if (key === 'candidateCv') {
        column.isDownloadCv = true;
      }
      return column;
    });
    return _row;
  };
  const getRows = (...args: any) => args;

  if (USER_ROLE.CANDIDATE === role) {
    return getRows(
      createRow({
        position: data.vacancy.position,
        status: data.status,
      }),
      createRow({
        dateReceived: moment(data.createdAt).format(DATE_FORMAT),
      }),
    );
  }
  if (USER_ROLE.ADMIN === role) {
    if (data?.cvDownload) {
      return getRows(
        createRow({
          candidateName: data?.candidateName,
          candidateCv: data?.cvDownload,
        }),
      );
    }
    return getRows(
      createRow({
        candidateName: data?.candidateName,
      }),
    );
  }
  return [];
};

export const isCamelNotation = (value: string) => CAPITAL_ALPHABET_REGEX.test(value);

export const convertCamelIntoContentWithEmptySpace = (value: string) => {
  const index = value.search(CAPITAL_ALPHABET_REGEX);

  return `${value.slice(0, index)}  ${value.slice(index, value.length)}`;
};

export const getFullName = (firstName: string, lastName: string) => {
  if (firstName && lastName) {
    return firstName.concat(' ', lastName);
  }
  return '';
};
export const getApplicationCount = (count: number) => (count || count !== 0 ? count : 'N/A');

export const getSuccessResponse = (message: string) => Notification({ type: 'success', message });

export const getErrorResponse = (message: string) => Notification({ type: 'error', message });

// Download cv file helper
export const downloadFile = (url: string, fileName: string) => {
  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.setAttribute('href', blobUrl);
      a.setAttribute('download', fileName);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    });
};
export const hasChildElements = (data: any) => (data?.children
  ? Array.from(data?.children).some((child) => child instanceof HTMLElement)
  : false);

export const validateEMail = (_: any, email: any) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(email)) {
    return Promise.reject(new Error(FORM_VALIDATION_MESSAGE.EMAIL));
  }
  return Promise.resolve();
};

export function validatePhoneNumber(_: any, value: any) {
  const phoneNumberRegex = /^(?:(?:20\d{8})|(?:7[0-9]{9})|(?:1[0-9]{9})|(?:2[0-9]{9})|(?:3[0-9]{9})|(?:4[0-9]{9})|(?:5[0-9]{9})|(?:6[0-9]{9})|(?:8[0-9]{9})|(?:9[0-9]{9}))$/;
  if (!phoneNumberRegex.test(value)) {
    return Promise.reject(new Error(FORM_VALIDATION_MESSAGE.CONTACT_NUMBER));
  }
  return Promise.resolve();
}

export function validateTextLength(_: any, value: any) {
  if (value.length > 100) {
    return Promise.reject(new Error(FORM_VALIDATION_MESSAGE.TEXT_LENGTH));
  }
  if (value.length === 0) {
    if (_.field === 'companyName') {
      return Promise.reject(new Error(FORM_VALIDATION_MESSAGE.COMPANY_NAME));
    }
    if (_.field === 'website') {
      return Promise.reject(new Error(FORM_VALIDATION_MESSAGE.WEBSITE));
    }
  }
  return Promise.resolve();
}
