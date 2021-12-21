import styled from "styled-components";

const Container = styled.div`
  box-sizing: border-box;
  margin: 40px auto;
  padding: 0px 30px;
  width: 100%;
`;

const ContainerMd = styled(Container)`
  max-width: 720px;
`;

const ContainerLg = styled(Container)`
  max-width: 960px;
`;

const ContainerXL = styled(Container)`
  max-width: 1280px;
`;

export { Container, ContainerMd, ContainerLg, ContainerXL };
