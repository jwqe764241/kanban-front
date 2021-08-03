import { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  position: relative;
`;

const NoneStyledButton = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
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

const DropdownItem = styled.li`
  color: #24292e;
  font-size: 14px;
  font-weight: 300;
  padding: 6px 5px 6px 20px;
  cursor: pointer;

  &:hover {
    background-color: #00509d;
    color: white;
  }
`;

function UserDropdown(props) {
  const { innerRef } = props;
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (isOpen && innerRef.current && !innerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isOpen]);

  const onClick = () => {
    setIsOpen(true);
  };

  return (
    <Container>
      <NoneStyledButton type="button" onClick={onClick}>
        <Avatar />
        <Caret />
      </NoneStyledButton>
      {isOpen && (
        <DropdownList ref={innerRef}>
          <DropdownItem>Logout</DropdownItem>
        </DropdownList>
      )}
    </Container>
  );
}

UserDropdown.propTypes = {
  innerRef: PropTypes.object.isRequired,
};

export default UserDropdown;
