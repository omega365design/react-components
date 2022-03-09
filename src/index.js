import ReactDOM from "react-dom";
import { ChakraProvider, Flex, Box, ColorModeScript } from "@chakra-ui/react";
import CalendarBox from "./components/CalendarBox";
import { extendTheme } from "@chakra-ui/react";

let theme = extendTheme({
  components: {
    Button: {
      variants: {
        "calendar-disabled": {
          textDecoration: "line-through",
        },
        "calendar-selected": {
          color: "white",
          bg: "black",
        },
        "calendar-selected-between": {
          color: "black",
          bg: "gray.300",
        },
        calendar: {
          color: "black",
          bg: "transparent",
        },
      },
    },
  },
});

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <ColorModeScript />
    <Flex height="100vh" justifyContent="center" alignItems="center">
      <CalendarBox />
    </Flex>
  </ChakraProvider>,
  document.getElementById("root")
);
