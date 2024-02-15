import React, { useEffect, useState } from 'react';
import {
  Button,
  DatePicker,
  DatePickerProps,
  Form,
  Radio,
  Tabs,
  TimePicker,
  Timeline,
} from 'antd';
import moment from 'moment';
import { CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekYear from 'dayjs/plugin/weekYear';
import ApplicationDetailWrapper from '../applicationDetails/ApplicationDetail.styles';
import PeoplesTable from '../adminTables/PeoplesTable';
import { PROSPECT_CLIENTS_STATUS, REMINDER_TYPES } from '../../constants';
import AddressTable from '../adminTables/AddressTable';
import SelectField from '../common/formElements/SelectField';
import ChipInput from '../common/formElements/chipInput/ChipInput';
import TextAreaField from '../common/formElements/TextAreaField';
import ButtonWrapper from '../common/formElements/buttonWrapper';
import {
  useCloseProspectClient,
  useConvertToClient,
  useProspectTimeline,
  useUpdateConvertedClient,
  useUpdateProspectClient,
} from '../../services/admin/adminService';
import Notification from '../common/Notification';
import {
  PROSPECT_CLIENT_DETAILS,
  PROSPECT_CLIENT_TIMELINE,
} from '../../graphql/queries/admin';
import ModalWrapper from '../common/modalWrapper';
import PeoplesTableModal from '../adminTables/PeoplesTableModal';
import AddressTableModal from '../adminTables/AddressTableModal';

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

const Notes = ({
  notesForm,
  handleReminderChange,
  noteEditable,
  notes,
  setNoteEditable,
}: any) => (
  <div className='reminder-div'>
    <Form form={notesForm} onFinish={handleReminderChange}>
      <h2 className='sub-heading'>Note</h2>
      {' '}
      {!noteEditable ? (
        <p
          style={
            notes !== ''
              ? {
                backgroundColor: 'rgb(229, 229, 229,0.2)',
                padding: '5px',
              }
              : {}
          }
        >
          {notes}
        </p>
      ) : (
        <div className='prospect-note'>
          <TextAreaField
            name='notes'
            label=''
            rows={4}
            className='prospect-note-field'
          />
        </div>
      )}
      {!notes && !noteEditable && <p>N/A</p>}
      {!noteEditable && (
        <div style={{ margin: '15px 0 15px 0' }}>
          <ButtonWrapper
            className='success-btn'
            onClick={() => setNoteEditable(true)}
          >
            {notes ? 'Update' : 'Add Note'}
          </ButtonWrapper>
        </div>
      )}
      {noteEditable && (
        <Form.Item className='btns'>
          <div style={{ display: 'flex', gap: '10px' }}>
            <ButtonWrapper htmlType='submit' className='success-btn'>
              Save
            </ButtonWrapper>
            <ButtonWrapper
              className='success-btn cancel'
              onClick={() => setNoteEditable(false)}
            >
              Cancel
            </ButtonWrapper>
          </div>
        </Form.Item>
      )}
    </Form>
  </div>
);

const ProspectClientDetail: React.FC<any> = ({
  id,
  description,
  status,
  companyName,
  address,
  people,
  notes,
  reminderNote,
  additionalEmails,
  reminderDate,
  reminderType,
  website,
  convertedEmail,
  user,
}) => {
  // const defaultFilters = {
  //   current: PAGE_NO,
  //   pageSize: PAGE_SIZE,
  //   sortBy: '',
  // };
  // const { paginationConfig } = usePagination({
  //   ...defaultFilters,
  // });
  const [editable, setEditable] = useState<any>(false);
  const [noteEditable, setNoteEditable] = useState<any>(false);
  const [timelineList, setTimelineList] = useState<any>([]);
  const [convertModal, setConvertModal] = useState<any>(false);
  const [tabChange, setTabChange] = useState<any>();
  const [convertPerson, setConvertPerson] = useState<any>({});
  const [convertAddress, setConvertAddress] = useState<any>({});
  const [deleted, setDeleted] = useState<any>('');
  const [changeDetails, setChangeDetails] = useState<any>(''); // before deleting person and address change details of converted
  const [statusForm] = Form.useForm();
  const [reminderForm] = Form.useForm();
  const [notesForm] = Form.useForm();
  const [date, setDate] = useState<any>('');
  const [time, setTime] = useState<any>('');
  const { loading, timeline } = useProspectTimeline(Number(id));
  const { updateProspectClient } = useUpdateProspectClient();
  const { convertToClient } = useConvertToClient();
  const { closeProspectClient } = useCloseProspectClient();
  const { updateConvertedClient } = useUpdateConvertedClient();
  const initialPeopleId = people
    && people.length > 0
    && people.filter((item: any) => item.converted)[0]?.id;
  const initialAddressId = address
    && address.length > 0
    && address.filter((item: any) => item.converted)[0]?.id;
  useEffect(() => {
    reminderForm.setFieldsValue({
      additionalEmails,
      reminderNote,
      status,
      reminderType,
      reminderDate: dayjs(moment(reminderDate).format('MM/DD/YYYY h:mm:ss')),
      time: dayjs(moment(reminderDate).format('MM/DD/YYYY h:mm:ss')),
    });
    setDate(moment(reminderDate).format('YYYY-MM-DD'));
    setTime(moment(reminderDate).format('h:mm:ss'));
    statusForm.setFieldsValue({ status });
    if (tabChange === 2) {
      notesForm.setFieldsValue({ notes });
    }
  }, [additionalEmails, reminderForm, statusForm, notes, status, tabChange]);

  useEffect(() => {
    if (timeline) {
      const newList = timeline.map((item: any) => {
        const child = (
          <>
            <p>{item.timelineDescription}</p>
            <p>
              {moment(item.createdAt).calendar(null, {
                sameDay: '[Today] hh:mm a',
                lastDay: '[Yesterday] hh:mm a',
                lastWeek: '[Last] dddd',
                sameElse: 'MMM DD YYYY',
              })}
            </p>
          </>
        );
        return { children: child };
      });
      setTimelineList(newList);
    }
  }, [timeline]);
  const payload = {
    companyName,
    website,
    description,
    notes,
    reminderNote,
    reminderType,
    additionalEmails,
    reminderDate,
    status,
  };

  const handleStatusClose = async () => {
    const emails = people.map((item: any) => item.email);
    await closeProspectClient({
      variables: {
        prospectClientId: Number(id),
        email: { emails },
      },
      refetchQueries: [PROSPECT_CLIENT_DETAILS, PROSPECT_CLIENT_TIMELINE],
    })
      .then((res) => {
        Notification({
          type: 'success',
          message: res?.data?.closeProspectClient?.message,
        });
      })
      .catch((error) => {
        Notification({ type: 'error', message: error.message });
      });
  };

  const handleReminderChange = async (values: any) => {
    const dateTime = `${date} ${time}`;
    const { time: times, reminderDate: dates, ...rest } = values;
    await updateProspectClient({
      variables: {
        prospectClientId: Number(id),
        clientData: {
          ...payload,
          ...rest,
          reminderDate: dateTime,
        },
      },
      refetchQueries: [PROSPECT_CLIENT_DETAILS, PROSPECT_CLIENT_TIMELINE],
    })
      .then((res) => {
        Notification({
          type: 'success',
          message: res?.data?.updateProspectClient?.message,
        });
        setEditable(false);
      })
      .catch((error) => {
        Notification({ type: 'error', message: error.message });
      });
  };

  const handleConvertToClient = async (values: any) => {
    const { personId, ...personData } = convertPerson;
    const { addressId, ...addressData } = convertAddress;
    await convertToClient({
      variables: {
        prospectClientId: Number(id),
        clientData: {
          companyName,
          description: description || '',
          registrationNo: '',
          vatNo: '',
          ...personData,
          ...addressData,
        },
        personId,
        addressId,
      },
      refetchQueries: [PROSPECT_CLIENT_DETAILS, PROSPECT_CLIENT_TIMELINE],
    })
      .then((res) => {
        Notification({
          type: 'success',
          message: res?.data?.convertToClient?.message,
        });
        setEditable(false);
        setConvertModal(false);
      })
      .catch((error) => {
        Notification({ type: 'error', message: error.message });
      });
  };

  const handleUpdateConvertedClient = async (values: any) => {
    const { personId, ...personData } = convertPerson;
    const { addressId, ...addressData } = convertAddress;
    await updateConvertedClient({
      variables: {
        updateData: {
          prospectClientId: Number(id),
          ...personData,
          ...addressData,
          peopleId: Number(personId),
          addressId: Number(addressId),
          userId: user && user.id,
          initialPeopleId,
          initialAddressId,
        },
      },
    })
      .then((res) => {
        Notification({
          type: 'success',
          message: res?.data?.updateConvertedClient?.message,
        });
        setEditable(false);
        setConvertModal(false);
        if (initialPeopleId !== personId) {
          sessionStorage.setItem('deletePeople', initialPeopleId);
        }
        if (initialAddressId !== addressId) {
          sessionStorage.setItem('deleteAddress', initialAddressId);
        }
        sessionStorage.setItem('updated', '1');
      })
      .catch((error) => {
        Notification({ type: 'error', message: error.message });
      });
  };

  const items: any = [
    {
      label: 'Details',
      key: 1,
      children: (
        <AddressTable
          tableData={address}
          convertModal={convertModal}
          setChangeDetails={setChangeDetails}
          changeDetails={changeDetails}
          deleted={deleted}
          setDeleted={setDeleted}
          convertAddress={convertAddress}
        />
      ),
    },
    {
      label: 'Note',
      key: 2,
      children: (
        <Notes
          notesForm={notesForm}
          handleReminderChange={handleReminderChange}
          noteEditable={noteEditable}
          notes={notes}
          setNoteEditable={setNoteEditable}
        />
      ),
    },
  ];

  const onDateChange = (
    value: DatePickerProps['value'],
    dateString: [string, string] | string,
  ) => {
    setDate(dateString);
  };

  const onTimeChange = (
    value: DatePickerProps['value'],
    dateString: [string, string] | string,
  ) => {
    setTime(dateString);
  };
  const disabledDate = (current: any) => current && current < moment().subtract(1, 'day');

  useEffect(() => {
    if (changeDetails === 'people' || changeDetails === 'address') {
      setConvertModal(true);
    }
  }, [changeDetails]);
  useEffect(() => {
    sessionStorage.removeItem('deletePeople');
    sessionStorage.removeItem('deleteAddress');
    sessionStorage.removeItem('updated');
  }, []);

  const disabledButton = () => {
    if (changeDetails === 'people') {
      return initialPeopleId === convertPerson.personId;
    }
    if (changeDetails === 'address') {
      return initialAddressId === convertAddress.addressId;
    }
    return false;
  };

  return (
    <ApplicationDetailWrapper>
      <div>
        <PeoplesTable
          tableData={people}
          convertModal={convertModal}
          setChangeDetails={setChangeDetails}
          changeDetails={changeDetails}
          deleted={deleted}
          setDeleted={setDeleted}
          convertPerson={convertPerson}
          status={status}
        />
      </div>
      <Tabs type='card' items={items} onChange={(e: any) => setTabChange(e)} />
      <hr style={{ opacity: 1, margin: 0 }} />
      <h2 className='sub-heading'>Status</h2>
      <Form
        form={statusForm}
        // onFieldsChange={handleStatusChange}
        name='statusForm'
      >
        <SelectField
          options={PROSPECT_CLIENTS_STATUS.slice(status - 1, 3)}
          className='status-select'
          name='status'
          handleChange={(e: any) => {
            if (e === 3) {
              handleStatusClose();
            } else {
              setConvertModal(true);
            }
          }}
        />
      </Form>
      <Form
        form={reminderForm}
        name='reminderForm'
        className='status-form'
        onFinish={handleReminderChange}
        autoComplete='off'
      >
        <div className='reminder-section'>
          <h2 className='sub-heading'>Reminder</h2>
          <div className='reminder-div'>
            <p className='sub-head'>Reminder Note</p>
            {!editable ? (
              <p>{reminderNote}</p>
            ) : (
              <TextAreaField name='reminderNote' label='' rows={4} />
            )}
            {!reminderNote && <p>Click on Update to add reminder note.</p>}
          </div>
          <div className='reminder-div'>
            <p className='sub-head'>Reminder Type</p>
            <Form.Item name='reminderType'>
              <Radio.Group name='reminderType'>
                <Radio
                  value='phone'
                  disabled={!editable && REMINDER_TYPES[0] !== reminderType}
                >
                  Phone
                </Radio>
                <Radio
                  value='email'
                  disabled={!editable && REMINDER_TYPES[1] !== reminderType}
                >
                  E-mail
                </Radio>
                <Radio
                  value='visit'
                  disabled={!editable && REMINDER_TYPES[2] !== reminderType}
                >
                  Visit
                </Radio>
              </Radio.Group>
            </Form.Item>
          </div>
          <div className='reminder-div'>
            <p className='sub-head'>Additional Emails (Optional)</p>
            {!editable ? (
              <div className='additional-emails'>
                {additionalEmails?.map((email: any) => (
                  <span
                    style={{
                      backgroundColor: '#E5E5E5',
                      padding: '4px',
                    }}
                    key={email}
                  >
                    {email}
                    {' '}
                  </span>
                ))}
                {!additionalEmails && (
                  <p>Click on Update to add additional emails</p>
                )}
              </div>
            ) : (
              <ChipInput
                name='additionalEmails'
                form={reminderForm}
                value={additionalEmails}
              />
            )}
          </div>
          <div className='reminder-div'>
            <p className='sub-head'>Date & Time of Reminder</p>
            {!editable ? (
              <div className='date-time'>
                <span>
                  <CalendarOutlined />
                  {' '}
                  {moment(reminderDate).format('MMM DD, YYYY ')}
                </span>
                <span>
                  <ClockCircleOutlined />
                  {' '}
                  {moment(reminderDate).format('h:mm A')}
                </span>
              </div>
            ) : (
              <div className='date-time'>
                <Form.Item name='reminderDate'>
                  <DatePicker
                    onChange={onDateChange}
                    disabledDate={disabledDate}
                  />
                </Form.Item>
                <Form.Item name='time'>
                  <TimePicker onChange={onTimeChange} use12Hours />
                </Form.Item>
              </div>
            )}
          </div>
          {!editable && (
            <ButtonWrapper
              className='success-btn'
              onClick={() => setEditable(true)}
            >
              Update
            </ButtonWrapper>
          )}
          {editable && (
            <Form.Item className='btns'>
              <ButtonWrapper htmlType='submit' className='success-btn'>
                Save
              </ButtonWrapper>
              <ButtonWrapper
                className='success-btn cancel'
                onClick={() => setEditable(false)}
              >
                Cancel
              </ButtonWrapper>
            </Form.Item>
          )}
        </div>
      </Form>
      <hr style={{ opacity: 1 }} />
      {!loading && timeline && timeline.length > 0 && (
        <div>
          <h2 className='sub-heading'>History</h2>
          <div className='timeline'>
            <Timeline items={timelineList} />
          </div>
        </div>
      )}
      <ModalWrapper
        title={
          changeDetails === '' ? 'Convert to Client' : 'Edit Client Details'
        }
        isOpen={convertModal}
        onCancel={() => {
          setConvertModal(false);
          statusForm.setFieldValue('status', status);
          setChangeDetails('');
          sessionStorage.removeItem('deletePeople');
          sessionStorage.removeItem('deleteAddress');
          sessionStorage.removeItem('updated');
        }}
        onOk={() => setConvertModal(false)}
        moduleClass='campaign-module convert-modal'
        footer={[
          <Form
            onFinish={
              changeDetails === ''
                ? handleConvertToClient
                : handleUpdateConvertedClient
            }
          >
            <Button
              key='link'
              type='primary'
              onClick={() => {
                setConvertModal(false);
                statusForm.setFieldValue('status', status);
                sessionStorage.removeItem('deletePeople');
                sessionStorage.removeItem('deleteAddress');
                sessionStorage.removeItem('updated');
                setChangeDetails('');
              }}
            >
              Cancel
            </Button>
            ,
            <Button
              style={{ backgroundColor: '#6cb33f', color: '#fff' }}
              htmlType='submit'
              disabled={disabledButton()}
            >
              {changeDetails === '' ? 'Submit' : 'Update'}
            </Button>
          </Form>,
        ]}
      >
        <div>
          <Form>
            {changeDetails === '' ? (
              <p className='heading'>
                Select primary contact details to convert into client.
              </p>
            ) : (
              <p className='heading'>
                Before deleting submitted details you need to change primary
                contact of client.
              </p>
            )}
            <div
              style={
                changeDetails === 'address'
                  ? {
                    display: 'none',
                  }
                  : {}
              }
            >
              <PeoplesTableModal
                tableData={people}
                convertModal={convertModal}
                setConvertPerson={setConvertPerson}
                setChangeDetails={setChangeDetails}
                changeDetails={changeDetails}
                initialPeopleId={initialPeopleId}
              />
            </div>
            <div
              style={
                changeDetails === 'people'
                  ? {
                    display: 'none',
                  }
                  : {}
              }
            >
              <AddressTableModal
                tableData={address}
                convertModal={convertModal}
                setConvertAddress={setConvertAddress}
                setChangeDetails={setChangeDetails}
                initialAddressId={initialAddressId}
                changeDetails={changeDetails}
              />
            </div>
          </Form>
        </div>
      </ModalWrapper>
    </ApplicationDetailWrapper>
  );
};

export default ProspectClientDetail;

ProspectClientDetail.defaultProps = {};
