import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.l};

  display: flex;
  flex-direction: column;

  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
`;

export const Header = styled.header`
  padding: ${({ theme }) => theme.spacing.l} 0;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;
export const Main = styled.main`
  position: relative;
`;
