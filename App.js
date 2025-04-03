import React, { useState } from 'react';
import * as XLSX from 'xlsx';

function App() {
  const [data, setData] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const jsonData = XLSX.utils.sheet_to_json(ws, { header: 1 });
      setData(jsonData);
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div>
      <h1>📦 Inventory Dashboard (Upload Mode)</h1>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      {data.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h2>📋 First 10 Rows of Data</h2>
          <table border="1" cellPadding="5">
            <tbody>
              {data.slice(0, 10).map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;