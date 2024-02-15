import { styled } from 'styled-components';

const StyledCardWrapper = styled.div`
  .card-container {
    display: flex;
    flex-direction: column;
    background: #f4f2ed;
    border-radius: 5px;
    color: #58474c;
    padding: 13px;

    .row {
      display: flex;
      justify-content: flex-start;
      margin-bottom: 10px;
      align-items: center;

      .column {
        min-width: 40%;
        text-transform: capitalize;

        .column-key {
          font-weight: 700;
        }

        .tag-content {
          font-weight: 700;
        }
      }
    }
  }
`;

export default StyledCardWrapper;
