import styled from "styled-components";

export const DropdownIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-three-dots"
      viewBox="0 0 16 16"
    >
      <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
    </svg>
  );
};

// eslint-disable-next-line react/prop-types
export const RemoveIcon = ({ style }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      style={style}
      className="bi bi-x"
      viewBox="0 0 16 16"
    >
      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
    </svg>
  );
};

// eslint-disable-next-line react/prop-types
const PlusIcon = ({ style }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="white"
      style={style}
      className="bi bi-plus-lg"
      viewBox="0 0 16 16"
    >
      <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
    </svg>
  );
};

const AvatarIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
  background-color: white;
  border-radius: 50% !important;
`;

const CaretIcon = styled.span`
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

const IconWrap = styled.div`
  display: flex;
  align-items: center;
`;

export const ProjectMenuIcon = () => {
  return (
    <IconWrap>
      <PlusIcon
        style={{ marginRight: "5px", display: "flex", alignItems: "center" }}
      />
      <CaretIcon />
    </IconWrap>
  );
};

export const UserMenuIcon = () => {
  return (
    <IconWrap>
      <AvatarIcon />
      <CaretIcon />
    </IconWrap>
  );
};
