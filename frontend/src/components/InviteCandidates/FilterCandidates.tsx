import { Form } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import InputWrapper from '../common/formElements/inputWrapper';
import InputNumberField from '../common/formElements/InputNumberField';
import SelectField from '../common/formElements/SelectField';
import ButtonWrapper from '../common/formElements/buttonWrapper';
import ChipInput from '../common/formElements/chipInput/ChipInput';
import DebounceAndTagSelect from '../common/formElements/DebounceAndTagSelect';
import SearchFormWrapper from '../searchForm/index.style';

interface UrlSearchParams {
  [key: string]: any;
}
const FilterCandidates: React.FC<any> = ({
  fields,
  className,
  isReset,
  defaultFilters,
  setSearchFilters,
  setParamsList,
  isCandidate,
  parentOptions = [],
}) => {
  const [dependentChildOptions, setDependentChildOptions] = useState([]);
  const [form] = Form.useForm();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const urlSearchParam: UrlSearchParams = Object.fromEntries(
      searchParams.entries(),
    );
    Object.keys(urlSearchParam).forEach((x) => {
      if (typeof urlSearchParam[x] === 'string') {
        if (urlSearchParam[x].includes('~')) {
          urlSearchParam[x] = urlSearchParam[x].split('~');
        }
        if (x === 'pageSize') {
          urlSearchParam[x] = Number(urlSearchParam[x]);
        }
      }
    });
    form.setFieldsValue({ ...urlSearchParam });
    if (isCandidate) {
      if (form.getFieldValue('pageSize')) {
        setSearchFilters({
          ...defaultFilters,
          ...form.getFieldsValue(),
        });
      } else if (form.getFieldValue('sortBy')) {
        setSearchFilters({
          ...form.getFieldsValue(),
          ...defaultFilters,
          sortBy: form.getFieldValue('sortBy'),
        });
      } else {
        setSearchFilters({
          ...form.getFieldsValue(),
          ...defaultFilters,
        });
      }
    } else {
      setSearchFilters({ ...defaultFilters, ...form.getFieldsValue() });
    }
    if (setParamsList) setParamsList(urlSearchParam);
  }, []);

  const handleSearch = (values: any) => {
    const filterParams: any = {};
    fields.forEach((field: any) => {
      const fieldValue = values[field.name];

      if (fieldValue || values[field.name.parent] || values[field.name.child]) {
        switch (field.type) {
          case 'text':
            filterParams[field.name] = fieldValue;
            break;
          case 'number':
            if (field.typeRequired) {
              filterParams[field.name] = fieldValue;
            } else {
              filterParams[field.name] = String(fieldValue);
            }
            break;
          case 'select':
            filterParams[field.name] = fieldValue;
            break;
          case 'multiSelect':
            if (fieldValue.length > 0) {
              filterParams[field.name] = fieldValue;
            }
            break;
          case 'dependentSelect':
            filterParams[field.name.parent] = values[field.name.parent];
            if (values[field.name.child]) {
              filterParams[field.name.child] = values[field.name.child];
            }
            break;

          case 'chipInput':
            filterParams[field.name] = values[field.name];
            break;
          case 'debounce':
            if (fieldValue.length > 0) {
              filterParams[field.name] = fieldValue;
            }
            break;
          default:
            break;
        }
      }
    });
    if (setParamsList) setParamsList(filterParams);
    setSearchFilters({ ...defaultFilters, ...filterParams });
    Object.keys(filterParams).forEach((x) => {
      if (Array.isArray(filterParams[x])) {
        filterParams[x] = filterParams[x].join('~');
      }
    });
    setSearchParams({ ...filterParams });
  };
  const handleReset = () => {
    form.resetFields();
    form.setFieldsValue({
      sortBy: undefined,
      pageSize: undefined,
    });
    setSearchFilters(defaultFilters);
    setSearchParams({});
    if (setParamsList) setParamsList({});
  };

  const handleFilterChildOptions = (name: string) => {
    const countryId = form.getFieldValue(name);
    setDependentChildOptions(
      parentOptions
        && parentOptions.filter((info: any) => info.value === countryId)?.[0]?.city,
    );
  };

  return (
    <SearchFormWrapper className={className}>
      <Form form={form} onFinish={handleSearch}>
        {fields.map((field: any) => {
          switch (field.type) {
            case 'text':
              return (
                <div className={field.className} key={field.name}>
                  <InputWrapper
                    name={field.name}
                    placeholder={field.placeholder}
                    label={field.searchLabel}
                  />
                </div>
              );
            case 'number':
              return (
                <div className={field.className} key={field.name}>
                  <InputNumberField
                    label={field.searchLabel}
                    name={field.name}
                    addonBefore={field.addonBefore}
                    defaultValue={field.defaultValue}
                  />
                </div>
              );
            case 'select':
              return (
                <div className={field.className} key={field.name}>
                  <SelectField
                    defaultValue={field.defaultValue}
                    options={field.options}
                    label={field.searchLabel}
                    name={field.name}
                    mode={field.mode}
                  />
                </div>
              );
            case 'multiSelect':
              return (
                <div className={field.className} key={field.name}>
                  <SelectField
                    defaultValue={field.defaultValue}
                    options={field.options}
                    label={field.searchLabel}
                    name={field.name}
                    mode={field.mode}
                    placeholder={field.placeholder}
                  />
                </div>
              );
            case 'chipInput':
              return (
                <div className={field.className} key={field.name}>
                  <ChipInput
                    name={field.name}
                    form={form}
                    label={field.searchLabel}
                  />
                </div>
              );
            case 'dependentSelect':
              return (
                <div
                  className={`${field.dependentWrapperClass} code`}
                  key={field.name}
                >
                  <div className={field.className}>
                    <SelectField
                      defaultValue={field.defaultValue.parent}
                      options={parentOptions}
                      label={field.searchLabel.parent}
                      name={field.name.parent}
                      onSelect={() => handleFilterChildOptions(field.name.parent)}
                    />
                  </div>
                  <div className={field.className} key={field.name}>
                    <SelectField
                      defaultValue={field.defaultValue.child}
                      options={dependentChildOptions}
                      label={field.searchLabel.child}
                      name={field.name.child}
                      disabled={dependentChildOptions.length === 0 ?? true}
                    />
                  </div>
                </div>
              );
            case 'debounce':
              return (
                <div className={field.className} key={field.name}>
                  <DebounceAndTagSelect
                    name={field.name}
                    label={field.searchLabel}
                    placeholder={field.placeholder}
                    newOptions={field.options}
                    searchRecord={field.skill}
                  />
                </div>
              );
            default:
              return null;
          }
        })}

        <Form.Item className='search-submit'>
          <ButtonWrapper htmlType='submit'>Search</ButtonWrapper>
        </Form.Item>
        {isReset && (
          <Form.Item className='reset'>
            <ButtonWrapper htmlType='submit' onClick={handleReset}>
              Reset
            </ButtonWrapper>
          </Form.Item>
        )}
      </Form>
    </SearchFormWrapper>
  );
};

export default FilterCandidates;
