import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useState } from "react";

interface Valuesdate {
  newUseDate: (date: dayjs.Dayjs) => void;
}

const CalendarValue: React.FC<Valuesdate> = ({ newUseDate }) => {
  const [selected, setSelected] = useState<dayjs.Dayjs>();

  const handleChange = (date: any) => {
    setSelected(date);
    newUseDate(date);
  };

  return (
    <div>
      <DatePicker
        value={selected}
        className="update-expiry-child"
        format="DD/MM/YYYY"
        onChange={handleChange}
      />
    </div>
  );
};

export default CalendarValue;
