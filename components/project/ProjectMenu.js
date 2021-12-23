import Link from "next/link";
import styled from "styled-components";
import PropTypes from "prop-types";

const MenuContainer = styled.div`
  margin-top: 25px;
`;

const MenuItem = styled.span`
  font-size: 14px;
  text-decoration: none;
  margin-right: 10px;
  cursor: pointer;
  color: ${(props) => (props.active ? "#212427" : "#9e9e9e")};
  transition: color 0.1s ease;
  padding: 0px 15px 16px 15px;
  border-bottom: ${(props) => (props.active ? "2px solid #f9826c;" : "none")};
  font-weight: ${(props) => (props.active ? "500" : "300")};

  ${(props) => (!props.active ? "&:hover { color: #212427 }" : "")};
`;

const ProjectMenu = ({ id, activeMenu }) => {
  const list = [
    {
      id: "kanbans",
      name: "Kanbans",
      href: `/projects/${id}/kanbans`,
    },
    {
      id: "members",
      name: "Members",
      href: `/projects/${id}/members`,
    },
    {
      id: "settings",
      name: "Settings",
      href: `/projects/${id}/settings`,
    },
  ];

  return (
    <MenuContainer>
      {list.map((menu) => (
        <Link key={menu.id} href={menu.href}>
          <MenuItem active={menu.id === activeMenu}>{menu.name}</MenuItem>
        </Link>
      ))}
    </MenuContainer>
  );
};

ProjectMenu.propTypes = {
  id: PropTypes.number.isRequired,
  activeMenu: PropTypes.string.isRequired,
};

export default ProjectMenu;
