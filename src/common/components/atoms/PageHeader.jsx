import React from 'react';
import styled from 'styled-components';
const PageHeader = ({ title }) => {
  const TitleStyle = styled.div`
    font-size: 24px;
    font-weight: bold;
    margin: 40px 20px;
    @media (max-width: 768px) {
      margin: 15px 10px;
    }
  `;
  const BannerStyle = styled.div`
    background-color: #fff;
    height: 70px;
    width: 100%;
    box-shadow: 0px 2px 4px black;
    @media (max-width: 768px) {
      height: 50px;
    }
  `;
  return (
    <BannerStyle>
      <TitleStyle>{title}</TitleStyle>
    </BannerStyle>
  );
};

export default PageHeader;
