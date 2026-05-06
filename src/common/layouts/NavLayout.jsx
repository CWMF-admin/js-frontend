import { Outlet } from 'react-router-dom';

import NavBar from '@/common/components/navigation/NavBar';
import styled from 'styled-components';
import { useState } from 'react';
const Layout = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: row;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Content = styled.div`
  flex: 1;
  transition: margin-left 0.2s ease;
  margin-left: ${({ toggle }) => (toggle ? '22%' : '7%')};
  @media (max-width: 768px) {
    margin-left: 0;
  }
`;
export default function NavLayout() {
  const [toggle, setToggle] = useState(false);
  return (
    <Layout>
      <NavBar toggle={toggle} setToggle={setToggle} />
      <Content toggle={toggle}>
      <Outlet />
      </Content>
    </Layout>
  );
}
