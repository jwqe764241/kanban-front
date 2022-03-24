import { useRouter } from "next/router";
import styled from "styled-components";
import Link from "next/link";
import axios from "core/apiAxios";

import Dropdown from "components/layout/Dropdown";
import HomeIcon from "public/icons/home.svg";
import ListIcon from "public/icons/list.svg";
import SignoutIcon from "public/icons/signout.svg";

const Container = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 4px;
  z-index: 10;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
`;

const ButtonItem = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  text-align: center;
  cursor: pointer;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.primaryLight};
  transition: background-color 0.1s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryLightHover};
  }

  svg {
    width: 1rem;
    height: 1rem;
    fill: ${({ theme }) => theme.colors.white};
  }
`;

const Navbar = () => {
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
      <div>
        <Link href="/">
          <ButtonItem>
            <HomeIcon />
          </ButtonItem>
        </Link>
      </div>
      <div>
        <Dropdown>
          <Dropdown.Toggle>
            <ButtonItem>
              <ListIcon />
            </ButtonItem>
          </Dropdown.Toggle>
          <Dropdown.Menu position={{ right: "0", top: "2.5rem" }}>
            <Dropdown.Item onClick={onSignout}>
              <SignoutIcon />
              Sign out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </Container>
  );
};

export default Navbar;
