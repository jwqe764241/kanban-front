import { useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  position: relative;
  margin-right: 15px;
`;

const NoneStyledButton = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const PlusIcon = styled.div`
  margin-right: 5px;
  display: flex;
  align-items: center;
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

function ProjectDropdown(props) {
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

  const onMenuButtonClick = () => {
    setIsOpen(true);
  };

  return (
    <Container>
      <NoneStyledButton type="button" onClick={onMenuButtonClick}>
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
      </NoneStyledButton>

      {isOpen && (
        <DropdownList ref={innerRef}>
          <Link href="/new">
            <DropdownButton type="button">Add Project</DropdownButton>
          </Link>
        </DropdownList>
      )}
    </Container>
  );
}

ProjectDropdown.propTypes = {
  innerRef: PropTypes.object.isRequired,
};

export default ProjectDropdown;
