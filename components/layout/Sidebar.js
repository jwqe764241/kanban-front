import { useRouter } from "next/router";
import styled from "styled-components";
import Link from "next/link";
import axios from "core/apiAxios";

import { DropdownMenu, DropdownButton } from "components/layout/Dropdown";
import HomeIcon from "public/icons/home.svg";
import ProjectIcon from "public/icons/project.svg";

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

  & > * {
    width: 1em;
    height: 1em;
    vertical-align: -0.5rem;
  }
`;

const ButtonItem = styled(Item)`
  &:hover {
    background-color: ${({ theme }) => theme.colors.unitedNationsBlue};
  }
`;

const UserItem = styled(Item)`
  & > img {
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 50% !important;
  }
`;

const Sidebar = () => {
  return (
    <Container>
      <ItemContainer>
        <ButtonItem>
          <Link href="/">
            <HomeIcon />
          </Link>
        </ButtonItem>
      </ItemContainer>
      <ItemContainer>
        <UserItem>
          <img alt="" />
        </UserItem>
      </ItemContainer>
    </Container>
  );
};

export default Sidebar;
