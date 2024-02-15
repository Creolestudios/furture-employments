import { Form } from 'antd';
import { styled } from 'styled-components';

interface IStyleProps {
  labelminwidth?: string;
}

const StyledFormItem = styled(Form.Item)<IStyleProps>`
  .ant-form-item-label {
    label {
      min-width: ${(props) => props.labelminwidth};
    }
  }
`;

export default StyledFormItem;
