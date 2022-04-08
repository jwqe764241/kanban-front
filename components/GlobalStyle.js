import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
  }
  
  html * {
    font-family: "NotoSansKR";
  }
  
  html,
  body,
  div#__next {
    height: 100%;
  }

  body {
    background-color: #f2f4f6;
  }

  button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
`;

export default GlobalStyle;
