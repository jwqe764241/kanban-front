import styled from "styled-components";

const Container = styled.div`
  display: flex;
  height: 70px;
`;

const Brand = styled.a`
  background-color: #868fdb;
  width: 150px;
  display: -webkit-flexbox;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  font-weight: 800;
  color: white;
  transition: background-color 0.2s ease;
  cursor: pointer;

  :hover {
    text-decoration: none;
    color: white;
    background-color: #7c84c1;
  }
`;

const Tools = styled.div`
  display: flex;
  flex-grow: 1;
  padding-left: 25px;
  background: linear-gradient(to right, #9aa7fb, #70b3f8);
`;

const SearchIcon = () => {
  return (
    <div style={{ padding: "0px 10px 0px 0px" }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-search"
        viewBox="0 0 16 16"
        style={{ height: "100%", color: "white" }}
      >
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
      </svg>
    </div>
  );
};

const SearchInput = styled.input`
  flex-grow: 1;
  border: none;
  background: transparent;
  color: white;

  ::placeholder {
    color: white;
  }

  :focus {
    outline: none;
  }
`;

const Menubar = styled.div`
  margin-left: auto;
`;

function Navbar(props) {
  return (
    <Container>
      <Brand>Kanban</Brand>
      <Tools>
        <SearchIcon />
        <SearchInput type="text" placeholder="Search for tasks..." />
        <Menubar />
      </Tools>
    </Container>
  );
}

export default Navbar;
