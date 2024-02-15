import { Input, InputNumber } from 'antd';
import { styled } from 'styled-components';

interface IStyleProps {
  height?: string;
  maxwidth?: string;
}

const StyledInput = styled(Input)<IStyleProps>`
  height: ${(props) => props.height};
  max-width: ${(props) => props.maxwidth};
`;

export default StyledInput;

export const StyledPasswordInput = styled(Input.Password)<IStyleProps>`
  height: ${(props) => props.height};
  max-width: ${(props) => props.maxwidth};
`;

export const StyledInputNumber = styled(InputNumber)<IStyleProps>`
  height: ${(props) => props.height};
  max-width: ${(props) => props.maxwidth};
`;
