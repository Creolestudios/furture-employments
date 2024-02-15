import React, { FC, useCallback, useEffect, useState } from 'react';
import { Checkbox, Select, Form, FormInstance } from 'antd';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { UploadChangeParam } from 'antd/es/upload';
import TextAreaField from '../../common/formElements/TextAreaField';
import InputWrapper from '../../common/formElements/inputWrapper';
import SelectField from '../../common/formElements/SelectField';
import FormItemWrapper from '../../common/formElements/formItemWrapper';
import CheckboxGroupField from '../../common/formElements/CheckboxGroupField';
import UploadFileWrapper from '../../common/formElements/upload';
import ButtonWrapper from '../../common/formElements/buttonWrapper';
import {
  SALARY_RANGE_LIST,
  NOTICE_PERIOD_TYPES,
  RELOCATION_LIST,
  USER_ROLE,
  USER_ROLE_KEY,
  API_TOKEN,
} from '../../../constants';
import CANDIDATE_PROFILE_FORM from '../../../constants/components/candidateProfileForm';
import CheckboxField from '../../common/formElements/CheckboxField';
import {
  getDifferentObjectValues,
  getErrorResponse,
  getSuccessResponse,
  isValidFile,
  validateMessage,
} from '../../../utils';
import {
  IAboutCandidate,
  ICandidateProfile,
  ICandidateRegistration,
  IJobPreference,
} from '../../../interfaces/formElements';
import {
  IAboutCandidateArgs,
  ICandidateRegistrationVariableArgs,
  IJobPreferenceResponse,
  IUserArgs,
  IUserDetail,
} from '../../../interfaces';
import candidateService from '../../../services/candidate/candidateService';
import Notification from '../../common/Notification';
import APP_ROUTES from '../../../constants/appRoutes';
import Loader from '../../common/loader';
import {
  GET_CANDIDATE_JOB_PREFERENCE,
  GET_CANDIDATE_PROFILE,
} from '../../../graphql/queries/candidateQueries';

import StyledForm from './index.styles';
import { useEditCandidate } from '../../../services/admin/adminService';
import { CANDIDATE_DETAIL_FOR_ADMIN } from '../../../graphql/queries/admin';
import {
  useGetListData,
  useGetLanguageList,
} from '../../../services/constantDataService';

const { Option } = Select;

interface INoticePeriodTypeProps {
  value: number;
  handleChange: (valueArg: number) => void;
}

const NoticePeriodType: FC<INoticePeriodTypeProps> = ({
  value,
  handleChange,
}) => (
  <Select value={value} onChange={handleChange}>
    {NOTICE_PERIOD_TYPES.map(({ label, value: optionValue, key }) => (
      <Option key={key} value={optionValue}>
        {label}
      </Option>
    ))}
  </Select>
);

interface IProps {
  user?: IUserDetail;
  isUpdateProfile?: boolean;
  isUpdateJobPreference?: boolean;
  profile?: ICandidateProfile;
  about?: IAboutCandidate;
  preference?: IJobPreferenceResponse;
  candidateData?: any;
}

