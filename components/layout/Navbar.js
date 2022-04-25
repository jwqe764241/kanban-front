import { useRouter } from "next/router";
import styled from "styled-components";
import PropTypes from "prop-types";
import Link from "next/link";

import Dropdown from "components/layout/Dropdown";
import BackIcon from "public/icons/back.svg";
import HomeIcon from "public/icons/home.svg";
import PlusIcon from "public/icons/plus.svg";
import ListIcon from "public/icons/list.svg";
import SignoutIcon from "public/icons/signout.svg";

const Container = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 0.25rem;
  z-index: 10;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 0.5rem;
`;

const ButtonItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  text-align: center;
  cursor: pointer;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.secondaryLight};
  transition: background-color 0.1s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondaryLightHover};
  }

  svg {
    width: 1rem;
    height: 1rem;
    fill: ${({ theme }) => theme.colors.white};
  }
`;

const Navbar = ({ kanban }) => {
  const router = useRouter();

  const onSignout = () => {
    router.push("/logout");
  };

  return (
    <Container>
      <ButtonContainer>
        {kanban ? (
          <Link href={`/projects/${kanban.projectId}/kanbans`}>
            <ButtonItem>
              <BackIcon />
            </ButtonItem>
          </Link>
        ) : (
          <></>
        )}
        <Link href="/projects">
          <ButtonItem>
            <HomeIcon />
          </ButtonItem>
        </Link>
      </ButtonContainer>
      <ButtonContainer>
        <Link href="/projects/new">
          <ButtonItem>
            <PlusIcon />
          </ButtonItem>
        </Link>
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
      </ButtonContainer>
    </Container>
  );
};

Navbar.propTypes = {
  kanban: PropTypes.shape({
    projectId: PropTypes.number,
    sequenceId: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    createdAt: PropTypes.string,
  }),
};

Navbar.defaultProps = {
  kanban: null,
};

export default Navbar;
