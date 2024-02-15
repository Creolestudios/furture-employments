import React from 'react';
import { Button, Popover, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate, useParams } from 'react-router-dom';
import { CAMPAIGN_STATUS, VACANCIES_STATUS } from '../../constants';
import TableWrapper from '../../styles/table-wrapper';
import appRoutes from '../../constants/appRoutes';
import {
  useCampaignList,
  useUpdateCampaignStatus,
} from '../../services/vacancies/vacancyService';
import Notification from '../common/Notification';
import { CAMPAIGN_LIST } from '../../graphql/queries/vacancies';
import GetWindowDimensions from '../../utils/useWindowDimension';

interface DataType {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  status: string;
}

const CampaignsList = (vacancyStatus: any) => {
  const { id } = useParams();

  // Fetch all campaign list for a vacancy
  const { data } = useCampaignList(Number(id)) || {};

  // Update status of a campaign
  const { updateCampaignStatus } = useUpdateCampaignStatus();

  const handleUpdateCampaignStatus = async (
    campaignStatus: number,
    campaignId: number,
  ) => {
    await updateCampaignStatus({
      variables: { status: campaignStatus, campaignId },
      refetchQueries: [
        { query: CAMPAIGN_LIST, variables: { vacancyId: Number(id) } },
      ],
    })
      .then((res) => Notification({
        type: 'success',
        message: res?.data?.updateCampaignStatus?.message,
      }))
      .catch((err) => Notification({ type: 'error', message: err.message }));
  };

  const navigate = useNavigate();
  const size = GetWindowDimensions();
  const columns: ColumnsType<DataType> = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      className: 'title',
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
    },
    {
      title: 'Running',
      key: 'status',
      dataIndex: 'status',
      className: 'status',
      render: (_, { id, status }) => (
        <div>
          {Number(status) === CAMPAIGN_STATUS.START ? (
            <Popover
              className='campaign-status-popover'
              placement={size.width > 425 ? 'left' : 'top'}
              content='Stop the campaign'
            >
              <Button
                onClick={() => handleUpdateCampaignStatus(CAMPAIGN_STATUS.STOP, id)}
                className='stop-action'
                disabled={vacancyStatus?.status === VACANCIES_STATUS.CLOSE}
              >
                Stop
              </Button>
            </Popover>
          ) : (
            <Popover
              className='campaign-status-popover'
              placement={size.width > 425 ? 'left' : 'top'}
              content='Start the campaign'
            >
              <Button
                className='start-action'
                onClick={() => handleUpdateCampaignStatus(CAMPAIGN_STATUS.START, id)}
                disabled={vacancyStatus?.status === VACANCIES_STATUS.CLOSE}
              >
                Start
              </Button>
            </Popover>
          )}
        </div>
      ),
    },
    {
      title: '#',
      key: 'action',
      render: ({ id: g }) => (
        <Button
          className='details-btn'
          onClick={() => navigate(`${appRoutes.CAMPAIGN_UPDATE}/${g}?vacancyId=${id}`)}
        >
          View Details
        </Button>
      ),
    },
  ];

  return (
    <TableWrapper>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{ x: 500 }}
        bordered
        className='campaign-table'
      />
    </TableWrapper>
  );
};

export default CampaignsList;
