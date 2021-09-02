import styled from "styled-components";

const Container = styled.div`
  box-sizing: content-box;
  margin: 40px auto;
  padding: 0px 30px;
`;

const ContainerMd = styled(Container)`
  width: 720px;
`;

const ContainerLg = styled(Container)`
  width: 960px;
`;

const ContainerXL = styled(Container)`
  width: 1280px;
`;

export { Container, ContainerMd, ContainerLg, ContainerXL };
