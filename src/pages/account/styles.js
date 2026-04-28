import { Button } from '@/common/components/atoms/Button';
import styled from 'styled-components';

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 25%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 40px;
`;

export const StyledPage = styled.div`
  flex: 1 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledButton = styled(Button.Primary)`
  font-size: 1.1rem;
  width: content;
  padding-left: 30px;
  padding-right: 30px;
  margin-left: auto;
  margin-right: auto;
  color: --cworange;
`;
