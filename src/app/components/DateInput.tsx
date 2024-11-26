import React, { ChangeEvent } from 'react';

interface DateInputProps {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const DateInput: React.FC<DateInputProps> = ({ value, onChange }) => {
    return (
        <input
            type="date"
            value={value}
            onChange={onChange}
            className="border border-gray-300 rounded p-2"
        />
    );
};

export default DateInput;