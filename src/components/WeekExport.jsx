import React from "react";

export function WeekExport(props) {
  const { weekData } = props;

  const createRow = (c1, c2, c3, header = false) => {
    const row = document.createElement("tr");
    const column1 = document.createElement("th");
    const column2 = document.createElement(header ? "th" : "td");
    const column3 = document.createElement(header ? "th" : "td");
    column1.innerText = c1;
    column2.innerText = c2;
    column3.innerText = c3;
    row.appendChild(column1);
    row.appendChild(column2);
    row.appendChild(column3);
    return row;
  };

  const createTable = (data) => {
    const table = document.createElement("table");
    table.setAttribute("border", 1);
    const rows = [
      createRow("", "9:00-13:00", "14:00-18:00", true),
      createRow("monday", data.mon1, data.mon2),
      createRow("tuesday", data.tue1, data.tue2),
      createRow("wednesday", data.wed1, data.wed2),
      createRow("thursday", data.thu1, data.thu2),
      createRow("friday", data.fri1, data.fri2),
    ];

    rows.forEach((r) => table.appendChild(r));
    return table.outerHTML;
  };

  const performExport = () => {
    const htmlTextTable = createTable(weekData);
    navigator.clipboard.writeText(htmlTextTable).then(
      () => {
        alert("Export complete");
      },
      (err) => {
        alert("Export failed " + err);
      }
    );
  };
  return (
    <div>
      <button
        type="button"
        className="btn btn-link btn-link-blue"
        onClick={performExport}
      >
        copy as html table
      </button>
    </div>
  );
}