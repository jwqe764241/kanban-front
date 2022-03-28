import styled from "styled-components";

export const Title = styled.div`
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
  font-weight: 700;
`;

export const Description = styled.div`
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.darkgray60};
`;

export const HorizontalRule = styled.hr`
  height: 0;
  margin-top: 1rem;
  overflow: hidden;
  background: transparent;
  border: 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray20};
`;
