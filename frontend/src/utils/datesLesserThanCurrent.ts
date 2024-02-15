import moment from 'moment';

// to compare start date and end date 
const datesLesserThanCurrent = ({ dateList }: any) => {
  const currentDate = moment();
  if (dateList) {
    return dateList.some((endDate: any) => {
      const createdAtDate = moment(endDate?.endDate);
      return createdAtDate.isAfter(currentDate);
    });
  }
  return null;
};

export default datesLesserThanCurrent;
