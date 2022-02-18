import { useRouter } from "next/router";
import styled from "styled-components";
import Link from "next/link";
import axios from "core/apiAxios";

import Dropdown from "components/layout/Dropdown";
import HomeIcon from "public/icons/home.svg";
import SignoutIcon from "public/icons/signout.svg";

const Container = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 4rem;
  flex-basis: 4rem;
  flex-shrink: 0;
  z-index: 10;
  background-color: ${({ theme }) => theme.colors.spaceCadet};
  color: ${({ theme }) => theme.colors.white};
`;

const ItemContainer = styled.ul`
  margin-top: ${({ theme }) => theme.margins.sm};
`;

const Item = styled.li`
  padding: 1rem;
  height: 4rem;
  font-size: 1.25rem;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.1s ease;
`;

const ButtonItem = styled(Item)`
  &:hover {
    background-color: ${({ theme }) => theme.colors.unitedNationsBlue};
  }

  & > * {
    width: 1em;
    height: 1em;
    vertical-align: -0.5rem;
  }
`;

const UserIcon = styled.img`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 50% !important;
  width: 100%;
  height: 100%;
`;

const Sidebar = () => {
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
      <ItemContainer>
        <Link href="/">
          <ButtonItem>
            <HomeIcon />
          </ButtonItem>
        </Link>
      </ItemContainer>
      <ItemContainer>
        <Item>
          <Dropdown>
            <Dropdown.Toggle>
              <UserIcon />
            </Dropdown.Toggle>
            <Dropdown.Menu position={{ top: "-0.25rem", left: "3.5rem" }}>
              <Dropdown.Item onClick={onSignout}>
                <SignoutIcon />
                Sign out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Item>
      </ItemContainer>
    </Container>
  );
};

export default Sidebar;
