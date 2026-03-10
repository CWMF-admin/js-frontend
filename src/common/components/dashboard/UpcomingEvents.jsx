import React from 'react';
import GrayCalendar from '../../../assets/images/GrayCalendar.png';
import GrayClock from '../../../assets/images/GrayClock.png';
import GrayLocation from '../../../assets/images/GrayLocation.png';
import GrayPeople from '../../../assets/images/GrayPeople.png';
const UpcomingEvents = ({EventTitle, tag, currVol, volCap, date, time, location}) => {
  const tagColors = {
    'Holiday Event': ['#C40000', '#FFCDCD'],
    'Grocery Giveaway': ['#0A7A00', '#DEFFDA'],
    'Other': ['#5F5F5F', '#F8F8F8'],
  }
  const upcomingEventDivStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#FAFAFA',
    borderRadius: '15px',
    padding: '0px 20px',
  };
  const topUpcomingEventStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0px',
    height: '40px',
    padding: '10px 0px 0px 0px',
  }
  const bottomUpcomingEventStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0px 0px 10px 0px',
    margin: '0px',
  }

  const bottomUpcomingEventTextStyle = {
    margin: '0px',
    color: '#5F5F5F',
    fontWeight: 'normal',
  }
  const titleTagStyle = {
    display: 'flex',
    flexDirection: 'row',
      alignItems: 'center',
  }
  const tagStyle = {
        color: tagColors[tag][0],
    backgroundColor: tagColors[tag][1],
    padding: '5px 10px',
    borderRadius: '8px',
  }
  const titleStyle = {
    margin: '0px',
    paddingRight: '10px',
  }
  const iconStyle = {
    width: '20px',
  }
  const iconTextStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '5px',
  }
  const volDivStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '5px',
  }
  return (
    <div style={upcomingEventDivStyle}>
      <div style={topUpcomingEventStyle}>
        <div style={titleTagStyle}>
          <h5 style={titleStyle}>{EventTitle}</h5>
          <h5 style={tagStyle}>{tag}</h5>
        </div>
        <div style={volDivStyle}>
          <img src={GrayPeople} alt="Location" style={iconStyle} />
        <h5><span style={{color: "#5F5F5F"}}>{currVol} / </span><span style={{color: "#999999"}}>{volCap}</span></h5>
        </div>
      </div>
      <div style={bottomUpcomingEventStyle}>
        <div style={iconTextStyle}>
          <img src={GrayCalendar} alt="Calendar" style={{width: '35px'}} />
          <h6 style={bottomUpcomingEventTextStyle}>{date}</h6>
        </div>
        <div style={iconTextStyle}>
          <img src={GrayClock} alt="Clock" style={iconStyle} />
          <h6 style={bottomUpcomingEventTextStyle}>{time}</h6>
        </div>
        <div style={iconTextStyle}>
          <img src={GrayLocation} alt="Location" style={iconStyle} />
          <h6 style={bottomUpcomingEventTextStyle}>{location}</h6>
        </div>
      </div>
      <div>

      </div>
    </div>
  );
};

export default UpcomingEvents;
