import { createGlobalStyle } from "styled-components";

export const lightTheme = {
    body: "#FFFFFF",
    fontColor: "#231F20",

};

export const darkTheme = {
    body: "#231F20",
    fontColor: '#FFFFFF',

};

export const GlobalStyles = createGlobalStyle`
	body {
		background-color: ${(props) => props.theme.body};
	}
`;