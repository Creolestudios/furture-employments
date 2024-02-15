import { Form } from 'antd';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import CommonEditorField from '../common/formElements/CommonEditorField';
import CANDIDATE_NOTES_FORM from '../../constants/components/candidateNotesForm';
import { ICandidateNoteAdd } from '../../interfaces/formElements';
import ButtonWrapper from '../common/formElements/buttonWrapper';
import { getErrorResponse, getSuccessResponse } from '../../utils';
import ApplicationDetailWrapper from '../applicationDetails/ApplicationDetail.styles';
import { USER_ROLE } from '../../constants';

interface IProps {
  id: number;
  notesId: any;
  addNote: any;
  updateNote: any;
  note: any;
  removeNotes: any;

  redirectRoute: string;
  role: number;
}

const NotesForm: React.FC<IProps> = ({
  id,
  notesId,
  addNote,
  updateNote,
  note,
  removeNotes,

  redirectRoute,
  role,
}) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  //   const { addNote } = useAdminNotesForCandidate();
  //   const { updateCandidateNote } = useAdminNotesUpdate();
  //   const { adminNote } = useAdminNotesById(notesId);
  //   const { removeCandidateNotes } = useAdminNotesRemove();

  const handleNoteAdd = (values: ICandidateNoteAdd) => {
    const mutation = notesId
      ? updateNote({
        variables: {
          updateNotesDto: { notesId, description: values.description },
        },
      })
      : addNote({
        variables: {
          addNotesDto: { id, description: values.description },
        },
      });

    mutation
      .then((res: any) => {
        let message;
        if (notesId) {
          if (USER_ROLE.EMPLOYER === role) {
            message = res.data?.updateEmployerNotes?.message;
          } else {
            message = res.data?.updateNotes?.message;
          }
        } else if (USER_ROLE.EMPLOYER === role) {
          message = res.data?.addNotesForEmployer?.message;
        } else {
          message = res.data?.addNotes?.message;
        }
        getSuccessResponse(message);
        navigate(redirectRoute);
      })
      .catch((error: any) => getErrorResponse(error));
  };

  const handleRemoveNotes = () => {
    removeNotes({ variables: { notesId } })
      .then((res: any) => {
        let message;
        if (USER_ROLE.EMPLOYER === role) {
          message = res.data.removeEmployerNotes?.message;
        } else {
          message = res?.data?.removeNotes?.message;
        }
        getSuccessResponse(message);
        navigate(redirectRoute);
      })
      .catch((error: any) => getErrorResponse(error));
  };

  useEffect(() => {
    if (note) {
      form.setFieldsValue({ description: note.description });
    }
  }, [note, form]);

  return (
    <ApplicationDetailWrapper>
      <Form onFinish={handleNoteAdd} form={form} className='note-form'>
        <CommonEditorField
          name={CANDIDATE_NOTES_FORM.NAME}
          label={CANDIDATE_NOTES_FORM.LABEL}
          rules={CANDIDATE_NOTES_FORM.VALIDATION_RULE}
          height={300}
        />
        <div className='note-form-action'>
          <Form.Item>
            <ButtonWrapper
              htmlType='submit'
              className='success-btn'
              icon={<CheckOutlined />}
            >
              {notesId ? 'Update Notes' : 'Add Notes'}
            </ButtonWrapper>
          </Form.Item>
          {notesId && (
            <Form.Item>
              <ButtonWrapper
                htmlType='button'
                className='danger-btn'
                icon={<CloseOutlined />}
                onClick={handleRemoveNotes}
              >
                Delete Note
              </ButtonWrapper>
            </Form.Item>
          )}
        </div>
      </Form>
    </ApplicationDetailWrapper>
  );
};

export default NotesForm;
