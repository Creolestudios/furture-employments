import { Button } from 'antd';
import React from 'react';
import { EditFilled, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import MDEditor from '@uiw/react-md-editor';
import ApplicationDetailWrapper from '../applicationDetails/ApplicationDetail.styles';

interface IProps {
  redirectAddNote: string;
  redirectEditNote: string;

  adminNotes: any;
  loading: boolean;
}
const NotesTab: React.FC<IProps> = ({
  redirectAddNote,
  redirectEditNote,
  adminNotes,
  loading,
}) => {
  const navigate = useNavigate();

  return (
    <ApplicationDetailWrapper>
      <div className='actions vacancy add-note'>
        <div className='succes-btn'>
          <Button
            icon={<UserOutlined />}
            onClick={() => navigate(redirectAddNote)}
          >
            Add Note
          </Button>
        </div>
      </div>
      {!loading
        && adminNotes
        && adminNotes.map((note: any) => (
          <div className='notes'>
            <p className='time'>
              {moment(note?.createdAt).format('DD/MM/YYYY hh:mm')}
            </p>

            <p className='desc cv-content'>
              <MDEditor.Markdown
                source={note?.description}
                style={{ whiteSpace: 'pre-wrap' }}
              />
            </p>
            <div className='actions vacancy add-note'>
              <Button
                icon={<EditFilled />}
                className='danger-btn'
                onClick={() => navigate(`${redirectEditNote}/${note?.id}`)}
              >
                Update
              </Button>
            </div>
          </div>
        ))}
    </ApplicationDetailWrapper>
  );
};

export default NotesTab;
