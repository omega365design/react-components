import ReactDOM from "react-dom";
import {
  ChakraProvider,
  Flex,
  Box,
  ColorModeScript,
  Button,
} from "@chakra-ui/react";
import CalendarBox from "./components/CalendarBox";
import Calendar from "./components/Calendar";
import { extendTheme } from "@chakra-ui/react";
import React, { useState } from "react";

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

function App() {
  let [date, setDate] = useState(new Date());

  return (
    <Calendar
      date={date}
      onPrev={(date) => setDate(date)}
      onNext={(date) => setDate(date)}
      nextButton={Button}
      renderCell={({ cellDate }) => (
        <div>{cellDate ? cellDate.getDate() : ""}</div>
      )}
    />
  );
}

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <ColorModeScript />
    <Flex height="100vh" justifyContent="center" alignItems="center">
      {/* <CalendarBox /> */}
      <Box width="400px" height="400px">
        <App />
      </Box>
    </Flex>
  </ChakraProvider>,
  document.getElementById("root")
);
