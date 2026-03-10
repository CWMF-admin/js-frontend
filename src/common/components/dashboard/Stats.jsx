import React from 'react';

import GreenVolunteers from '../../../assets/images/GreenVolunteers.png';
import OrangeCalendar from '../../../assets/images/OrangeCalendar.png';
import BlueClock from '../../../assets/images/BlueClock.png';
import PurpleCheck from '../../../assets/images/PurpleCheck.png';

const Images = {
  Volunteers: GreenVolunteers,
  Events: OrangeCalendar,
  Hours: BlueClock,
  Signups: PurpleCheck,
}
const colors = {
  Volunteers: "#E3F8E9",
  Events: "#F8F8E3",
  Hours: "#E3F0F8",
  Signups: "#F0DFFF",
}
const Stats = ({title, number, bottomText, category}) => {
  const statsDivStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '15%',
    height: 'auto',
    aspectRatio: '4/3',
    backgroundColor: '#fff',
    borderRadius: '15px',
    boxShadow: '0px 2px 2px lightgray',
    padding: '20px',
    margin: '20px',
  };
  const statsTopStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#585858',
    fontSize: '16px',
  };
  const statIconStyle = {
    height: '40px',
    width: 'auto',
    aspectRatio: '1/1',
  };
  const statBGStyle = {
    height: '50px',
    width: 'auto',
    aspectRatio: '1/1',
    backgroundColor: colors[category],
    borderRadius: '15px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  const statsTitleStyle = {
    color: '#585858',
    fontSize: '14px',
    fontWeight: 'bold',
    marginRight: '8px',
  };
  const statsNumberStyle = {
    color: '#000',
    fontSize: '30px',
    fontWeight: 'bold',
  };
  const statsBottomTextStyle = {
    color: '#6E6E6E',
    fontSize: '14px',
  };

  return (
    <div style={statsDivStyle}>
      <div style={statsTopStyle}>
        <div style={statsTitleStyle}>{title}</div>
        <div style={statBGStyle}>
          <img
            src={Images[category]}
            alt='Green Volunteers'
            style={statIconStyle}
          />
        </div>
      </div>
      <div>
      <div style={statsNumberStyle}>{number}</div>
      <div style={statsBottomTextStyle}>{bottomText}</div>
      </div>
    </div>
  );
};

export default Stats;
