import { useRouter } from "next/router";
import styled from "styled-components";
import Link from "next/link";
import axios from "core/apiAxios";

import Dropdown from "components/layout/Dropdown";
import HomeIcon from "public/icons/home.svg";
import SettingIcon from "public/icons/setting.svg";
import SignoutIcon from "public/icons/signout.svg";

const Container = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 0.25rem;
  z-index: 10;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
`;

const Item = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1em;
  height: 1em;
  font-size: 2rem;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.1s ease;
`;

const ButtonItem = styled(Item)`
  border-radius: 2px;
  background-color: ${({ theme }) => theme.colors.secondary};

  &:hover {
    background-color: #00897b;
  }

  svg {
    width: 0.5em;
    height: 0.5em;
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
              <SettingIcon />
            </ButtonItem>
          </Dropdown.Toggle>
          <Dropdown.Menu position={{ right: "0", top: "2.25rem" }}>
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
