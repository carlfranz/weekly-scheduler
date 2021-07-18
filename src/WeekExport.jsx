import React from "react";

export function WeekExport(props) {
  const { weekData } = props;

  const createRow = (c1, c2, c3) => {
    const row = document.createElement('tr');
    const column1 = document.createElement('th');
    const column2 = document.createElement('td');
    const column3 = document.createElement('td');
    column1.innerText = c1;
    column2.innerText = c2;
    column3.innerText = c3;
    row.appendChild(column1);
    row.appendChild(column2);
    row.appendChild(column3);
    return row;
  };

  const createTable = (data) => {
    const table = document.createElement('table');
    table.setAttribute('border', 1);
    const rows = [
      createRow("monday", data.mon1, data.mon2),
      createRow("tuesday", data.mon1, data.mon2),
      createRow("wednesday", data.mon1, data.mon2),
      createRow("thursday", data.mon1, data.mon2),
      createRow("friday", data.mon1, data.mon2),
    ];

    rows.forEach(r => table.appendChild(r));
    return table.outerHTML;
  };

  const performExport = () => {
    navigator.permissions.query({ name: "clipboard-write" }).then(result => {
      if (result.state == "granted" || result.state == "prompt") {
        const htmlTextTable = createTable(weekData);
        const blob = new Blob([htmlTextTable], { type: "text/html" });
        const clipboardItem = new ClipboardItem({ [blob.type]: blob });
        navigator.clipboard.write([clipboardItem]).then(() => {
          alert('Export complete');
        }, (err) => {
          alert('Export failed '+err);
        });
      } else {
        alert('Clipboard access is required to export data');
      }
    });
  };
  return (
    <div>
      <button type="button" className="btn btn-link btn-link-blue" onClick={performExport}>
        copy as html table
      </button>
    </div>
  );
}
