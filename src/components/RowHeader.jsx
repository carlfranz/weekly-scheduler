import React from "react";

function RowHeader() {
  return (
    <div className="flex flex-col text-center">
      <div className="flex-none h-8"></div>
      <div className="flex-grow p-1 flex flex-col justify-center">
        9:00 - 13:00
      </div>
      <div className="flex-grow p-1 flex flex-col justify-center">
        14:00 - 18:00
      </div>
    </div>
  );
}

export default RowHeader;
