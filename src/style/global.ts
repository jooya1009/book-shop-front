import { createGlobalStyle } from 'styled-components'
import 'sanitize.css'
import { ThemeName } from './theme'

interface Props {
    themeName: ThemeName
}

export const GlobalStyle = createGlobalStyle<Props>`
    body {
        padding: 0;
        margin: 0;
        background-color: ${(props) => props.themeName === "light" ? "white" : "#222"}
    }

    h1 {
        margin: 0;
        font-weight: 600;
    }

    strong {
        font-weight: 600;
    }

    * {
        color: ${(props) => props.themeName === "light" ? "#222" : "white"}
    }
`