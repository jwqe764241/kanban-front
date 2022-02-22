import styled from "styled-components";

const ModalHeader = styled.div`
  padding: 1.25rem 1rem;
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.platinum};
`;

export default ModalHeader;