const CandidateProfileForm: FC<IProps> = ({
  user,
  isUpdateProfile,
  isUpdateJobPreference,
  profile,
  about,
  preference,
  candidateData,
}) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const userRole = sessionStorage.getItem('user-role');
  const { JOB_TYPES, JOB_CATEGORIES } = useGetListData();
  const { LANGUAGES_LIST } = useGetLanguageList();
  const [form] = Form.useForm() as [FormInstance];
  const [isCurrentlyEmployed, setIsCurrentlyEmployed] = useState<boolean>(
    isUpdateProfile
      ? about?.isCurrentlyEmployed ??
          CANDIDATE_PROFILE_FORM.IS_CURRENT_EMPLOYED_INITIAL
      : CANDIDATE_PROFILE_FORM.IS_CURRENT_EMPLOYED_INITIAL
  );
  const [noticePeriodType, setNoticePeriodType] = useState<number>(
    isUpdateProfile
      ? about?.noticePeriodType ?? NOTICE_PERIOD_TYPES[0].value
      : NOTICE_PERIOD_TYPES[0].value
  );

  const {
    useRegisterCandidate,
    useUpdateCandidateProfile,
    useUpdateJobPreference,
  } = candidateService;
  const { register, loading: registerLoading } = useRegisterCandidate();
  const { edit, loading: editLoading } = useEditCandidate();
  const { update: updateProfile, loading: ProfileLoading } =
    useUpdateCandidateProfile();
  const { update: updatejobPreference, loading: PreferenceLoading } =
    useUpdateJobPreference();

  const setUserValues = useCallback(() => {
    form.setFieldsValue({
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      phoneNumber: user?.phoneNumber ?? '',
    });
  }, [form, user]);

  const setProfileValues = useCallback(() => {
    const values = {
      addressLine1: profile?.addressLine1,
      addressLine2: profile?.addressLine2,
      city: profile?.city,
      county: profile?.county,
      postcode: profile?.postcode,
      country: profile?.country,
      languages: about?.languages,
      isCurrentlyEmployed: about?.isCurrentlyEmployed,
    };

    form.setFieldsValue(
      about?.isCurrentlyEmployed
        ? {
            ...values,
            currentSalary: about?.currentSalary,
            noticePeriodTime: about?.noticePeriodTime,
            noticePeriodType: about?.noticePeriodType,
            reasonForLeaving: about?.reasonForLeaving,
          }
        : { ...values }
    );
  }, [form, profile, about]);

  const setJobPreferenceValues = useCallback(() => {
    form.setFieldsValue({
      categories: preference?.categories,
      desiredSalary: preference?.desiredSalary,
      jobTypes: preference?.jobTypes,
      relocation: preference?.relocation,
      canAdminApply: preference?.canAdminApply,
    });
  }, [form, preference]);

  const setFormValues = useCallback(() => {
    if (
      (user && user.role === USER_ROLE.CANDIDATE_SIGN_UP) ||
      USER_ROLE.CANDIDATE
    ) {
      setUserValues();
    }
    if (isUpdateProfile && user?.role === USER_ROLE.CANDIDATE) {
      setProfileValues();
    }
    if (isUpdateJobPreference) {
      setJobPreferenceValues();
    }
  }, [
    user,
    isUpdateProfile,
    setUserValues,
    setProfileValues,
    setJobPreferenceValues,
    isUpdateJobPreference,
  ]);

  useEffect(() => {
    setFormValues();
  }, [form, setFormValues]);
  useEffect(() => {
    if (id) {
      form.setFieldsValue({
        firstName: candidateData?.firstName,
        lastName: candidateData?.lastName,
        email: candidateData?.email,
        phoneNumber: candidateData?.phoneNumber,
        addressLine1: candidateData?.candidateProfile?.addressLine1,
        addressLine2: candidateData?.candidateProfile?.addressLine2,
        city: candidateData?.candidateProfile?.city,
        county: candidateData?.candidateProfile?.county,
        postcode: candidateData?.candidateProfile?.postcode,
        country: candidateData?.candidateProfile?.country,
        languages: candidateData?.aboutCandidate?.languages,
        currentSalary: candidateData?.aboutCandidate?.currentSalary,
        noticePeriodTime: candidateData?.aboutCandidate?.noticePeriodTime,
        noticePeriodType: candidateData?.aboutCandidate?.noticePeriodType,
        reasonForLeaving: candidateData?.aboutCandidate?.reasonForLeaving,
        categories: candidateData?.jobPreference?.categories,
        desiredSalary: candidateData?.jobPreference?.desiredSalary,
        jobTypes: candidateData?.jobPreference?.jobTypes,
        canAdminApply: candidateData?.jobPreference?.canAdminApply,
        relocation: candidateData?.jobPreference?.relocation,
      });
    }
  }, [candidateData, id]);

  const initialValues: ICandidateRegistration = {
    ...CANDIDATE_PROFILE_FORM.INITIAL_VALUES,
    languages: [],
    currentSalary: SALARY_RANGE_LIST[0].value,
    desiredSalary: SALARY_RANGE_LIST[0].value,
    jobTypes: [JOB_TYPES[0]?.value, JOB_TYPES[2]?.value],
    canAdminApply: false,
    relocation: RELOCATION_LIST[0].value,
  };

  const onCurrentlyEmployed = () =>
    setIsCurrentlyEmployed(!isCurrentlyEmployed);

  const onNotciePeriodType = (valueArg: number) =>
    setNoticePeriodType(valueArg);

  const cvFileValidator = ({ getFieldValue }: any) => ({
    validator(_: any, value: UploadChangeParam | undefined) {
      if (
        (value && isValidFile(value.fileList)) ||
        (getFieldValue(CANDIDATE_PROFILE_FORM.UPLOAD_CV_LATER.NAME) ===
          CANDIDATE_PROFILE_FORM.REQUIRED &&
          !value)
      ) {
        return Promise.resolve();
      }
      if (id && !value) {
        return Promise.resolve();
      }
      return Promise.reject(
        new Error(CANDIDATE_PROFILE_FORM.CV_FILE.ERROR_MESSAGE)
      );
    },
  });

  const checkboxValidator = () => ({
    validator({ field }: any, value: boolean) {
      if (value) {
        return Promise.resolve();
      }
      return Promise.reject(
        new Error(
          field === CANDIDATE_PROFILE_FORM.WORK_RIGHT.NAME
            ? CANDIDATE_PROFILE_FORM.WORK_RIGHT.ERROR_MESSAGE
            : CANDIDATE_PROFILE_FORM.TERMS_CONDITION.ERROR_MESSAGE
        )
      );
    },
  });

  const onValuesChange = (field: any) => {
    const key = Object.keys(field)[0];

    if (
      key === CANDIDATE_PROFILE_FORM.UPLOAD_CV_LATER.NAME &&
      field[key] === CANDIDATE_PROFILE_FORM.REQUIRED
    ) {
      form.validateFields([CANDIDATE_PROFILE_FORM.CV_FILE.NAME]);
    }
  };

  const getRegistrationVariables = (
    args: ICandidateRegistrationVariableArgs,
    userArgs: IUserArgs,
    profileArgs: ICandidateProfile,
    aboutArgs: IAboutCandidateArgs
  ) => {
    const {
      jobTypes,
      desiredSalary,
      categories,
      relocation,
      cv,
      canAdminApply,
    } = args;
    const jobPreferenceArgs: IJobPreference = {
      jobTypes,
      desiredSalary,
      categories,
      relocation,
      canAdminApply,
    };

    return {
      userArgs,
      profileArgs,
      aboutArgs,
      jobPreferenceArgs,
      userId: user?.id,
      cv: cv && cv.fileList.length > 0 ? cv.fileList[0]?.originFileObj : null,
    };
  };

  const getVariables = (values: ICandidateRegistration) => {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      addressLine1,
      addressLine2,
      city,
      county,
      postcode,
      country,
      languages,
      reasonForLeaving,
      currentSalary,
      noticePeriodTime,
      hasWorkRight,
      ...args
    } = values;

    const userArgs: IUserArgs = {
      firstName,
      lastName,
      email,
      phoneNumber,
    };
    const profileArgs: ICandidateProfile = {
      addressLine1,
      addressLine2,
      city,
      county,
      postcode,
      country,
    };
    const aboutArgs: IAboutCandidateArgs = isCurrentlyEmployed
      ? {
          languages,
          isCurrentlyEmployed,
          reasonForLeaving,
          currentSalary,
          noticePeriodType,
          noticePeriodTime: Number(noticePeriodTime),
          hasWorkRight,
        }
      : { languages, isCurrentlyEmployed, hasWorkRight };

    if (user?.role === USER_ROLE.CANDIDATE_SIGN_UP) {
      return getRegistrationVariables(args, userArgs, profileArgs, aboutArgs);
    }
    if (user?.role === USER_ROLE.CANDIDATE && isUpdateProfile) {
      const { id, role, ..._user } = user;
      const { hasWorkRight: _, ..._aboutArgs } = getDifferentObjectValues(
        about,
        aboutArgs
      );

      return {
        userInfoArgs: getDifferentObjectValues(_user, userArgs),
        profileArgs: getDifferentObjectValues(profile, profileArgs),
        aboutArgs: _aboutArgs,
        userId: user.id,
      };
    }
    return {};
  };

  function mapCategoryValueToLabel(selectedValue: any) {
    const selectedCategory = JOB_CATEGORIES.find(
      (category: { value: any }) => category.value === selectedValue
    );
    return selectedCategory ? selectedCategory.label : JOB_CATEGORIES[0].label;
  }
  function mapJobTypeValueToLabel(selectedValue: any) {
    const selectedCategory = JOB_TYPES.find(
      (jobType: { value: any }) => jobType.value === selectedValue
    );
    return selectedCategory ? selectedCategory.label : JOB_TYPES[0].label;
  }
  const registerCandidate = async (values: any) => {
    const categoryLabel = mapCategoryValueToLabel(values.category);
    const jobTypeLabel = mapJobTypeValueToLabel(values.jobType);

    const modifiedValues = {
      ...values,
      categories: categoryLabel,
      jobTypes: jobTypeLabel,
      canAdminApply: values.canAdminApply,
    };

    const { data } = await register({
      variables: getVariables(modifiedValues),
    });

    if (data) {
      sessionStorage.setItem(USER_ROLE_KEY, data.candidateRegistration.role);
      sessionStorage.setItem(API_TOKEN, data.candidateRegistration.token);
      navigate(APP_ROUTES.HOME);
    }
  };

  const editCandidate = async (values: any) => {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      addressLine1,
      addressLine2,
      city,
      county,
      postcode,
      country,
      languages,
      reasonForLeaving,
      currentSalary,
      noticePeriodTime,
      hasWorkRight,
      categories,
      desiredSalary,
      jobTypes,
      relocation,
      cv,
      canAdminApply,
      ...args
    } = values;
    const userArgs = {
      firstName,
      lastName,
      email,
      phoneNumber,
    };
    const profileArgs = {
      addressLine1,
      addressLine2,
      city,
      county,
      postcode,
      country,
    };
    const jobPreferenceArgs = {
      categories,
      desiredSalary,
      jobTypes,
      relocation,
      canAdminApply,
    };
    const aboutArgs = isCurrentlyEmployed
      ? {
          languages,
          isCurrentlyEmployed,
          reasonForLeaving,
          currentSalary,
          noticePeriodType,
          noticePeriodTime: Number(noticePeriodTime),
          hasWorkRight,
        }
      : { languages, isCurrentlyEmployed, hasWorkRight };
    await edit({
      variables: {
        userArgs,
        profileArgs,
        aboutArgs,
        jobPreferenceArgs,
        cv: cv && cv.fileList.length > 0 ? cv.fileList[0]?.originFileObj : null,
        userId: candidateData.id,
      },
      refetchQueries: [
        {
          query: CANDIDATE_DETAIL_FOR_ADMIN,
          variables: { candidateId: Number(id) },
        },
      ],
    })
      .then((res) =>
        getSuccessResponse(res?.data?.editCandidateByAdmin?.message)
      )
      .catch((error) => {
        getErrorResponse(error?.message);
      });
  };

  function mapValuesToLabels(selectedValues: any, options: any) {
    const labels = selectedValues.map((value: any) => {
      const selectedOption = options.find(
        (option: any) => option.value === value
      );
      const selectLabel = selectedOption ? selectedOption.label : '';
      return selectLabel;
    });
    return labels;
  }

  const onUpdateProfile = async (values: any) => {
    const languageLabel = mapValuesToLabels(values.languages, LANGUAGES_LIST);
    const modifyValues = {
      ...values,
      languages: languageLabel,
    };
    await updateProfile({
      variables: getVariables(modifyValues),
      refetchQueries: [GET_CANDIDATE_PROFILE],
    })
      .then((res) =>
        getSuccessResponse(res?.data?.updateCandidateProfile?.message)
      )
      .catch((error) => {
        getErrorResponse(error?.message);
      });
  };

  const onUpdateJobPreference = async (values: IJobPreferenceResponse) => {
    if (preference) {
      const { id, ..._preference } = preference;
      const categoryLabels = mapValuesToLabels(
        values.categories,
        JOB_CATEGORIES
      );
      const jobTypeLabels = mapValuesToLabels(values.jobTypes, JOB_TYPES);

      const jobPreferenceArgs = {
        jobPreferenceId: id,
        jobPreferenceArgs: {
          ...getDifferentObjectValues(_preference, values),
          categories: categoryLabels,
          jobTypes: jobTypeLabels,
        },
      };
      const { data } = await updatejobPreference({
        variables: jobPreferenceArgs,
        refetchQueries: [GET_CANDIDATE_JOB_PREFERENCE],
      });

      if (data) {
        Notification({
          type: 'success',
          message: data?.updateJobPreference?.message,
        });
      }
    }
  };

  const handleRegisterCandidate = (values: any) => {
    try {
      if (id) {
        editCandidate(values);
      }
      if (user?.role === USER_ROLE.CANDIDATE_SIGN_UP) {
        registerCandidate(values);
      } else if (user?.role === USER_ROLE.CANDIDATE && isUpdateProfile) {
        onUpdateProfile(values);
      } else if (isUpdateJobPreference) {
        onUpdateJobPreference(values);
      }
    } catch (error: any) {
      Notification({ type: 'error', message: error?.message });
    }
  };

  if (registerLoading || ProfileLoading || PreferenceLoading || editLoading) {
    return <Loader />;
  }

  return (
    <StyledForm
      name={CANDIDATE_PROFILE_FORM.FORM_NAME}
      form={form}
      initialValues={initialValues}
      validateMessages={validateMessage()}
      onFinish={handleRegisterCandidate}
      onValuesChange={onValuesChange}
    >
      {!isUpdateJobPreference && (
        <>
          <h2 className='sub-heading margin0'>
            {!id && 'Your Contact'} Details
          </h2>
          {id && <hr className='candidate-hr' />}
          <InputWrapper
            label={CANDIDATE_PROFILE_FORM.FIRST_NAME.LABEL}
            name={CANDIDATE_PROFILE_FORM.FIRST_NAME.NAME}
            rules={[
              {
                required: CANDIDATE_PROFILE_FORM.REQUIRED,
                max: CANDIDATE_PROFILE_FORM.FIRST_NAME.MAX,
              },
            ]}
          />
          <InputWrapper
            label={CANDIDATE_PROFILE_FORM.LAST_NAME.LABEL}
            name={CANDIDATE_PROFILE_FORM.LAST_NAME.NAME}
            rules={[
              {
                required: CANDIDATE_PROFILE_FORM.REQUIRED,
                max: CANDIDATE_PROFILE_FORM.LAST_NAME.MAX,
              },
            ]}
          />
          <InputWrapper
            label={CANDIDATE_PROFILE_FORM.EMAIL.LABEL}
            name={CANDIDATE_PROFILE_FORM.EMAIL.NAME}
            rules={[
              {
                required: CANDIDATE_PROFILE_FORM.REQUIRED,
                type: CANDIDATE_PROFILE_FORM.EMAIL.TYPE,
                max: CANDIDATE_PROFILE_FORM.EMAIL.MAX,
              },
            ]}
            isDisabled={id !== undefined}
          />
          <InputWrapper
            label={CANDIDATE_PROFILE_FORM.PHONE_NUMBER.LABEL}
            name={CANDIDATE_PROFILE_FORM.PHONE_NUMBER.NAME}
            rules={[
              {
                required: CANDIDATE_PROFILE_FORM.REQUIRED,
                pattern: new RegExp(
                  CANDIDATE_PROFILE_FORM.PHONE_NUMBER.PATTERN
                ),
                message: CANDIDATE_PROFILE_FORM.PHONE_NUMBER.ERROR_MESSAGE,
              },
            ]}
          />
          <InputWrapper
            label={CANDIDATE_PROFILE_FORM.ADDRESS1.LABEL}
            name={CANDIDATE_PROFILE_FORM.ADDRESS1.NAME}
            rules={[
              {
                required: CANDIDATE_PROFILE_FORM.REQUIRED,
                max: CANDIDATE_PROFILE_FORM.ADDRESS1.MAX,
              },
            ]}
          />
          <InputWrapper
            label={CANDIDATE_PROFILE_FORM.ADDRESS2.LABEL}
            name={CANDIDATE_PROFILE_FORM.ADDRESS2.NAME}
            rules={[{ max: CANDIDATE_PROFILE_FORM.ADDRESS2.MAX }]}
          />
          <InputWrapper
            label={CANDIDATE_PROFILE_FORM.CITY.LABEL}
            name={CANDIDATE_PROFILE_FORM.CITY.NAME}
            rules={[
              {
                required: CANDIDATE_PROFILE_FORM.REQUIRED,
                max: CANDIDATE_PROFILE_FORM.CITY.MAX,
              },
            ]}
          />
          <InputWrapper
            label={CANDIDATE_PROFILE_FORM.COUNTY.LABEL}
            name={CANDIDATE_PROFILE_FORM.COUNTY.NAME}
            rules={[
              {
                required: CANDIDATE_PROFILE_FORM.REQUIRED,
                max: CANDIDATE_PROFILE_FORM.COUNTY.MAX,
              },
            ]}
          />
          <InputWrapper
            label={CANDIDATE_PROFILE_FORM.POSTCODE.LABEL}
            name={CANDIDATE_PROFILE_FORM.POSTCODE.NAME}
            rules={[
              {
                required: CANDIDATE_PROFILE_FORM.REQUIRED,
                max: CANDIDATE_PROFILE_FORM.POSTCODE.MAX,
              },
            ]}
          />
          <InputWrapper
            label={CANDIDATE_PROFILE_FORM.COUNTRY.LABEL}
            name={CANDIDATE_PROFILE_FORM.COUNTRY.NAME}
            rules={[
              {
                required: CANDIDATE_PROFILE_FORM.REQUIRED,
                max: CANDIDATE_PROFILE_FORM.COUNTRY.MAX,
              },
            ]}
            isDisabled
          />

          <h2 className='sub-heading margin0'>
            About
            {!id && 'You'}
          </h2>
          {id && <hr className='candidate-hr' />}
          <SelectField
            options={LANGUAGES_LIST}
            label={CANDIDATE_PROFILE_FORM.LANGUAGES.LABEL}
            name={CANDIDATE_PROFILE_FORM.LANGUAGES.NAME}
            mode={CANDIDATE_PROFILE_FORM.LANGUAGES.MODE}
            formItemClassName={
              CANDIDATE_PROFILE_FORM.CLASS_NAME.PROFILE_FORM_ITEM
            }
            rules={[{ required: CANDIDATE_PROFILE_FORM.REQUIRED }]}
          />
          <FormItemWrapper
            name={CANDIDATE_PROFILE_FORM.IS_CURRENTLY_EMPLOYED.NAME}
            label={CANDIDATE_PROFILE_FORM.IS_CURRENTLY_EMPLOYED.LABEL}
          >
            <Checkbox
              checked={isCurrentlyEmployed}
              onChange={onCurrentlyEmployed}
            />
          </FormItemWrapper>
        </>
      )}

      {isCurrentlyEmployed && !isUpdateJobPreference && (
        <>
          <InputWrapper
            label={CANDIDATE_PROFILE_FORM.NOTICE_PERIOD.LABEL}
            name={CANDIDATE_PROFILE_FORM.NOTICE_PERIOD.NAME}
            addOnAfter={
              <NoticePeriodType
                value={noticePeriodType}
                handleChange={onNotciePeriodType}
              />
            }
            rules={[{ required: CANDIDATE_PROFILE_FORM.REQUIRED }]}
          />
          <SelectField
            options={SALARY_RANGE_LIST}
            label={CANDIDATE_PROFILE_FORM.CURRENT_SALARY.LABEL}
            name={CANDIDATE_PROFILE_FORM.CURRENT_SALARY.NAME}
            formItemClassName={
              CANDIDATE_PROFILE_FORM.CLASS_NAME.PROFILE_FORM_ITEM
            }
            rules={[
              {
                required: CANDIDATE_PROFILE_FORM.REQUIRED,
                max: CANDIDATE_PROFILE_FORM.CURRENT_SALARY.MAX,
              },
            ]}
          />
          <TextAreaField
            label={CANDIDATE_PROFILE_FORM.LEAVING_REASON.LABEL}
            name={CANDIDATE_PROFILE_FORM.LEAVING_REASON.NAME}
            rows={CANDIDATE_PROFILE_FORM.LEAVING_REASON.ROW}
            rules={[
              {
                max: CANDIDATE_PROFILE_FORM.LEAVING_REASON.MAX,
              },
            ]}
          />
        </>
      )}

      {!id && !isUpdateProfile && !isUpdateJobPreference && (
        <CheckboxField
          label={CANDIDATE_PROFILE_FORM.WORK_RIGHT.LABEL}
          name={CANDIDATE_PROFILE_FORM.WORK_RIGHT.NAME}
          title={CANDIDATE_PROFILE_FORM.WORK_RIGHT.TITLE}
          className='work-right'
          rules={[checkboxValidator]}
        />
      )}

      {(!isUpdateProfile || isUpdateJobPreference) && (
        <>
          <h2 className='sub-heading margin0'>
            What are {id ? 'Candidate' : 'you'} looking for?
          </h2>
          {id && <hr className='candidate-hr' />}
          <CheckboxGroupField
            label={CANDIDATE_PROFILE_FORM.JOB_TYPE.LABEL}
            name={CANDIDATE_PROFILE_FORM.JOB_TYPE.NAME}
            options={JOB_TYPES}
            helpMessage={CANDIDATE_PROFILE_FORM.JOB_TYPE.HELP_MESSAGE}
            rules={[{ required: CANDIDATE_PROFILE_FORM.REQUIRED }]}
          />
          <SelectField
            options={SALARY_RANGE_LIST}
            label={CANDIDATE_PROFILE_FORM.DESIRED_SALARY.LABEL}
            name={CANDIDATE_PROFILE_FORM.DESIRED_SALARY.NAME}
            formItemClassName={
              CANDIDATE_PROFILE_FORM.CLASS_NAME.PROFILE_FORM_ITEM
            }
          />
          <SelectField
            options={RELOCATION_LIST}
            label={CANDIDATE_PROFILE_FORM.RELOCATION.LABEL}
            name={CANDIDATE_PROFILE_FORM.RELOCATION.NAME}
            formItemClassName={
              CANDIDATE_PROFILE_FORM.CLASS_NAME.PROFILE_FORM_ITEM
            }
          />
          <SelectField
            options={JOB_CATEGORIES}
            label={CANDIDATE_PROFILE_FORM.JOB_CATEGORY.LABEL}
            name={CANDIDATE_PROFILE_FORM.JOB_CATEGORY.NAME}
            mode={CANDIDATE_PROFILE_FORM.JOB_CATEGORY.MODE}
            formItemClassName={
              CANDIDATE_PROFILE_FORM.CLASS_NAME.PROFILE_FORM_ITEM
            }
            helpMessage={CANDIDATE_PROFILE_FORM.JOB_CATEGORY.HELP_MESSAGE}
            rules={[
              {
                required: CANDIDATE_PROFILE_FORM.REQUIRED,
                message: CANDIDATE_PROFILE_FORM.JOB_CATEGORY.ERROR_MESSAGE,
              },
            ]}
          />
          <CheckboxField
            label={CANDIDATE_PROFILE_FORM.PERMISSION_TO_ADMIN.LABEL}
            name={CANDIDATE_PROFILE_FORM.PERMISSION_TO_ADMIN.NAME}
            title={`${CANDIDATE_PROFILE_FORM.PERMISSION_TO_ADMIN.TITLE} ${
              !id ? 'on behalf of you ?':'?'
            }`}
            className='terms-condition'
            disabled={Number(userRole) === USER_ROLE.ADMIN}
          />
        </>
      )}

      {!isUpdateProfile && !isUpdateJobPreference && (
        <>
          <h2 className='sub-heading margin0'>
            {id ? 'Candidate' : 'Your'} CV
          </h2>
          {id && <hr className='candidate-hr' />}
          <UploadFileWrapper
            label={CANDIDATE_PROFILE_FORM.CV_FILE.LABEL}
            name={CANDIDATE_PROFILE_FORM.CV_FILE.NAME}
            helpMessage={CANDIDATE_PROFILE_FORM.CV_FILE.HELP_MESSAGE}
            maxCount={CANDIDATE_PROFILE_FORM.CV_FILE.MAX_COUNT}
            rules={[cvFileValidator]}
            className='file-upload'
          />
          {!id && (
            <CheckboxField
              name={CANDIDATE_PROFILE_FORM.UPLOAD_CV_LATER.NAME}
              title={CANDIDATE_PROFILE_FORM.UPLOAD_CV_LATER.TITLE}
              className='upload-cv-later'
            />
          )}
          {id && <hr className='candidate-hr' />}
          {!id && (
            <CheckboxField
              name={CANDIDATE_PROFILE_FORM.TERMS_CONDITION.NAME}
              title={CANDIDATE_PROFILE_FORM.TERMS_CONDITION.TITLE}
              className='terms-condition'
              rules={[checkboxValidator]}
              linkInTitle={
                <NavLink to='#'>
                  {CANDIDATE_PROFILE_FORM.TERMS_CONDITION.LINK_IN_TITLE}
                </NavLink>
              }
            />
          )}
        </>
      )}

      <ButtonWrapper htmlType='submit' className='success-btn'>
        {user?.role === USER_ROLE.CANDIDATE_SIGN_UP
          ? CANDIDATE_PROFILE_FORM.BUTTON.CONTINUE
          : CANDIDATE_PROFILE_FORM.BUTTON.SAVE}
      </ButtonWrapper>
    </StyledForm>
  );
};

CandidateProfileForm.defaultProps = {
  isUpdateProfile: !CANDIDATE_PROFILE_FORM.UPDATE,
  isUpdateJobPreference: !CANDIDATE_PROFILE_FORM.UPDATE,
  profile: CANDIDATE_PROFILE_FORM.UNDEFINED,
  about: CANDIDATE_PROFILE_FORM.UNDEFINED,
  user: CANDIDATE_PROFILE_FORM.UNDEFINED,
  preference: CANDIDATE_PROFILE_FORM.UNDEFINED,
  candidateData: CANDIDATE_PROFILE_FORM.UNDEFINED,
};

export default CandidateProfileForm;
