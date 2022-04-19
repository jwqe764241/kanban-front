import { useRouter } from "next/router";
import styled from "styled-components";

import ChevronRightIcon from "public/icons/chevron-right.svg";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5rem;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
`;

const Message = styled.div`
  margin-bottom: 2rem;
  font-size: 1.5rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.darkgray70};
`;

const Hint = styled.div`
  margin-bottom: 2rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.darkgray60};
`;

const PageLink = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 2px;
  border-bottom: 1px solid;
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primaryLight};
  cursor: pointer;
  transition: background-color 0.1s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryLightHover};
  }

  &:first-child {
    margin-right: 3rem;
  }

  & > svg {
    width: 0.75em;
    height: 0.75em;
    margin-top: 2px;
    margin-left: 2px;
  }
`;

const Error404 = () => {
  const router = useRouter();

  return (
    <Container>
      <MessageContainer>
        <Message>
          Sorry, the page you were looking for doesn&apos;t exist
        </Message>
        <Hint>
          The link you were looking for may be broken, or the page may have been
          removed.
        </Hint>
        <div>
          <PageLink onClick={() => router.push("/projects")}>
            <span>Go to homepage</span>
            <ChevronRightIcon />
          </PageLink>
          <PageLink onClick={() => router.back()}>
            <span>Go to previous page</span>
            <ChevronRightIcon />
          </PageLink>
        </div>
      </MessageContainer>
    </Container>
  );
};

export default Error404;
