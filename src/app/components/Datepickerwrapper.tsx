"use client";
import React, { ChangeEvent } from 'react';
import { Datepicker } from "flowbite-react";

interface DatepickerWrapperProps {
    minDate: Date;
    maxDate: Date;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    name: string;
  }
  
  const DatepickerWrapper: React.FC<DatepickerWrapperProps> = ({ minDate, maxDate, onChange, name }) => {
    const handleDateChange = (date: Date) => {
      const event = {
        target: {
          name,
          value: date.toISOString().slice(0, 10),
        },
      } as ChangeEvent<HTMLInputElement>;
      onChange(event);
    };
  
    const handleChange = (date: Date | null) => {
      if (date) {
        handleDateChange(date);
      }
    };
  
    return (
      <Datepicker
        minDate={minDate}
        maxDate={maxDate}
        onChange={handleChange}
        name={name}
        className="flowbite-datepicker"
        inline
      />
    );
  };
  
  export default DatepickerWrapper;