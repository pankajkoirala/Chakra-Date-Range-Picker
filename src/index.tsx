import * as React from 'react';
import {
  DateRangePicker as DatePicker,
  ICalendarProps,
} from './DateRange/index';

// Delete me
export const DateRangePicker = (props: ICalendarProps) => {
  return (
    <div>
      <DatePicker {...props} />
    </div>
  );
};
