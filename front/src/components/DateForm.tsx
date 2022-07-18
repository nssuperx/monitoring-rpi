import React from 'react';
import { DateFormProps } from './SpeedTestTypes';

const DateForm = (props: DateFormProps) => {
  const { date, onChange, onSubmit } = props;

  return (
    <div>
      始まり:
      <input type="datetime-local" name="begin" onChange={onChange} value={date.begin} required />
      終わり:
      <input type="datetime-local" name="end" onChange={onChange} value={date.end} required />
    </div>
  );
};

export default DateForm;
