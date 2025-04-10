import { createTheme } from "@mui/material"


const CustomTheme = createTheme({
  palette: {
    mode: "light",
    primary:{ // primary color
      main: "#00927c" // teal
      // ui colour picker
    },
    secondary: {
      main: "#eaf0f1"
    }
  }
})

export default CustomTheme