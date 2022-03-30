import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import Link from "next/link";

const Container = styled.div`
  align-self: flex-start;
  max-width: 280px;
  min-width: 280px;
  margin-right: 1rem;
  padding: 0 1rem;
`;

const MenuList = styled.ul`
  list-style: none;
  color: ${({ theme }) => theme.colors.darkgray70};
`;

const Item = styled.li`
  width: 100%;
  margin: 0.25rem 0;
  padding: 0.5rem;
  padding-left: 2rem;
  font-size: 0.875rem;
  font-weight: 300;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme, active }) =>
      !active ? theme.colors.darkgray30 : ""};
  }

  ${({ theme, active }) =>
    active &&
    css`
      font-weight: 700;
      color: ${theme.colors.primaryDark};
      background-color: #d6eaf5;
    `}
`;

const Sidebar = ({ id, activeMenu }) => {
  const list = [
    {
      id: "options",
      name: "Options",
      href: `/projects/${id}/settings`,
    },
    {
      id: "members",
      name: "Members",
      href: `/projects/${id}/settings/members`,
    },
    {
      id: "invitations",
      name: "Invitations",
      href: `/projects/${id}/settings/invitations`,
    },
  ];

  return (
    <Container>
      <MenuList>
        {list.map((menu) => (
          <Link key={menu.id} href={menu.href}>
            <Item active={menu.id === activeMenu}>{menu.name}</Item>
          </Link>
        ))}
      </MenuList>
    </Container>
  );
};

Sidebar.propTypes = {
  id: PropTypes.number.isRequired,
  activeMenu: PropTypes.string.isRequired,
};

export default Sidebar;
