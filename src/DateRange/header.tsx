import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export const CalendarHeader = ({
  setCurrentDate,
  currentDate,
  hasNextButton,
  hasPreviousButton,
  hasRangeSelect,
}: any) => {
  return (
    <Flex
      justifyContent={'space-between'}
      rowGap="s4"
      w="100%"
      h={'40px'}
      alignItems="center"
    >
      <Flex
        alignItems={'center'}
        width={'100%'}
        cursor="pointer"
        borderRadius="br2"
        h="40px"
        px={'4px'}
        gap={['50px', '50px', '0px', '0px']}
        justify={['center', 'center', 'space-evenly', 'space-evenly']}
      >
        {hasPreviousButton && (
          <Flex>
            <FiChevronLeft
              onClick={() => {
                setCurrentDate(
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth() - 1,
                    currentDate.getDate()
                  )
                );
              }}
            />
          </Flex>
        )}
        <Flex
          cursor="pointer"
          w=""
          borderRadius="br2"
          h="20px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontWeight={500}
          fontSize="12px"
        >
          <Text>
            {currentDate.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
            })}
          </Text>
        </Flex>
        {hasNextButton && (
          <Flex>
            <FiChevronRight
              onClick={() => {
                if (hasRangeSelect) {
                  setCurrentDate(
                    new Date(
                      currentDate.getFullYear(),
                      currentDate.getMonth(),
                      currentDate.getDate()
                    )
                  );
                } else {
                  setCurrentDate(
                    new Date(
                      currentDate.getFullYear(),
                      currentDate.getMonth() + 1,
                      currentDate.getDate()
                    )
                  );
                }
              }}
            />
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};
