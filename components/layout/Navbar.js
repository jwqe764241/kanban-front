import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import axios from "core/apiAxios";
import PropTypes from "prop-types";

import { DropdownMenu, DropdownButton } from "components/layout/Dropdown";
import { ProjectMenuIcon, UserMenuIcon } from "components/layout/Icon";

const Container = styled.div`
  display: flex;
  padding: 16px 32px;
  background-color: #24292e;
`;

const Brand = styled.a`
  display: flex;
  height: 30px;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 800;
  color: white;
  cursor: pointer;
  padding-right: 30px;
  text-decoration: none;

  :hover {
    color: lightgrey;
  }
`;

const Tools = styled.div`
  display: flex;
  flex-grow: 1;
`;

const UserInfo = styled.div`
  padding: 8px 16px;
  border-bottom: 1px solid #e1e4e8;

  div {
    font-size: 14px;

    &:nth-child(1) {
      font-weight: 400;
      padding-bottom: 8px;
    }

    &:nth-child(2) {
      font-weight: 600;
    }
  }
`;

const DropdownWrap = styled.div`
  align-self: center;
`;

const Navbar = ({ name }) => {
  const router = useRouter();

  const onSignout = async () => {
    try {
      const response = await axios.post("/auth/sign-out", null, {
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
      <Link href="/">
        <Brand>Kanban</Brand>
      </Link>
      <Tools />
      {/* Project Menu */}
      <DropdownWrap>
        <DropdownMenu icon={<ProjectMenuIcon />}>
          <Link href="/projects/new">
            <DropdownButton type="button">New Project</DropdownButton>
          </Link>
        </DropdownMenu>
      </DropdownWrap>
      {/* User Menu */}
      <DropdownWrap>
        <DropdownMenu icon={<UserMenuIcon />}>
          <UserInfo>
            <div>Signed in as</div>
            <div>{name}</div>
          </UserInfo>
          <DropdownButton type="button" onClick={onSignout}>
            Sign out
          </DropdownButton>
        </DropdownMenu>
      </DropdownWrap>
    </Container>
  );
};

Navbar.propTypes = {
  name: PropTypes.string,
};

Navbar.defaultProps = {
  name: "",
};

export default Navbar;
