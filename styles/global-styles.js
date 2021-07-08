import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
	${reset}

	@font-face{
	font-family:'NanumGothic';
	src: url('/font/NanumGothic-Regular.woff2') format('woff2'),
		url('/font/NanumGothic-Regular.woff') format('woff'),
	font-weight:400;
	font-display:swap;
	}

	@font-face{
	font-family:'NanumGothic';
	src: url('/font/NanumGothic-Bold.woff2') format('woff2'),
		url('/font/NanumGothic-Bold.woff') format('woff'),
	font-weight:700;
	font-style:normal;
	font-display:swap;
	}

	@font-face{
	font-family:'NanumGothic';
	src: url('/font/NanumGothic-ExtraBold.woff2') format('woff2'),
		url('/font/NanumGothic-ExtraBold.woff') format('woff'),
	font-weight:800;
	font-style:normal;
	font-display:swap;
	}

	html * {
		font-family: 'NanumGothic';
	}

	html,
      body,
      body > div:first-child,
      div#__next,
      div#__next > div {
        height: 100%;
      }
`;

export default GlobalStyle;
