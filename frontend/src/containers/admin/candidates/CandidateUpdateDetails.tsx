import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import AppLayout from '../../../components/layout';
import FormPageWrapper from '../../../styles/formContainer';
import appRoutes from '../../../constants/appRoutes';
import CANDIDATE_SKILLS_FORM from '../../../constants/components/CandidateUpdateSkillForm';
import {
  useCandidateSkills,
  useGetSkills,
  useUpdateCandidateSkills,
} from '../../../services/admin/adminService';
import {
  getErrorResponse,
  getFullName,
  getSuccessResponse,
} from '../../../utils';
import { CANDIDATE_SKILLS_DETAIL } from '../../../graphql/queries/admin';
import DebounceAndTagSelect from '../../../components/common/formElements/DebounceAndTagSelect';

const CandidateUpdateDetail: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [searchSkill, setSearchSkills] = useState('');
  const [showError, setShowError] = useState(false);
  const { newSkills } = useGetSkills(searchSkill);
  const { candidateSkillsDetails } = useCandidateSkills(Number(id));
  const { updateCandidateSkills } = useUpdateCandidateSkills();
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    if (!values.skills) {
      setShowError(true);
    }
    if (values.skills.length === 0) {
      setShowError(true);
    }
    if (values.skills.length !== 0) {
      updateCandidateSkills({
        variables: {
          updateSkillsDto: {
            id: Number(id),
            skills: values?.skills,
          },
        },
        refetchQueries: [
          {
            query: CANDIDATE_SKILLS_DETAIL,
            variables: { profileId: Number(id) },
          },
        ],
      })
        .then((res) => getSuccessResponse(res.data?.updateCandidateSkills?.message))
        .catch((error) => {
          getErrorResponse(error);
        });
    }
  };

  useEffect(() => {
    if (candidateSkillsDetails?.aboutCandidate?.skills) {
      form.setFieldsValue({
        skills: candidateSkillsDetails?.aboutCandidate?.skills,
      });
    }
  }, [candidateSkillsDetails]);

  useEffect(() => {
    const value: any = form.getFieldValue('skills');
    if (value) {
      if (value.length > 0) {
        setShowError(false);
      }
    }
  }, [form.getFieldValue('skills')]);

  return (
    <AppLayout>
      <FormPageWrapper className='candidate-skills'>
        <div className='page-header'>
          <h1>
            Update
            {' '}
            {getFullName(
              candidateSkillsDetails?.firstName,
              candidateSkillsDetails?.lastName,
            )}
          </h1>
          <div
            className='vacancy-link'
            onClick={() => navigate(appRoutes.CANDIDATES)}
            onKeyDown={() => navigate(appRoutes.CANDIDATES)}
            role='button'
            tabIndex={0}
          >
            Back to candidate details
          </div>
        </div>
        <Form
          name={CANDIDATE_SKILLS_FORM.FORM_NAME}
          form={form}
          onFinish={handleFinish}
        >
          <div className='skills'>
            <DebounceAndTagSelect
              name={CANDIDATE_SKILLS_FORM.SKILLS.NAME}
              label={CANDIDATE_SKILLS_FORM.SKILLS.LABEL}
              newOptions={newSkills}
              searchRecord={setSearchSkills}
              // rules={[{ message: 'At least one skill is required.' }]}
            />
          </div>
          <p className='comma-separated'>
            A comma-separated list of skills.
            {' '}
            {showError && (
              <span className='skill-error'>Please Add Skills</span>
            )}
          </p>
          {/* <p className='skill-error'>Please Add Skills</p> */}
          <hr />
          <Form.Item className='form-action'>
            <Button htmlType='submit' icon={<CheckOutlined />}>
              {' '}
              Update Profile
            </Button>
          </Form.Item>
        </Form>
      </FormPageWrapper>
    </AppLayout>
  );
};

export default CandidateUpdateDetail;
