import React from "react";

function Day({ dayName, morning, afternoon, morningChange, afternoonChange, className = "" }) {
  return (
    <div className={`flex flex-col ${className}`}>
      <div className="text-center flex-none h-8">
        <strong>{dayName}</strong>
      </div>
      <div className="flex-grow p-1">
        <textarea
          className="resize-none overflow-hidden p-1 rounded focus:outline-none focus:ring focus:border-green-200 h-20 w-full"
          value={morning}
          onChange={morningChange}
          placeholder="Morning schedule..."
        />
      </div>
      <div className="flex-grow p-1">
        <textarea
          className="resize-none overflow-hidden p-1 rounded focus:outline-none focus:ring focus:border-green-200 h-20 w-full"
          value={afternoon}
          onChange={afternoonChange}
          placeholder="Afternoon schedule..."
        />
      </div>
    </div>
  );
}

export default Day;
