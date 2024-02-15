import { styled } from 'styled-components';
import { Colors } from '../../../styles/variable';

const StyledDashboard = styled.div`
  .page-sub-heading {
    color: ${Colors.SUCCESS};
    margin-bottom: 12px;
  }

  .view-all-applications {
    color: ${Colors.SUCCESS};
    display: flex;
    justify-content: end;
    align-items: center;
  }
`;

export default StyledDashboard;
