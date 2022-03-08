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
`;

export default GlobalStyle;
