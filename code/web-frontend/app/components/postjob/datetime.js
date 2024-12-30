import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TimePicker from 'react-time-picker';
import 'react-clock/dist/Clock.css';
import 'react-time-picker/dist/TimePicker.css';
import { useFormContext } from '../../../context/formContext';

export default function DateTime({ onNext }) {
  const { formData, updateFormData } = useFormContext();
  const [date, setDate] = useState(formData.date || new Date());
  const [time, setTime] = useState(formData.time || '12:00');

  const handleNext = () => {
    updateFormData({ date, time });
    onNext();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Date and Time</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Select Date</label>
          <Calendar
            onChange={setDate}
            minDate={new Date()}
            value={date}
            className="border rounded-lg p-2 shadow"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Select Time</label>
          <TimePicker
            onChange={setTime}
            value={time}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleNext}
          className="px-6 py-2 bg-[#01ABF0] text-white rounded-lg hover:bg-blue-700"
          disabled={!(date && time)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
