import { useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import axios from "core/apiAxios";

import {
  DropdownButton,
  ProjectDropdown,
  UserDropdown,
} from "components/layout/Dropdown";

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
  const router = useRouter();

  const onLogoutClick = async () => {
    try {
      const response = await axios.post("/auth/logout", null, {
        withCredentials: true,
      });

      if (response.status === 200) {
        router.push("/login");
      }
    } catch (e) {
      // TODO: replace alert to modal
      alert("Failed to logout!");
    }
  };

  return (
    <Container>
      <InnerContainer>
        <Brand>Kanban</Brand>
        <Tools />
        <MenuContainer>
          <ProjectDropdown innerRef={ref}>
            <Link href="/new">
              <DropdownButton type="button">New Project</DropdownButton>
            </Link>
          </ProjectDropdown>
          <UserDropdown innerRef={ref}>
            <DropdownButton type="button" onClick={onLogoutClick}>
              Logout
            </DropdownButton>
          </UserDropdown>
        </MenuContainer>
      </InnerContainer>
    </Container>
  );
}

export default Navbar;
