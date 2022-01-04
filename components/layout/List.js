import styled from "styled-components";

export const List = styled.div`
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  color: #24292e;
`;

export const ListHeader = styled.div`
  padding: 16px;
  margin: -1px -1px 0;
  background-color: #f6f8fa;
  border: 1px solid #e1e4e8;
  border-left-width: 1px;
  border-right-width: 1px;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
`;

export const ListItem = styled.div`
  padding: 16px;
  margin-top: -1px;
  border-top-style: solid;
  border-top-width: 1px;
  border-top-color: #e1e4e8;
`;

export const EmptyList = styled.div`
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  text-align: center;
  padding: 60px 0px;
  font-size: 18px;
  font-weight: 500;
`;
