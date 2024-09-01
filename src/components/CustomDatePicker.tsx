import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { FC } from 'react';

interface CustomDatePickerProps {
  date: Date | null;
  onChange: (date: Date | null) => void;
}

const CustomDatePicker: FC<CustomDatePickerProps> = ({ date, onChange }) => {
  const formatDate = (date: Date | null) =>
    date ? format(date, 'yyyy - MMMM') : '';

  const CustomInput = ({
    value,
    onClick,
  }: {
    value: string;
    onClick: () => void;
  }) => (
    <input
      type="text"
      value={value}
      onClick={onClick}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-800 placeholder-gray-400 text-sm md:text-base cursor-pointer"
    />
  );

  return (
    <DatePicker
      selected={date}
      onChange={(date) => onChange(date as Date | null)}
      dateFormat="yyyy/MM"
      showMonthYearPicker
      customInput={<CustomInput value={formatDate(date)} onClick={() => {}} />}
      placeholderText="Select Month/Year"
      wrapperClassName="w-full md:w-1/2 lg:w-1/3"
    />
  );
};

export default CustomDatePicker;
