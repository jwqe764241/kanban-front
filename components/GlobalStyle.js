import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  ${reset}
  @font-face {
    font-family: "NanumGothic";
    src: url("/font/NanumGothic-Regular.woff2") format("woff2"),
      url("/font/NanumGothic-Regular.woff") format("woff");
    font-weight: 400;
    font-display: swap;
  }
  
  @font-face {
    font-family: "NanumGothic";
    src: url("/font/NanumGothic-Bold.woff2") format("woff2"),
      url("/font/NanumGothic-Bold.woff") format("woff");
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }
  
  @font-face {
    font-family: "NanumGothic";
    src: url("/font/NanumGothic-ExtraBold.woff2") format("woff2"),
      url("/font/NanumGothic-ExtraBold.woff") format("woff");
    font-weight: 800;
    font-style: normal;
    font-display: swap;
  }
  
  @font-face {
    font-family: "NotoSansKR";
    src: url("/font/NotoSansKR-100.woff2") format("woff2"),
      url("/font/NotoSansKR-100.woff") format("woff");
    font-weight: 100;
    font-display: swap;
  }
  
  @font-face {
    font-family: "NotoSansKR";
    src: url("/font/NotoSansKR-300.woff2") format("woff2"),
      url("/font/NotoSansKR-300.woff") format("woff");
    font-weight: 300;
    font-display: swap;
  }
  
  @font-face {
    font-family: "NotoSansKR";
    src: url("/font/NotoSansKR-regular.woff2") format("woff2"),
      url("/font/NotoSansKR-regular.woff") format("woff");
    font-weight: 400;
    font-display: swap;
  }
  
  @font-face {
    font-family: "NotoSansKR";
    src: url("/font/NotoSansKR-500.woff2") format("woff2"),
      url("/font/NotoSansKR-500.woff") format("woff");
    font-weight: 500;
    font-display: swap;
  }
  
  @font-face {
    font-family: "NotoSansKR";
    src: url("/font/NotoSansKR-700.woff2") format("woff2"),
      url("/font/NotoSansKR-700.woff") format("woff");
    font-weight: 700;
    font-display: swap;
  }
  
  @font-face {
    font-family: "NotoSansKR";
    src: url("/font/NotoSansKR-900.woff2") format("woff2"),
      url("/font/NotoSansKR-900.woff") format("woff");
    font-weight: 900;
    font-display: swap;
  }
  
  * {
    box-sizing: border-box;
  }
  
  html * {
    font-family: "NotoSansKR";
    line-height: 1.5em;
  }
  
  html,
  body,
  div#__next {
    height: 100%;
  }
`;

export default GlobalStyle;
