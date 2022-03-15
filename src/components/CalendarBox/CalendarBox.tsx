import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Icon,
  IconButton,
  Input,
  Tag,
  Text,
  useBoolean,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Calendar from "../Calendar/Calendar";
import "./CalendarBox.css";
import { AiOutlineRedo } from "react-icons/ai";
import TimePicker from "react-time-picker";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import {
  addMonths,
  addDays,
  format,
  isAfter,
  differenceInDays,
  subMonths,
  areIntervalsOverlapping,
  isEqual,
  setHours,
  setMinutes,
  isSameDay,
  addHours,
  isBefore,
} from "date-fns";
import nb from "date-fns/locale/nb";
import { isBetween, ucfirst } from "../../helpers/functions";
import { RenderCellOptions } from "../../helpers/types";

interface CalendarBoxProps {
  title?: string;
}

function CalendarBox({ title = "Velg dato" }: CalendarBoxProps) {
  let { isOpen, onOpen, onClose } = useDisclosure();
  let [currentDate, setDate] = useState(new Date());
  let [fromDate, setFrom] = useState(null);
  let [toDate, setTo] = useState(null);

  let onCellClick = (options: any) => {
    if (fromDate && toDate) {
      setFrom(null);
      setTo(null);
    } else if (!fromDate) {
      setFrom(options.cellDate);
    } else if (!toDate && isAfter(options.cellDate, fromDate)) {
      setTo(options.cellDate);
    }
  };

  return (
    <>
      <Box
        width="280px"
        height="auto"
        border="1px solid #ddd"
        borderRadius={10}
        p={5}
        boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px;"
      >
        <Text mb={5} fontSize="18px">
          {!(fromDate && toDate)
            ? "Legg til datoer."
            : "Fortsett for bestilling."}
        </Text>
        <DatesDisplay fromDate={fromDate} toDate={toDate} onOpen={onOpen} />

        <Button
          disabled={!(fromDate && toDate)}
          width="100%"
          colorScheme="orange"
        >
          Bestill
        </Button>
      </Box>

      <Modal size="2xl" isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex justify="space-between" mr={10}>
              <h3>Velg datoer</h3>
              <DatesDisplay
                fromDate={fromDate}
                toDate={toDate}
                onOpen={() => {}}
                fromLabel=""
                toLabel=""
                style={{ width: 280, height: 60 }}
                displayDateFormat="dd.MM.yy 'kl.' HH:mm"
              />
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="calendar-box">
              <Calendar
                date={currentDate}
                onPrev={(newDate) => setDate(newDate)}
                fromDate={fromDate}
                toDate={toDate}
                renderCell={(opt) => (
                  <SuperAdvancedCell
                    {...opt}
                    onClick={(options) => onCellClick(options)}
                  />
                )}
              />
              <Calendar
                date={addMonths(currentDate, 1)}
                onNext={(newDate) => setDate(subMonths(newDate, 1))}
                fromDate={fromDate}
                toDate={toDate}
                renderCell={(opt) => (
                  <SuperAdvancedCell
                    {...opt}
                    onClick={(options) => onCellClick(options)}
                  />
                )}
              />
            </div>
          </ModalBody>

          <ModalFooter>
            <Button
              leftIcon={<AiOutlineRedo />}
              variant="ghost"
              onClick={() => {
                setFrom(null);
                setTo(null);
              }}
              mr={3}
            >
              Tilbakestill
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Neste
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

function doesCellCollide(cellDate: Date, bookings: any[]) {
  return bookings.some(
    (booking) =>
      isBetween(cellDate, booking.from, booking.to) ||
      differenceInDays(cellDate, booking.from) == 0 ||
      differenceInDays(cellDate, booking.to) == 0
  );
}

function doesSelectionOverlapWithExistingBooking(
  fromDate: Date,
  toDate: Date,
  bookings: any[]
) {
  return bookings.some((booking) =>
    areIntervalsOverlapping(
      { start: fromDate, end: toDate },
      { start: booking.from, end: booking.to }
    )
  );
}

let DatesDisplay = ({
  style = {},
  toDate,
  fromDate,
  onOpen,
  fromLabel = "Legg til dato",
  toLabel = "Legg til dato",
  displayDateFormat = "eee PPP 'kl.' hh:mm",
}: any) => (
  <Grid
    style={style}
    gridTemplateColumns="1fr 1fr"
    gridTemplateRows="1fr 2fr"
    border="1px solid #ddd"
    borderRadius={10}
    p={2}
    mb={4}
    cursor="pointer"
    _hover={{
      bg: "gray.200",
    }}
    onClick={onOpen}
  >
    <GridItem fontSize="12px" fontWeight="bold">
      FRA
    </GridItem>
    <GridItem fontSize="12px" fontWeight="bold">
      TIL
    </GridItem>
    <GridItem
      fontSize="14px"
      fontWeight="normal"
      color={fromDate != null ? "black" : "gray"}
    >
      {fromDate != null
        ? ucfirst(format(fromDate, displayDateFormat, { locale: nb }))
        : fromLabel}
    </GridItem>
    <GridItem
      fontSize="14px"
      fontWeight="normal"
      color={toDate != null ? "black" : "gray"}
    >
      {toDate != null
        ? ucfirst(format(toDate, displayDateFormat, { locale: nb }))
        : toLabel}
    </GridItem>
  </Grid>
);

let SuperAdvancedCell = ({
  cellDate,
  isPast,
  isSelected,
  isBetween,
  index,
  onClick,
  fromDate,
  toDate,
}: RenderCellOptions & { onClick: (options: any) => void }) => {
  let { isOpen, onOpen, onClose } = useDisclosure();
  let [date, setDate] = useState(cellDate ?? null);

  let bookings = [
    {
      from: addDays(new Date(), 0),
      to: addDays(new Date(), 5),
    },
    {
      from: addDays(new Date(2022, 3, 5), 0),
      to: addDays(new Date(2022, 3, 5), 2),
    },
  ];

  if (!cellDate) return <div></div>;

  return (
    <>
      <Button
        _focus={{ outline: 0 }}
        disabled={isPast || doesCellCollide(cellDate, bookings)}
        borderRadius={0}
        size="md"
        m={0}
        variant={
          isPast || doesCellCollide(cellDate, bookings)
            ? "calendar-disabled"
            : isSelected
            ? "calendar-selected"
            : isBetween
            ? "calendar-selected-between"
            : "calendar"
        }
        onClick={() => {
          if (fromDate && toDate) {
            onClick({ cellDate });
            return;
          }

          if (fromDate) {
            if (
              isSameDay(fromDate, cellDate) &&
              differenceInDays(fromDate, cellDate) == 0
            ) {
              setDate(addHours(fromDate, 1));
              onOpen();
            } else if (isAfter(cellDate, fromDate)) {
              onOpen();
            } else if (
              !doesSelectionOverlapWithExistingBooking(
                fromDate,
                cellDate,
                bookings
              )
            ) {
              onOpen();
            }
          } else {
            onOpen();
          }
        }}
      >
        {cellDate?.getDate()}
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Velg tidspunkt</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <h2>
              {cellDate &&
                ucfirst(format(cellDate, "eeee PPP 'kl.'", { locale: nb }))}
            </h2>
            {cellDate && (
              <TimePicker
                autoFocus={true}
                onChange={(value) => {
                  let hours = value.toString().split(":")[0];
                  let minutes = value.toString().split(":")[1];
                  let date = setHours(cellDate, Number.parseInt(hours));
                  date = setMinutes(date, Number.parseInt(minutes));
                  setDate(date);
                }}
                value={date ?? ""}
              />
            )}
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Lukk
            </Button>
            <Button onClick={() => onClick({ cellDate: date })} variant="ghost">
              Velg
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CalendarBox;
