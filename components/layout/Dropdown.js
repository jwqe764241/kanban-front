import { useState, useEffect } from "react";
import { useRouter } from "next/router";
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
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // close dropdown menu when user clicked outside
  useEffect(() => {
    const handleClick = (e) => {
      if (isOpen && innerRef.current && !innerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [isOpen]);

  // close dropdown menu when route changed
  useEffect(() => {
    const handleRouteChange = () => {
      setIsOpen(false);
    };
    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.asPath]);

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

export { DropdownMenu, DropdownButton };
