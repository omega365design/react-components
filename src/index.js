import ReactDOM from "react-dom";
import { ChakraProvider, Flex, Box, ColorModeScript } from "@chakra-ui/react";
import CalendarBox from "./components/CalendarBox";

ReactDOM.render(
  <ChakraProvider>
    <ColorModeScript />
    <Flex height="100vh" justifyContent="center" alignItems="center">
      <CalendarBox />
    </Flex>
  </ChakraProvider>,
  document.getElementById("root")
);
