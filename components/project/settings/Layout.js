import styled from "styled-components";

export const Layout = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-gap: 30px;
`;

export const Body = styled.div`
  grid-column-start: 2;
`;

export const Title = styled.div`
  font-size: 20px;
  font-weight: 400;
  padding-bottom: 10px;
  margin-bottom: 20px;
  border-bottom: 1px solid #e1e4e8;
`;
