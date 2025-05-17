import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CircularCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([
    { date: new Date(2025, 4, 24), title: "PTM Meeting", type: "meeting" },
    { date: new Date(2025, 4, 31), title: "Annual Sports Day", type: "event" },
    { date: new Date(2025, 4, 20), title: "Science Exhibition", type: "event" },
    { date: new Date(2025, 4, 25), title: "Holiday", type: "holiday" },
    { date: new Date(2025, 4, 30), title: "Fee Due Date", type: "reminder" }
  ]);

  // Get month details
  const getMonthData = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { year, month, daysInMonth, startingDayOfWeek };
  };

  const monthData = getMonthData(currentDate);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const getEventsForDate = (date) => {
    return events.filter(event =>
      event.date.getDate() === date &&
      event.date.getMonth() === monthData.month &&
      event.date.getFullYear() === monthData.year
    );
  };

  const buildCalendarDays = () => {
    const days = [];
    const { year, month, daysInMonth, startingDayOfWeek } = monthData;

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-12 p-1 border border-gray-200 bg-gray-50"></div>
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isToday = new Date().toDateString() === date.toDateString();
      const isSelected = selectedDate.toDateString() === date.toDateString();
      const dayEvents = getEventsForDate(day);

      days.push(
        <div
          key={`day-${day}`}
          className={`h-12 p-1 border border-gray-200 relative cursor-pointer hover:bg-blue-50 transition-colors
            ${isToday ? 'bg-blue-100' : ''}
            ${isSelected ? 'border-2 border-blue-500' : ''}`}
          onClick={() => setSelectedDate(date)}
        >
          <span
            className={`inline-block w-6 h-6 rounded-full text-center text-sm
              ${isToday ? 'bg-blue-500 text-white' : ''}`}
          >
            {day}
          </span>

          {dayEvents.length > 0 && (
            <div className="absolute bottom-1 right-1 flex gap-1">
              {dayEvents.map((event, idx) => (
                <span
                  key={idx}
                  className={`w-2 h-2 rounded-full ${
                    event.type === 'meeting'
                      ? 'bg-purple-500'
                      : event.type === 'event'
                      ? 'bg-green-500'
                      : event.type === 'holiday'
                      ? 'bg-red-500'
                      : 'bg-yellow-500'
                  }`}
                  title={event.title}
                ></span>
              ))}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  const getUpcomingEvents = () => {
    const today = new Date();
    return events
      .filter(event => event.date >= today)
      .sort((a, b) => a.date - b.date)
      .slice(0, 5);
  };

  const formatEventDate = (date) => {
    return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">School Calendar</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={prevMonth}
            className="p-2 rounded hover:bg-gray-100"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <span className="text-lg font-medium">
            {monthNames[monthData.month]} {monthData.year}
          </span>
          <button
            onClick={nextMonth}
            className="p-2 rounded hover:bg-gray-100"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="mb-8">
        <div className="grid grid-cols-7 gap-0">
          {weekDays.map(day => (
            <div
              key={day}
              className="h-10 flex items-center justify-center font-medium text-gray-500"
            >
              {day}
            </div>
          ))}

          {buildCalendarDays()}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-3">Upcoming Events</h3>
        <div className="space-y-2">
          {getUpcomingEvents().map((event, idx) => (
            <div
              key={idx}
              className={`flex items-center p-2 border-l-4 rounded bg-gray-50 hover:bg-gray-100 transition-colors ${
                event.type === 'meeting'
                  ? 'border-purple-500'
                  : event.type === 'event'
                  ? 'border-green-500'
                  : event.type === 'holiday'
                  ? 'border-red-500'
                  : 'border-yellow-500'
              }`}
            >
              <div className="ml-2">
                <p className="font-medium">{event.title}</p>
                <p className="text-sm text-gray-600">{formatEventDate(event.date)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
