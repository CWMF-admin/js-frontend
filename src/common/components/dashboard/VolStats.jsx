import React from 'react';

import GreenVolunteers from '../../../assets/images/GreenVolunteers.png';
import Events from '../../../assets/images/Events.png';

const VolStats = () => {

    const statsContainer =
    {
        display: 'flex',
        padding: '30px 60px 0px 60px',
        flexDirection: 'row',
        alignItems: 'left',
        gap:'30px',
    };

    const gridStyle = 
    {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridGap: '1rem',
        padding: '10px 20px 20px 15px',
        background: 'white',
        height: '130px',
        borderRadius: '7px',
        width: '180px',
        maxWidth: '300px',
        maxHeight: '300px',
        boxShadow: '0px 2px 4px gray',
    }

  const statsDivStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '12%',
    height: 'auto',
    aspectRatio: '1/1',
    backgroundColor: '#fff',
    borderRadius: '15px',
    boxShadow: '0px 2px 4px gray',
    padding: '20px',
  };
  const statsTopStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#585858',
  };
  const statIconStyle = {
    width: '50px',
    height: 'auto',
  };
  const statBGStyle = {
    backgroundColor: '#E3F8E9',
    height: '50px',
    width:'50px',
    borderRadius:'5px',
    display: 'flex',
    alignItems: 'center',
  };
    const bgStyle = {
    backgroundColor: '#CF7559',
    height: '50px',
    width:'50px',
    borderRadius:'5px',
    display: 'flex',
    alignItems: 'center',
  };
  const numStyle = 
  {
    fontSize:'20pt'
  }

  return (
    <div style={statsContainer}>
        <div style={gridStyle}>
            <div>UPCOMING EVENTS</div>
            <div style={bgStyle}><img src={Events} alt="" style={statIconStyle}/></div>
            <div><span style={numStyle}><strong>2</strong></span> Scheduled</div>
            <div></div>
        </div>
                <div style={gridStyle}>
            <div>TOTAL HOURS</div>
            <div style={statBGStyle}><img src={GreenVolunteers} alt="" style={statIconStyle}/></div>
            <div><span style={numStyle}><strong>6 </strong></span>  Served</div>
            <div></div>
        </div>
    </div>
    // <div style={statsContainer}>
    // <div style={statsDivStyle}>
    //   <div style={statsTopStyle}>
    //     <div>TOTAL VOLUNTEERS</div>
    //     <div style={statBGStyle}>
    //       <img
    //         src={GreenVolunteers}
    //         alt='Green Volunteers'
    //         style={statIconStyle}
    //       />
    //     </div>
    //   </div>
    //   <div>6</div>
    //   <div>4 active</div>
    // </div>
    // </div>
  );
};

export default VolStats;
