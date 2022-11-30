import * as React from 'react';
import {
  DateRangePicker as DatePicker,
  ICalendarProps,
} from './DateRange/index';
import { ChakraProvider } from '@chakra-ui/react';

// Delete me
export const DateRangePicker = (props: ICalendarProps) => {
  return (
    <div>
      <ChakraProvider portalZIndex={999999}>
        <DatePicker {...props} />
      </ChakraProvider>
    </div>
  );
};
