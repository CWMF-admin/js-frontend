import React from 'react';

const PageHeader = ({ title }) => {
  const titleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '25px 20px',
  };
  const bannerStyle = {
    backgroundColor: '#fff',
    height: '60px',
    width: '100%',
    boxShadow: '0px 2px 4px black',
  };
  return (
    <div style={bannerStyle}>
      <div style={titleStyle}>{title}</div>
    </div>
  );
};

export default PageHeader;
