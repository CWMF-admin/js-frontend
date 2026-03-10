
import React from 'react';

const RecentVolunteer = ({initials, name, email, tag}) => {
  const tagColors = {
    active: ['#0A7A00', '#DEFFDA'],
    pending: ['#B55F06', '#F8F8E3'],
    inactive: ['#5F5F5F', '#F8F8F8'],
  }
  const styleBody = {
    width: '100%',
    height: '50px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '10px',
  }
  const circleStyle = {
    width: '50px',
    height: '50px',
    backgroundColor: '#314552',
    borderRadius: '50%',
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
  const verticalStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'left',
    alignItems: 'left',
    margin: '0px',
    width: '50%',
    textAlign: 'left',
  }
  const verticalTextStyle = {
    margin: '0px',
    fontSize: '14px',
    textAlign: 'left',
    alignItems: 'left',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    fontWeight: 'bold',
  }
  const verticalEmailStyle = {
    margin: '0px',
    fontSize: '14px',
    textAlign: 'left',
    alignItems: 'left',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    fontWeight: 'bold',
    color: "#999999",
  }
  const tagDivStyle = {
    backgroundColor: tagColors[tag][1],
    padding: '0px 15px',
    borderRadius: '10px',
    fontSize: '12px',
    fontWeight: 'bold',
    lineHeight: '10px',
    height: '25px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
  const tagTextStyle = {
    color: tagColors[tag][0],
  }
  return (
    <div style={styleBody}>
        <div style={circleStyle}>
          {initials}
        </div>
        <div style={verticalStyle}>
          <p style={verticalTextStyle}>{name}</p>
          <p style={verticalEmailStyle}>{email}</p>
        </div>
        <div style={tagDivStyle}>
          <p style={tagTextStyle}>{tag}</p>
        </div>
      </div>
  )

};

export default RecentVolunteer;
