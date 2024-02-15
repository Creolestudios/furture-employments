import React from 'react';
import { Button } from 'antd';
import {
  IApplicationStatusItem,
  ICardColumn,
  ICardRow,
} from '../../../interfaces';
import ApplicationStatusItem from '../../candidate/applicationsWrapper/ApplicationStatusItem';
import { APPLICATION_STATUS } from '../../../constants';

import StyledCardWrapper from './index.styles';
import {
  convertCamelIntoContentWithEmptySpace,
  downloadFile,
  isCamelNotation,
} from '../../../utils';

interface IProps {
  data: ICardRow[];
  cvUrlData?: any;
}

const renderElement = ({
  isTag,
  isDownloadCv,
  value,
  getContent,
  cvUrlData,
}: {
  isTag?: boolean;
  isDownloadCv?: boolean;
  value: string;
  getContent: any;
  cvUrlData: any;
}) => {
  if (isTag) {
    return (
      <ApplicationStatusItem
        name={getContent(String(value))?.name}
        content={getContent(String(value))?.desc}
        color={getContent(String(value))?.color}
      />
    );
  }
  if (isDownloadCv) {
    return (
      <Button
        className='download'
        onClick={() => downloadFile(
          cvUrlData?.getCvContentUrl?.url,
          cvUrlData?.getCvContentUrl?.fileName,
        )}
      >
        Download
      </Button>
    );
  }
  return value;
};

const Row: React.FC<ICardRow> = ({ row, cvUrlData }) => {
  const getContent = (value: string) => APPLICATION_STATUS.find(
    (item: IApplicationStatusItem) => item.status === Number(value),
  );

  return (
    <div className='row'>
      {row.length > 0
        && row.map((element: ICardColumn) => (
          <div className='column' key={element.key}>
            <span className='column-key'>
              {isCamelNotation(element.key)
                ? convertCamelIntoContentWithEmptySpace(element.key)
                : element.key}
              :
              {' '}
            </span>
            {renderElement({
              getContent,
              isTag: element.isTag,
              isDownloadCv: element.isDownloadCv,
              value: element.value,
              cvUrlData,
            })}
          </div>
        ))}
    </div>
  );
};

const CardWrapper: React.FC<IProps> = ({ data, cvUrlData }) => (
  <StyledCardWrapper>
    <div className='card-container'>
      {data.length > 0
        && data.map((row: any) => (
          <Row row={row} key={row[0].key} cvUrlData={cvUrlData} />
        ))}
    </div>
  </StyledCardWrapper>
);

CardWrapper.defaultProps = {
  cvUrlData: {},
};

export default CardWrapper;
