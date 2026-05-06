import React from 'react';

import { Button } from '@/common/components/atoms/Button';

import DashboardIcon from '../../../assets/images/Dashboard.png';
import AcknowledgementsIcon from '../../../assets/images/acknowledgements.png';
import EventsIcon from '../../../assets/images/events.png';
import RegistrationsIcon from '../../../assets/images/registrations.png';
import VolunteersIcon from '../../../assets/images/volunteers.png';
import styled from 'styled-components';

const icons = {
  Dashboard: DashboardIcon,
  Events: EventsIcon,
  Volunteers: VolunteersIcon,
  Registrations: RegistrationsIcon,
  Acknowledgements: AcknowledgementsIcon,
};

const NavCategory = ({ name, icon, toggle, onClick }) => {
  const iconStyle = {
    width: '20px',
    height: '20px',
    marginRight: '8px',
  };
  const NavCategoryStyle = styled(Button.Nav)`
    display: flex;
    flex-direction: row;
  `;

  return (
    <NavCategoryStyle onClick={onClick}>
      {toggle ? (
        <>
          <img src={icons[icon]} alt={name} style={iconStyle} />
          {name}
        </>
      ) : (
        <img src={icons[icon]} alt={name} style={iconStyle} />
      )}
    </NavCategoryStyle>
  );
};

export default NavCategory;
