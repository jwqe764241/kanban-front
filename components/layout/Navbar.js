import { useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import axios from "core/apiAxios";
import PropTypes from "prop-types";

import { DropdownMenu, DropdownButton } from "components/layout/Dropdown";
import { ProjectMenuIcon, UserMenuIcon } from "components/layout/Icon";

const ProjectDropdown = ({ innerRef, children }) => {
  return (
    <DropdownMenu icon={<ProjectMenuIcon />} innerRef={innerRef}>
      {children}
    </DropdownMenu>
  );
};

ProjectDropdown.propTypes = {
  innerRef: PropTypes.object.isRequired,
  children: PropTypes.node,
};

ProjectDropdown.defaultProps = {
  children: <></>,
};

const UserDropdown = ({ innerRef, children }) => {
  return (
    <DropdownMenu icon={<UserMenuIcon />} innerRef={innerRef}>
      {children}
    </DropdownMenu>
  );
};

UserDropdown.propTypes = {
  innerRef: PropTypes.object.isRequired,
  children: PropTypes.node,
};

UserDropdown.defaultProps = {
  children: <></>,
};

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
    color: lightgrey;
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
  justify-content: center;
  margin-left: auto;

  & > * {
    margin-right: 5px;

    &:last-child {
      margin-right: 0px;
    }
  }
`;

const UserInfo = styled.div`
  padding: 5px 10px 8px 20px;
  border-bottom: 1px solid #e1e4e8;

  div {
    &:nth-child(1) {
      font-weight: 400;
      font-size: 14px;
      padding-bottom: 8px;
    }

    &:nth-child(2) {
      font-weight: 600;
      font-size: 14px;
    }
  }
`;

function Navbar(props) {
  const ref = useRef();
  const router = useRouter();
  const { username } = props;

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
        <Link href="/">
          <Brand>Kanban</Brand>
        </Link>
        <Tools />
        <MenuContainer>
          <ProjectDropdown innerRef={ref}>
            <Link href="/new">
              <DropdownButton type="button">New Project</DropdownButton>
            </Link>
          </ProjectDropdown>
          <UserDropdown innerRef={ref}>
            <UserInfo>
              <div>Signed in as</div>
              <div>{username}</div>
            </UserInfo>
            <DropdownButton type="button" onClick={onLogoutClick}>
              Logout
            </DropdownButton>
          </UserDropdown>
        </MenuContainer>
      </InnerContainer>
    </Container>
  );
}

Navbar.propTypes = {
  username: PropTypes.string,
};

Navbar.defaultProps = {
  username: "",
};

export default Navbar;
