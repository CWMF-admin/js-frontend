import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/common/components/atoms/Button';
import { useUser } from '@/common/contexts/UserContext';
import styled from 'styled-components';

import CWMF_big_logo from '../../../assets/images/CWMF_big_logo.webp';
import Hamburger from '../../../assets/images/Hamburger.png';
import profileIcon from '../../../assets/images/profile.png';
import LogoutModal from './LogoutModal';
import NavCategory from './NavCategory';
import Drag from '../../../assets/images/Drag.png';
import CWMF_small_logo from '../../../assets/images/CWMF_small_logo.png'
const StyledNav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 10px 1%;
  font-size: 20px;
  background-color: #314552;
  position: fixed;
  left: 0;
  top: 0;
 width: ${({ toggle }) => (toggle ? '20%' : '5%')};
  transition: width 0.25s ease;
  height: 100vh;
  @media (max-width: 768px) {
    width: 100%;
    flex-direction: row;
    max-width: 100vw;
    position: sticky;
  }
`;

const TopAligned = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0px;
  width: 100%;
`;
const LogoPlaceholder = styled(Button.Invisible)`
  display: flex;
  justify-content: space-between;
  align-items: space-between;
  padding: 0;
  font-size: 1.7rem;
  font-weight: bold;
  font-family: monospace;
  height: 50px;
  gap: 0px;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    width: 100%;
}
`;

export default function NavBar({ toggle, setToggle }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth > 768);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const handleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  
useEffect(() => {
  const handleResize = () =>  {
    const isDesktop = window.innerWidth > 768;
    setWindowWidth(isDesktop);
    if (!isDesktop) {
      setToggle(true);
    }
  };
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);

  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleLogoutConfirm = async () => {
    try {
      await logout();
      setIsModalOpen(false);
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  const handleNavToggle = () => {
    setToggle(prev => !prev);
    console.log(toggle);
  };
  useEffect(() => {
    console.log(toggle);
  }, [toggle]);

  const StyleLogo = styled.img`
    width: ${({ toggle }) => toggle ? '90%' : '75%'};
    height: auto;
    transition: width 0.25s ease;
    @media (max-width: 768px) {
      width: 50%;
    }
  `;
  const styleSmallLogo = {
    width: '60%',
    height: 'auto',
    marginLeft: '12px',
  }
  const styleHamburger = {
    width: '20%',
    height: 'auto',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 'none',
  };
  const StyleButtonHam = styled.button`
    align-content: center;
    justify-content: center;
    width: ${({toggle}) => toggle ? '100%' : '0%'};
    height: auto;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    color: white;
    margin: 0;
    position: relative;
    @media (max-width: 768px) {
      width: 60%;
  `;
  const LogoHamStyle = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: ${(toggle) ? 'space-between' : 'space-around'};
    align-items: center;
    width: 100%;
    height: auto;
    background: none;
    border: none;
    cursor: pointer;
    margin: 0;
    margin-left: ${({toggle}) => toggle ? null : '0px'};
    @media (max-width: 768px) {
      justify-content: space-between;
    }
  `;
  const ArrowStyle = styled.div`
    position: absolute;
    color: white;
    top: -12px;
    right: ${({ toggle }) => toggle ? '-16px' : '-19px'};
    zIndex: 200;
    background-color: #314552;
    padding: 5px;
    border-radius: 5px;
    font-weight: bold;
  `;
  const LogoutStyle = styled(Button.Secondary)`
  margin-bottom: 20px;
    @media (max-width: 768px) {
  display: none;
}`;
  const LogIconStyle = styled.img`
  margin-bottom: 20px;
    @media (max-width: 768px) {
      display: none;
    }
  `;

  

  return (
    <StyledNav toggle={toggle}>
      <TopAligned>
        <LogoHamStyle toggle={toggle}>
          <LogoPlaceholder onClick={() => navigate('/')}>
            {(toggle || !windowWidth) ? (
              <StyleLogo toggle={toggle} src={CWMF_big_logo} alt='CWMF Logo'/>
            ) : <img src={CWMF_small_logo} alt='CWMF Logo' style={styleSmallLogo}></img>}
          </LogoPlaceholder>
          <StyleButtonHam toggle={toggle} onClick={windowWidth ? handleNavToggle : handleDropdown}>
            {windowWidth ? <ArrowStyle>&gt;</ArrowStyle> : <img src={Hamburger} alt='Hamburger Menu' style={styleHamburger} />}
            
            
      </StyleButtonHam>
        </LogoHamStyle>
        {(windowWidth || dropdownOpen) && ( <>
          <NavCategory name='Dashboard' icon='Dashboard' toggle={toggle} onClick={() => navigate('/admin-dashboard')} />
          <NavCategory name='Events' icon='Events' toggle={toggle} onClick={() => navigate('/admin-events')} />
          <NavCategory name='Volunteers' icon='Volunteers' toggle={toggle} onClick={() => navigate('/admin-volunteers')} />
          <NavCategory
            name='Registrations'
            icon='Registrations'
          toggle={toggle}
          onClick={() => navigate('/admin-registrations')}
        />
        <NavCategory
          name='Acknowledgements'
          icon='Acknowledgements'
          toggle={toggle}
          onClick={() => navigate('/admin-acknowledgements')}
        />
        </>)}
      </TopAligned>
      
      {!toggle ? (
        <LogIconStyle
          src={profileIcon}
          alt='Profile Icon'
          style={{ width: '30px', height: '30px' }}
        />
      ) : user ? (
        <LogoutStyle onClick={handleLogoutClick}>Log Out</LogoutStyle>
      ) : (
        <>
          <LogoutStyle
            onClick={() => navigate('/signup')}
            style={{ width: '100%' }}
          >
            Sign Up
          </LogoutStyle>
          <LogoutStyle
            onClick={() => navigate('/login')}
            style={{ width: '100%' }}
          >
            Login
          </LogoutStyle>
        </>
      )}

      <LogoutModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onLogout={handleLogoutConfirm}
      />
    </StyledNav> 
  )
}
