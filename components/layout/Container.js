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

export { Container, ContainerMd, ContainerLg };
