import { useRef } from "react";
import styled from "styled-components";

import ProjectDropdown from "components/layout/ProjectDropdown";
import UserDropdown from "components/layout/UserDropdown";

const Container = styled.div`
  padding: 16px 32px;
  background-color: #24292e;
`;

const InnerContainer = styled.div`
  height: 30px;
  display: flex;
`;

const Brand = styled.a`
  padding-right: 30px;
  display: flex;
  -webkit-flex-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  justify-content: center;
  font-size: 19px;
  font-weight: 800;
  color: white;
  cursor: pointer;

  :hover {
    text-decoration: none;
    color: white;
  }
`;

const Tools = styled.div`
  display: flex;
  flex-grow: 1;
  padding-left: 25px;
`;

const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

function Navbar() {
  const ref = useRef();

  return (
    <Container>
      <InnerContainer>
        <Brand>Kanban</Brand>
        <Tools />
        <MenuContainer>
          <ProjectDropdown innerRef={ref} />
          <UserDropdown innerRef={ref} />
        </MenuContainer>
      </InnerContainer>
    </Container>
  );
}

export default Navbar;
