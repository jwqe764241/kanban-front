import styled from "styled-components";
import Link from "next/link";
import PropTypes from "prop-types";
import { getDateString } from "core/utils";

import SettingIcon from "public/icons/setting.svg";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1.5rem 3rem;
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.platinum};
`;

const Name = styled.span`
  display: inline-block;
  margin-right: 10px;
  color: ${({ theme }) => theme.colors.darkGray};
  font-size: 1.25rem;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Date = styled.span`
  color: ${({ theme }) => theme.colors.gray};
  font-size: 0.75rem;
  font-weight: 400;
`;

const SettingLink = styled.a`
  color: ${({ theme }) => theme.colors.darkGray};
  cursor: pointer;

  & > svg {
    width: 1.25rem;
    height: 1.25rem;
    vertical-align: middle;
    transition: transform 0.5s ease;
  }

  &:hover > svg {
    transform: rotate(180deg);
  }
`;

const ProjectHeader = ({ project }) => {
  const { id, name, createdAt } = project;
  return (
    <Container>
      <div>
        <Link href={`/projects/${id}/kanbans`}>
          <Name>{name}</Name>
        </Link>
        <Date>{getDateString(createdAt)}</Date>
      </div>
      <div>
        <Link href={`/projects/${id}/settings`}>
          <SettingLink>
            <SettingIcon />
          </SettingLink>
        </Link>
      </div>
    </Container>
  );
};

ProjectHeader.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    description: PropTypes.string,
    registerUsername: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired,
};

export default ProjectHeader;
