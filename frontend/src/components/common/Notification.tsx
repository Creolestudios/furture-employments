import { notification } from 'antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error';
interface Iprop {
  type: NotificationType;
  message: string;
  description?: string;
  contextHolder?: any;
}

const Notification = ({
  type,
  message,
  description = '',
  contextHolder = null,
}: Iprop) => {
  notification.open({
    duration: 5,
    type,
    message,
    description,
  });
  return { contextHolder };
};

export default Notification;
