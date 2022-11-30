import React from 'react';
import { Flex, Grid, GridItem } from '@chakra-ui/react';
import { CalendarBuilderDate, getDate, WEEK_DAYS } from './calenderBuilder';
import calendarBuilder, { isSameDay, isSameMonth } from './calenderBuilder';
import { CalendarHeader } from './header';

interface ICalendarBase {
  start: string | null;
  setStart: (e: string) => void;
  end: string | null;
  setEnd: (e: string) => void;
  hover: string | null;
  setHover: (e: string) => void;
  checkLies: (e: string) => boolean;
  hasRangeSelect: boolean;
  currentDate: Date;
  setCurrentDate: (e: Date) => void;
  todayDateColor: string;
  selectedDateColor: string;
  dateHoverColor: string;
  hasNextButton?: boolean;
  hasPreviousButton?: boolean;
}

export const CalendarBase = ({
  start,
  setStart,
  end,
  setEnd,
  setHover,
  checkLies,
  hasRangeSelect,
  currentDate,
  todayDateColor,
  selectedDateColor,
  dateHoverColor,
  setCurrentDate,
  ...props
}: ICalendarBase) => {
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  console.log('is loop');

  return (
    <Flex gap={'10px'} flexDir={'column'} width={'225px'}>
      <CalendarHeader
        hasRangeSelect={hasRangeSelect}
        {...props}
        setCurrentDate={setCurrentDate}
        currentDate={currentDate}
      />

      <Grid
        w={'200px'}
        rowGap="2px"
        columnGap="2px"
        templateColumns="repeat(7, 1fr)"
        placeItems="center"
      >
        {Object.values(WEEK_DAYS).map(e => (
          <GridItem
            fontWeight={'500'}
            fontSize="12px"
            key={e}
            cursor="pointer"
            w="30px"
            borderRadius="br2"
            h="30px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {e}
          </GridItem>
        ))}
        {calendarBuilder(currentMonth, currentYear).map(calendarDate => {
          const d = `${calendarDate.year}-${calendarDate.month}-${calendarDate.day}`;

          const isSameDayAndSameMonth =
            isSameDay(getJSDate(calendarDate), new Date()) &&
            isSameMonth(
              getJSDate(calendarDate),
              getDate(String(currentDate)) ?? new Date()
            );

          const hasSameMonth = isSameMonth(
            getJSDate(calendarDate),
            getDate(String(currentDate)) ?? new Date()
          );
          return (
            <GridItem
              key={`${calendarDate.year}-${calendarDate.month}-${calendarDate.day}`}
              cursor="pointer"
              w="30px"
              fontSize={'13px'}
              fontWeight={
                isSameDay(getJSDate(calendarDate), new Date()) ? 'bold' : '500'
              }
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius={'50%'}
              h="30px"
              color={
                isSameDayAndSameMonth
                  ? todayDateColor
                  : hasSameMonth
                  ? '#1C1D1D'
                  : '#BCBDBD'
              }
              bg={
                (!isSameMonth(
                  getJSDate(calendarDate),
                  getDate(String(currentDate)) ?? new Date()
                )
                  ? 'transparent'
                  : (checkLies(d as string) ||
                      getDate(start as string)?.toLocaleDateString() ===
                        getDate(d)?.toLocaleDateString()) &&
                    selectedDateColor) as string
              }
              _hover={{ bg: dateHoverColor }}
              onClick={() => {
                if (
                  isSameMonth(
                    getJSDate(calendarDate),
                    getDate(currentDate) ?? new Date()
                  )
                ) {
                  if (hasRangeSelect) {
                    if (!!start && !end) {
                      setEnd(getDate(d).toLocaleDateString());
                    } else if (!!start && !!end) {
                      setStart(getDate(getDate(d))?.toLocaleDateString());
                      setEnd('');
                      setHover('');
                    } else {
                      setStart(getDate(d)?.toLocaleDateString());
                    }
                  } else {
                    setStart(getDate(d)?.toLocaleDateString());
                    setEnd('');
                    setHover('');
                  }
                }
              }}
              onMouseEnter={() => {
                if (hasRangeSelect) {
                  if (start && !end) {
                    setHover(d);
                  }
                }
              }}
            >
              {calendarDate.day}
            </GridItem>
          );
        })}
      </Grid>
    </Flex>
  );
};

const getJSDate = (date: CalendarBuilderDate) =>
  new Date(date.year, +date.month - 1, +date.day);
