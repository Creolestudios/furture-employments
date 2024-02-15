import React, { useEffect, useState } from 'react';
import { Button, Cascader, Form } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { useQuery } from '@apollo/client';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { UploadChangeParam } from 'antd/es/upload';
import SelectField from '../common/formElements/SelectField';
import InputNumberField from '../common/formElements/InputNumberField';
import CheckboxField from '../common/formElements/CheckboxField';
import TextAreaField from '../common/formElements/TextAreaField';
import FormPageWrapper from '../../styles/formContainer';
import InputWrapper from '../common/formElements/inputWrapper';
import CheckboxGroupField from '../common/formElements/CheckboxGroupField';
import { PAGE_NO, PAGE_SIZE, SELECT_CURRENCY } from '../../constants';
import FORM_VALIDATION_MESSAGE from '../../constants/validationMessage';
import Notification from '../common/Notification';
import { USER_NAME } from '../../graphql/queries/users/UserQueries';
import UploadFileWrapper from '../common/formElements/upload';
import appRoutes from '../../constants/appRoutes';
import {
  VACANCIES_DETAILS,
  VACANCIES_LIST,
} from '../../graphql/queries/vacancies';
import {
  useNewVacancyService,
  useUpdateVacancyService,
} from '../../services/vacancies/vacancyService';
import { isValidFile } from '../../utils';
import { useGetListData } from '../../services/constantDataService';

