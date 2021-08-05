import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
`;

const NoneStyledButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const DropdownList = styled.ul`
  position: absolute;
  z-index: 100;
  width: 160px;
  right: 0px;
  top: 30px;
  padding: 4px 0px;
  border: 1px solid #e1e4e8;
  background-color: white;
  border-radius: 6px;
  user-select: none;
`;

const DropdownButton = styled.button`
  color: #24292e;
  font-size: 14px;
  font-weight: 300;
  padding: 6px 5px 6px 20px;
  cursor: pointer;
  background: transparent;
  border: none;
  width: 100%;
  text-align: left;

  &:hover {
    background-color: #00509d;
    color: white;
  }
`;

const DropdownMenu = (props) => {
  const { innerRef, icon, children } = props;
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkIsClickedOutside = (e) => {
      if (isOpen && innerRef.current && !innerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", checkIsClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIsClickedOutside);
    };
  }, [isOpen]);

  const onMenuButtonClick = () => {
    setIsOpen(true);
  };

  return (
    <Container>
      <NoneStyledButton type="button" onClick={onMenuButtonClick}>
        {icon}
      </NoneStyledButton>
      {isOpen && <DropdownList ref={innerRef}>{children}</DropdownList>}
    </Container>
  );
};

DropdownMenu.propTypes = {
  innerRef: PropTypes.object.isRequired,
  icon: PropTypes.node.isRequired,
  children: PropTypes.node,
};

DropdownMenu.defaultProps = {
  children: <></>,
};

const IconWrap = styled.div`
  display: flex;
  align-items: center;
`;

const PlusIcon = styled.div`
  margin-right: 5px;
  display: flex;
  align-items: center;
`;

const Avatar = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
  background-color: white;
  border-radius: 50% !important;
`;

const Caret = styled.span`
  width: 0;
  height: 0;
  border-bottom: 0 solid transparent;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top-style: solid;
  border-top-width: 4px;
  content: "";
  display: inline-block;
  vertical-align: middle;
  color: white;
`;

const ProjectMenuIcon = () => {
  return (
    <IconWrap>
      <PlusIcon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="white"
          className="bi bi-plus-lg"
          viewBox="0 0 16 16"
        >
          <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
        </svg>
      </PlusIcon>
      <Caret />
    </IconWrap>
  );
};

const UserMenuIcon = () => {
  return (
    <IconWrap>
      <Avatar />
      <Caret />
    </IconWrap>
  );
};

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

export { DropdownMenu, DropdownButton, ProjectDropdown, UserDropdown };
