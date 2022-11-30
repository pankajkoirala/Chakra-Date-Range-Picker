# Chakra-Date-Range-Picker

## Installation

#### using npm:

```
$ npm i Chakra-Date-Range-Picker
```

#### using yarn:

```
$ yarn add Chakra-Date-Range-Picker
```

## Example

```ruby
import { DateRangePicker } from 'Chakra-Date-Range-Picker';

const App=()=>{
       const value={ '2022-5-12': { value: 2, message: 'leave'}}
       const colors=['red','blue','green','pink','orange']
       return(
        <DateRangePicker onChange={e => console.log(e)} />
    )}
```

## Props

| props             | value                                        |
| ----------------- | -------------------------------------------- |
| hasRangeSelect    | Boolean                                      |
| hasTime           | Boolean                                      |
| hasSideMenu       | Boolean                                      |
| onChange          | (date: {startDate:Date,endDate:Date}) =>void |
| todayDateColor    | String                                       |
| selectedDateColor | String                                       |
| dateHoverColor    | String                                       |
| label             | String                                       |
| height            | String                                       |
| width             | String                                       |
| defaultValue      | {startDate:Date,endDate:Date}                |
| iconPosition      | 'LEFT' or 'RIGHT'                            |
| icon              | React.ReactNode                              |
