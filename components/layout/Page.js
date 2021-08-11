import PropTypes from "prop-types";
import styled from "styled-components";

const HeaderContainer = styled.div`
  margin-bottom: 40px;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 10px;
`;

const Description = styled.div`
  font-size: 14px;
  font-weight: 300;
  color: slategrey;
`;

const Header = (props) => {
  const { title, description } = props;

  return (
    <HeaderContainer>
      <Title>{title}</Title>
      {description && <Description>{description}</Description>}
    </HeaderContainer>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

Header.defaultProps = {
  description: undefined,
};

const Body = styled.div`
  width: 100%;
`;

export { Header, Body };
