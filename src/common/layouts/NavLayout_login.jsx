import { Outlet } from 'react-router-dom';

import styled from 'styled-components';

import NavBar_login from '@/common/components/navigation/NavBar_login';

const Layout = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export default function NavLayout() {
  return (
    <Layout>
      <NavBar_login />
      <Outlet />
    </Layout>
  );
}
