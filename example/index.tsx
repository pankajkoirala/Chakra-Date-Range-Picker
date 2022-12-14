import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DateRangePicker } from './../src/index';

const App = () => {
  return (
    <div>
      <DateRangePicker iconPosition={'RIGHT'} onChange={e => console.log(e)} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
