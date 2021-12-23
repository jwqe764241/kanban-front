import PropTypes from "prop-types";
import styled from "styled-components";
import Link from "next/link";

const Container = styled.div`
  grid-column: 1;
`;

const MenuContainer = styled.div`
  background-color: #f6f8fa;
  border: 1px solid #d0d7de;
  border-radius: 6px;
`;

const Menu = styled.a`
  width: 100%;
  display: flex;
  padding: 16px;
  font-size: 14px;
  font-weight: 300;
  border-top: 1px solid #d0d7de;
  cursor: pointer;
  ${(props) =>
    props.active
      ? `
	background-color: white;
	border-left: 2px solid #f9826c;
 `
      : ""}

  &:first-child {
    border-top: none;
  }

  &:hover {
    background-color: ${(props) => (!props.active ? "#f0f3f6" : "")};
  }
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
  ];

  return (
    <Container>
      <MenuContainer>
        {list.map((menu) => (
          <Link key={menu.id} href={menu.href}>
            <Menu active={menu.id === activeMenu}>{menu.name}</Menu>
          </Link>
        ))}
      </MenuContainer>
    </Container>
  );
};

Sidebar.propTypes = {
  id: PropTypes.number.isRequired,
  activeMenu: PropTypes.string.isRequired,
};

export default Sidebar;
