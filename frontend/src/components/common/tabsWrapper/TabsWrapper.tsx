import { Tabs } from 'antd';
import React from 'react';

const TabsWrapper: React.FC<any> = ({ items }) => (
  <Tabs
    type='card'
    // onChange={handleTabChange}
    // activeKey={activeKey}
    items={items}
  />
);
// const location = useLocation();
// const [activeKey, setActiveKey] = useState(location.hash);

// useEffect(() => {
//   if (!location.hash) {
//     setActiveKey(items?.[0]?.key);
//     window.history.pushState(null, '', items?.[0]?.key);
//   }
// }, []);

// const handleTabChange = (key: string) => {
//   setActiveKey(key);
//   window.history.pushState(null, '', key);
// };
export default TabsWrapper;