const VacancyForm = () => {
  const { id } = useParams();
  const path = useLocation();
  const navigate = useNavigate();
  const [vacancyForm] = Form.useForm();
  const [userDetails, setUserDetails] = useState<any>({});
  const [currency, setCurrency] = useState<string[]>(['£']);
  const [data, setData] = useState<any>();
  const { data: userData } = useQuery(USER_NAME);
  const { JOB_TYPES, JOB_CATEGORIES } = useGetListData();
  const { newVacancy } = useNewVacancyService();
  const { editVacancy } = useUpdateVacancyService();
  const { data: vacancyData } = useQuery(VACANCIES_DETAILS, {
    variables: { vacancyId: Number(id) },
    skip: !id,
  });
  const user = userDetails?.getUserDetails;

  function mapCategoryValueToLabel(selectedValue: any) {
    const selectedCategory = JOB_CATEGORIES.find(
      (category: { value: any }) => category.value === selectedValue,
    );
    return selectedCategory ? selectedCategory.label : JOB_CATEGORIES[0].label;
  }
  function mapJobsValueToLabel(SelectField: any) {
    const selectedType = JOB_TYPES.find(
      (type: { value: any }) => type.value === SelectField,
    );
    return selectedType ? selectedType.label : JOB_TYPES[0].label;
  }

  const onFinish = (values: any) => {
    const payload = {
      type: values.type,
      category: mapCategoryValueToLabel(values.category),
      description: values.description ?? '',
      hideSalary: values.hideSalary ?? false,
      position: values.position,
      salary: values.salary2
        ? String(`${currency}${values.salary} - ${currency}${values.salary2}`)
        : String(`${currency}${values.salary}`),
      weeklyHours: values.weeklyHours,
      workLocation: values.workLocation,
    };

    if (path.pathname === appRoutes.SUBMIT_VACANCY) {
      const createVacancy = async () => {
        let uploadFile;
        let additionalFile;
        if (values.desc_file) {
          if (values.desc_file.fileList.length > 0) {
            uploadFile = values.desc_file?.fileList[0].originFileObj;
          } else {
            uploadFile = null;
          }
        } else {
          uploadFile = null;
        }
        if (values.additional_file) {
          if (values.additional_file.fileList.length > 0) {
            additionalFile = values.additional_file?.fileList[0].originFileObj;
          } else {
            additionalFile = null;
          }
        } else {
          additionalFile = null;
        }
        await newVacancy({
          variables: {
            ...payload,
            userId: Number(user?.id),
            upload_file: uploadFile,
            additional_file: additionalFile,
          },
          refetchQueries: [
            {
              query: VACANCIES_LIST,
              variables: {
                userId: Number(user?.id),
                searchParams: {
                  q: '',
                  current: PAGE_NO,
                  pageSize: PAGE_SIZE,
                },
              },
            },
          ],
        })
          .then((res) => {
            Notification({
              type: 'success',
              message: res.data.newVacancy.message,
            });
            navigate(
              `${appRoutes.VACANCY_DETAILS}/${res.data.newVacancy.vacancyId}`,
            );
          })
          .catch((error) => {
            Notification({ type: 'error', message: error.message });
          });
      };
      if (values.description || values.desc_file.fileList.length > 0) {
        createVacancy();
      } else {
        Notification({
          type: 'error',
          message:
            'You must upload a job description file or type a description.',
        });
      }
    }
    if (path.pathname !== appRoutes.SUBMIT_VACANCY) {
      const updateVacancy = async () => {
        await editVacancy({
          variables: {
            vacancyDto: {
              ...payload,
            },
            vacancyId: Number(id),
          },
          refetchQueries: [VACANCIES_DETAILS, VACANCIES_LIST],
        })
          .then((res) => {
            Notification({
              type: 'success',
              message: res.data.updateVacancy.message,
            });
            navigate(`${appRoutes.VACANCY_DETAILS}/${id}`);
          })
          .catch((error) => {
            Notification({ type: 'error', message: error.message });
          });
      };
      updateVacancy();
    }
  };
  const [rangeActive, setRangeActive] = useState(false);
  const validateSalary2 = (_: any, value: any) => {
    const salary = vacancyForm.getFieldValue('salary');
    if (rangeActive && value <= Number(salary.split(',').join(''))) {
      return Promise.reject(new Error('Salary must be in ascending range'));
    }
    if (value === 0) {
      return Promise.reject(new Error(FORM_VALIDATION_MESSAGE.SALARY));
    }
    return Promise.resolve();
  };
  const validateSalary1 = (_: any, value: any) => {
    if (value === 0) {
      return Promise.reject(new Error(FORM_VALIDATION_MESSAGE.SALARY));
    }
    return Promise.resolve();
  };
  const validateHours = (_: any, value: any) => {
    if (value === 0) {
      return Promise.reject(
        new Error(FORM_VALIDATION_MESSAGE.CONTRACTED_HOURS),
      );
    }
    return Promise.resolve();
  };
  const onChange = () => {
    if (vacancyForm.getFieldValue('range_salary')) {
      setRangeActive(true);
    } else {
      setRangeActive(false);
    }
  };
  const cvFileValidator = () => ({
    validator(_: any, value: UploadChangeParam | undefined) {
      if (value && isValidFile(value.fileList)) {
        return Promise.resolve();
      }
      if (value && value.fileList.length === 0) {
        return Promise.resolve();
      }
      if (vacancyForm.getFieldValue('description')) {
        if (value && !isValidFile(value.fileList)) {
          return Promise.reject(
            new Error(
              'Upload pdf/document file or enter job description below.',
            ),
          );
        }
        return Promise.resolve();
      }
      return Promise.reject(
        new Error('Upload pdf/document file or enter job description below.'),
      );
    },
  });
  useEffect(() => {
    setUserDetails(userData);
  }, [userData]);
  useEffect(() => {
    setData(vacancyData);
  }, [vacancyData]);
  useEffect(() => {
    if (!id) vacancyForm.resetFields();
  }, [id]);
  useEffect(() => {
    if (path.pathname !== appRoutes.SUBMIT_VACANCY) {
      setCurrency([`${data?.vacancyDetails?.salary[0]}`]);
    }
    vacancyForm.setFieldsValue(data?.vacancyDetails);
    const types: any = [];
    if (data?.vacancyDetails?.type) {
      data?.vacancyDetails?.type.forEach((item: any) => {
        types.push(item);
      });
    }
    vacancyForm.setFieldValue('type', types);
    vacancyForm.setFieldValue('description', data?.vacancyDetails.description);
    vacancyForm.setFieldValue('category', data?.vacancyDetails.category);
  }, [data]);

  useEffect(() => {
    if (data?.vacancyDetails?.salary) {
      const split = data?.vacancyDetails?.salary.split(' -');
      const currencyRegex = new RegExp(`\\${currency[0]}`, 'g');
      vacancyForm.setFieldValue('salary', split[0].replace(currencyRegex, ''));
      if (split[1]) {
        vacancyForm.setFieldValue('range_salary', true);
        setRangeActive(true);
        vacancyForm.setFieldValue(
          'salary2',
          split[1].replace(currencyRegex, ''),
        );
      }
    }
  }, [currency]);
  return (
    <FormPageWrapper>
      <div className='page-header'>
        <h1>{id ? 'Update Vacancy Details' : 'Submit a vacancy'}</h1>
        {id && (
          <div
            className='vacancy-link'
            onClick={() => navigate(`${appRoutes.VACANCY_DETAILS}/${id}`)}
            onKeyDown={() => navigate(`${appRoutes.VACANCY_DETAILS}/${id}`)}
            role='button'
            tabIndex={0}
          >
            Back to vacancy details
          </div>
        )}
      </div>
      <Form
        name='basic'
        form={vacancyForm}
        labelCol={{ span: 5 }}
        // wrapperCol={{ span: 12, flex: 'none' }}
        style={{ maxWidth: 900 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete='off'
        requiredMark={false}
        onChange={onChange}
        className='vacancy-form'
      >
        <InputWrapper
          label='Position'
          name='position'
          rules={[
            { message: FORM_VALIDATION_MESSAGE.POSITION, required: true },
          ]}
        />
        {!id && (
          <>
            <UploadFileWrapper
              name='desc_file'
              label='Job Description'
              maxCount={1}
              accept='.pdf,.docx'
              rules={[cvFileValidator]}
              className='file-upload'
            />
            <p className='field-sub'>
              Please upload job descriptions in Word, Open Document or PDF
              format.
            </p>
            <p className='field-sub' style={{ fontWeight: '500' }}>
              Or you can type the description below.
            </p>
          </>
        )}
        <TextAreaField
          rows={6}
          name='description'
          label={id && 'Job Description'}
          className={!id && 'no-label'}
        />
        {id && (
          <p className='field-sub' style={{ color: '#555555' }}>
            Optional. If you have already uploaded a job description file, you
            do not need to type a description.
          </p>
        )}
        <>
          <UploadFileWrapper
            name='additional_file'
            label='Additional Documents'
            maxCount={1}
            accept='.pdf,.docx'
            className='file-upload'
          />
          <p className='field-sub'>
            Please add any further documents that may add value, for example
            Benefits Packages or Company Values
          </p>
        </>
        <InputWrapper
          label='Location of Work'
          name='workLocation'
          rules={[
            {
              message: FORM_VALIDATION_MESSAGE.WORK_LOCATION,
              required: true,
            },
          ]}
        />
        <CheckboxGroupField
          label='Job Type'
          name='type'
          options={JOB_TYPES}
          rules={[
            { message: FORM_VALIDATION_MESSAGE.JOB_TYPE, required: true },
          ]}
        />
        <p className='field-sub' style={{ color: '#555555' }}>
          Choose all that apply.
        </p>
        <SelectField
          options={JOB_CATEGORIES}
          defaultValue={
            JOB_CATEGORIES.length > 0
              ? JOB_CATEGORIES[0].label
              : 'Select a category'
          }
          label='Job Category'
          name='category'
        />
        <div className='salary'>
          <InputNumberField
            type='text'
            label='Salary'
            name='salary'
            formatter={(value: any) => {
              vacancyForm.setFieldValue(
                'salary',
                value.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
              );
              return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            }}
            addonBefore={(
              <Cascader
                style={{ width: 55 }}
                options={SELECT_CURRENCY}
                value={currency}
                changeOnSelect={false}
                dropdownClassName='currency-select'
                onChange={(e: any) => {
                  if (e) {
                    setCurrency(e[0]);
                  }
                }}
              />
            )}
            rules={[
              { message: FORM_VALIDATION_MESSAGE.SALARY, required: true },
              { validator: validateSalary1 },
            ]}
          />
          {rangeActive && (
            <>
              <span style={{ marginRight: '10px' }}>to</span>
              <InputNumberField
                name='salary2'
                type='text'
                formatter={(value: any) => {
                  vacancyForm.setFieldValue(
                    'salary2',
                    value.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                  );
                  return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                }}
                addonBefore={(
                  <Cascader
                    style={{ width: 55 }}
                    options={SELECT_CURRENCY}
                    value={currency}
                    changeOnSelect={false}
                    onChange={(e: any) => {
                      if (e) {
                        setCurrency(e[0]);
                      }
                    }}
                  />
                )}
                className='salary2'
                rules={[{ validator: validateSalary2 }]}
              />
            </>
          )}
          <CheckboxField
            name='range_salary'
            title='Range'
            className='range-checkbox'
            onChange={() => setRangeActive(!rangeActive)}
          />
        </div>
        <CheckboxField
          name='hideSalary'
          label='Hide Salary'
          valuePropName='hide_salary'
          // wrapperCol={{ span: 16 }}
          title=''
        />
        <p className='field-sub' style={{ color: '#555555' }}>
          Indicates that the salary should not be disclosed on any public
          campaigns.
        </p>
        <InputNumberField
          label='Contracted Weekly Hours'
          name='weeklyHours'
          className='phoneNumber'
          rules={[
            {
              message: FORM_VALIDATION_MESSAGE.CONTRACTED_HOURS,
              required: true,
            },
            { validator: validateHours },
          ]}
        />
        <hr />
        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            icon={<CheckOutlined />}
            style={{ backgroundColor: '#6cb33f' }}
          >
            Submit Vacancy
          </Button>
          <span style={{ marginLeft: '15px' }}>
            <Button
              type='primary'
              htmlType='reset'
              className='reset'
              onClick={() => {
                navigate(appRoutes.VACANCIES);
              }}
            >
              Cancel
            </Button>
          </span>
        </Form.Item>
      </Form>
    </FormPageWrapper>
  );
};
export default VacancyForm;
