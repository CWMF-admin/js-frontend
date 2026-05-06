import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import { Button } from '@/common/components/atoms/Button';
import { useUser } from '@/common/contexts/UserContext';

import logo from '@/assets/icons/Logo_Signin.webp';

import LogoutModal from './LogoutModal';
import Header from '@/pages/account/Header';

const StyledNav = styled.nav`
  display: flex;
  gap: 10px;
  padding: 20px 20px;
  font-size: 20px;
`;

const RightAligned = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const CenterAligned = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const LogoPlaceholder = styled(Button.Invisible)`
  padding: 0;
  font-size: 1.7rem;
  font-weight: bold;
  font-family: monospace;
  margin-top: 10px;
  z-index: 900;
`;

export default function NavBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useUser();

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

  return (
    <StyledNav>
      <div style={{ display: "flex", justifyContent: "flex-start", zindex: "500" }}>
          <Header />
      </div>
      <CenterAligned>
        <LogoPlaceholder onClick={() => navigate('/')}>
          <img src={logo} alt="Logo" style={{ height: "60px" }}/>
        </LogoPlaceholder>
      </CenterAligned>
      <RightAligned>
      {user ? (
        <Button.Secondary onClick={handleLogoutClick}>Log Out</Button.Secondary>
      ) : (
        <>
          <Button.Primary onClick={() => navigate('/signup')}>
            Sign Up
          </Button.Primary>
          <Button.Secondary onClick={() => navigate('/login')}>
            Login
          </Button.Secondary>
        </>
      )}
      </RightAligned>
      <LogoutModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onLogout={handleLogoutConfirm}
      />
    </StyledNav>
  );
}
