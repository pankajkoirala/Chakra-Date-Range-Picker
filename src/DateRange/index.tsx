import React from 'react';
import { Flex, Input } from '@chakra-ui/react';
import { CalendarBase } from './calendarBase';
import { useEffect, useState } from 'react';
import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
} from '@chakra-ui/react';
import { BsFilter } from 'react-icons/bs';
import { getDate } from './calenderBuilder';

interface TFinalRangeDate {
  startDate?: string | null | Date;
  endDate?: string | null | Date;
  date?: string | null | Date;
}

export interface ICalendarProps {
  onChange: (e: TFinalRangeDate | null) => void;
  hasRangeSelect?: boolean;
  hasTime?: boolean;
  todayDateColor?: string;
  selectedDateColor?: string;
  dateHoverColor?: string;
  label?: string;
  height?: string;
  width?: string;
  hasSideMenu?: boolean;
  iconPosition?: 'LEFT' | 'RIGHT';
  defaultValue?: { startDate: string | null; endDate: string | null };
  icon?: React.ReactNode;
}

export const DateRangePicker = ({
  onChange,
  hasRangeSelect = true,
  hasTime = true,
  hasSideMenu = true,
  todayDateColor = '#4270EC',
  selectedDateColor = '#96F8D3',
  dateHoverColor = '#96F8D3',
  label,
  height = '40px',
  width = 'auto',
  defaultValue = { startDate: null, endDate: null },
  iconPosition,
  icon,
  ...others
}: ICalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const [start, setStart] = useState<string | null>(
    defaultValue?.startDate
      ? new Date(defaultValue.startDate).toLocaleDateString()
      : null
  );
  const [end, setEnd] = useState<string | null>(
    defaultValue.startDate && hasRangeSelect
      ? new Date(defaultValue.endDate as string).toLocaleDateString()
      : null
  );
  const [hover, setHover] = useState<string | null>(
    defaultValue.startDate && hasRangeSelect
      ? new Date(defaultValue.endDate as string).toLocaleDateString()
      : null
  );
  const [startTime, setStartTime] = useState<string | null>(
    defaultValue.startDate
      ? `${new Date(defaultValue.startDate as string).getHours()}:${new Date(
          defaultValue.startDate as string
        ).getMinutes()}`
      : null
  );
  const [endTime, setEndTime] = useState<string | null>(
    defaultValue.endDate
      ? `${new Date(defaultValue.endDate as string).getHours()}:${new Date(
          defaultValue.endDate as string
        ).getMinutes()}`
      : null
  );
  const [finalDate, setFinalDate] = useState<TFinalRangeDate | null>(null);

  const checkLies = (num: string | Date) => {
    num = new Date(num);
    if (start && hover) {
      if (getDate(start) >= getDate(hover)) {
        if (num >= getDate(hover) && num <= getDate(start)) {
          return true;
        } else {
          return false;
        }
      } else {
        if (num >= getDate(start) && num <= getDate(hover)) {
          return true;
        } else {
          return false;
        }
      }
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (hasRangeSelect) {
      if (start && end) {
        if (getDate(start) >= getDate(end)) {
          setFinalDate({
            startDate:
              endTime && end
                ? getDate(`${end} ${endTime && endTime}`)
                : getDate(end),
            endDate:
              startTime && start
                ? getDate(`${start} ${startTime && startTime}`)
                : getDate(start),
          });
        } else {
          setFinalDate({
            endDate:
              endTime && end
                ? getDate(`${end} ${endTime && endTime}`)
                : getDate(end),
            startDate:
              startTime && start
                ? getDate(`${start} ${startTime && startTime}`)
                : getDate(start),
          });
        }
      }
      if (start && !end) {
        setFinalDate({
          endDate: null,
          startDate:
            startTime && start
              ? getDate(`${start} ${startTime && startTime}`)
              : getDate(start),
        });
      }
    } else {
      if (startTime && start) {
        setFinalDate({
          date: getDate(`${start} ${startTime && startTime}`),
        });
      } else if (start) {
        setFinalDate({
          date: getDate(start),
        });
      }
    }
  }, [start, end, hasRangeSelect, endTime, startTime]);

  useEffect(() => {
    onChange && onChange(finalDate);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finalDate]);

  return (
    <Popover>
      <PopoverTrigger>
        <Button
          justifyContent="space-between"
          borderRadius="4px"
          alignItems={'center'}
          display={'flex'}
          flexDir={iconPosition === 'LEFT' ? 'row' : 'row-reverse'}
          gap={'16px'}
          height={height}
          width={width}
          {...others}
        >
          {icon ?? <BsFilter />}
          {hasRangeSelect ? (
            <>
              {!finalDate?.startDate && !finalDate?.endDate && label ? (
                <>{label}</>
              ) : (
                <>
                  {finalDate?.startDate
                    ? `${getDate(finalDate?.startDate)?.toLocaleDateString()} ${
                        hasTime
                          ? getDate(finalDate?.startDate).toLocaleTimeString()
                          : ''
                      }`
                    : hasTime
                    ? 'mm/dd/yyyy --:-- --'
                    : 'mm/dd/yyyy'}
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  {finalDate?.endDate
                    ? `${getDate(finalDate?.endDate).toLocaleDateString()} ${
                        hasTime
                          ? getDate(finalDate?.endDate).toLocaleTimeString()
                          : ''
                      }`
                    : hasTime
                    ? 'mm/dd/yyyy --:-- --'
                    : 'mm/dd/yyyy'}
                </>
              )}
            </>
          ) : (
            <>
              {finalDate?.date
                ? `${getDate(finalDate?.date).toLocaleDateString()} ${
                    hasTime ? getDate(finalDate?.date).toLocaleTimeString() : ''
                  }`
                : hasTime
                ? label ?? 'mm/dd/yyyy --:-- --'
                : label ?? 'mm/dd/yyyy'}
            </>
          )}
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent m={'4px'} width={'auto'}>
          <PopoverArrow bg={'gray'} />
          <PopoverBody border={'1px solid grey'} borderRadius={'4px'}>
            <Flex>
              {hasSideMenu && (
                <Flex
                  w={'115px'}
                  gap={'4px'}
                  borderRight={'1px solid grey'}
                  flexDir={'column'}
                >
                  <Flex
                    alignItems={'center'}
                    justifyContent={'center'}
                    h={'30px'}
                    w={'100%'}
                    cursor={'pointer'}
                    onClick={() => {
                      if (hasRangeSelect) {
                        setStart(new Date().toLocaleDateString());
                        setEnd(new Date().toLocaleDateString());
                        setHover(null);

                        setCurrentDate(new Date());
                      } else {
                        setStart(new Date().toLocaleDateString());
                        setEnd(null);
                        setHover(null);

                        setCurrentDate(new Date());
                      }
                    }}
                    _hover={{ bg: dateHoverColor }}
                  >
                    Today
                  </Flex>
                  <Flex
                    alignItems={'center'}
                    justifyContent={'center'}
                    h={'30px'}
                    w={'100%'}
                    cursor={'pointer'}
                    _hover={{ bg: dateHoverColor }}
                    onClick={() => {
                      const d = new Date();
                      if (hasRangeSelect) {
                        setStart(
                          new Date(
                            d.setDate(d.getDate() + 1)
                          ).toLocaleDateString()
                        );
                        setEnd(
                          new Date(
                            d.setDate(d.getDate() + 1)
                          ).toLocaleDateString()
                        );
                        setHover(null);

                        setCurrentDate(new Date(d.setDate(d.getDate() + 1)));
                      } else {
                        setStart(
                          new Date(
                            d.setDate(d.getDate() + 1)
                          ).toLocaleDateString()
                        );
                        setCurrentDate(new Date(d.setDate(d.getDate() + 1)));
                        setEnd(null);
                        setHover(null);
                      }
                    }}
                  >
                    Tommorow
                  </Flex>
                  {hasRangeSelect && (
                    <>
                      <Flex
                        alignItems={'center'}
                        justifyContent={'center'}
                        h={'30px'}
                        w={'100%'}
                        cursor={'pointer'}
                        _hover={{ bg: dateHoverColor }}
                        onClick={() => {
                          if (hasRangeSelect) {
                            var curr = new Date();
                            const firstday = new Date(
                              curr.setDate(curr.getDate() - curr.getDay())
                            );
                            const lastday = new Date(
                              curr.setDate(curr.getDate() - curr.getDay() + 7)
                            );

                            setStart(firstday.toLocaleDateString());
                            setEnd(lastday.toLocaleDateString());
                            setHover(lastday.toLocaleDateString());

                            setCurrentDate(firstday);
                          }
                        }}
                      >
                        This week
                      </Flex>
                      <Flex
                        alignItems={'center'}
                        justifyContent={'center'}
                        h={'30px'}
                        w={'100%'}
                        cursor={'pointer'}
                        _hover={{ bg: dateHoverColor }}
                        onClick={() => {
                          if (hasRangeSelect) {
                            var date = new Date();
                            var nextWeekStart =
                              date.getDate() - date.getDay() + 7;
                            var nextWeekFrom = new Date(
                              date.setDate(nextWeekStart)
                            );
                            var nextWeekEnd =
                              date.getDate() - date.getDay() + 7;
                            var nextWeekTo = new Date(
                              date.setDate(nextWeekEnd)
                            );

                            setStart(nextWeekFrom.toLocaleDateString());
                            setEnd(nextWeekTo.toLocaleDateString());
                            setHover(nextWeekTo.toLocaleDateString());

                            setCurrentDate(nextWeekFrom);
                          }
                        }}
                      >
                        Next week
                      </Flex>
                    </>
                  )}
                </Flex>
              )}
              <Flex p={'4px'} flexDir={'column'}>
                {/* <CalendarHeader setCurrentDate={setCurrentDate} currentDate={currentDate} /> */}
                <Flex gap={'12px'} flexDir={['column', 'column', 'row', 'row']}>
                  <Flex
                    justifyContent={'space-between'}
                    gap={'12px'}
                    flexDir={'column'}
                  >
                    <CalendarBase
                      hasNextButton={hasRangeSelect ? false : true}
                      hasPreviousButton={true}
                      dateHoverColor={dateHoverColor}
                      selectedDateColor={selectedDateColor}
                      todayDateColor={todayDateColor}
                      hasRangeSelect={hasRangeSelect}
                      checkLies={checkLies}
                      currentDate={currentDate}
                      setCurrentDate={setCurrentDate}
                      setStart={setStart}
                      start={start}
                      setEnd={setEnd}
                      end={end}
                      hover={hover}
                      setHover={setHover}
                    />
                    {hasTime && (
                      <Input
                        defaultValue={`${new Date(
                          defaultValue.startDate as string
                        ).getHours()}:${new Date(
                          defaultValue.startDate as string
                        ).getMinutes()}`}
                        type="time"
                        onChange={e => {
                          setStartTime(e.target.value);
                        }}
                        placeholder="small size"
                        size="sm"
                      />
                    )}
                  </Flex>
                  {hasRangeSelect && (
                    <Flex
                      justifyContent={'space-between'}
                      gap={'12px'}
                      flexDir={'column'}
                    >
                      <CalendarBase
                        hasNextButton={true}
                        hasPreviousButton={false}
                        dateHoverColor={dateHoverColor}
                        selectedDateColor={selectedDateColor}
                        todayDateColor={todayDateColor}
                        setStart={setStart}
                        start={start}
                        setEnd={setEnd}
                        end={end}
                        hover={hover}
                        setHover={setHover}
                        checkLies={checkLies}
                        hasRangeSelect={hasRangeSelect}
                        currentDate={
                          new Date(
                            currentDate.getFullYear(),
                            currentDate.getMonth() + 1,
                            currentDate.getDate()
                          )
                        }
                        setCurrentDate={setCurrentDate}
                      />
                      {hasTime && (
                        <Input
                          defaultValue={`${new Date(
                            defaultValue.endDate as string
                          ).getHours()}:${new Date(
                            defaultValue.endDate as string
                          ).getMinutes()}`}
                          type="time"
                          onChange={e => {
                            setEndTime(e.target.value);
                          }}
                          placeholder="small size"
                          size="sm"
                        />
                      )}
                    </Flex>
                  )}
                </Flex>
              </Flex>
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};
DateRangePicker.displayName = 'ColorSelect';
