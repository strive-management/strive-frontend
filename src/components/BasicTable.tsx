import React from 'react';

const BasicTable = ({ data }: { data: Record<string, any>[] }) => {
  const headers = Object.keys(data[0] || {});
  const rows = data.map((item) => Object.values(item));

  const containerStyle: React.CSSProperties = {
    margin: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const tableStyle: React.CSSProperties = {
    borderCollapse: 'collapse',
    width: 'auto',
  };

  const thStyle: React.CSSProperties = {
    border: '1px solid #dddddd',
    padding: '8px',
    textAlign: 'left',
    backgroundColor: '#f2f2f2',
  };

  const tdStyle: React.CSSProperties = {
    border: '1px solid #dddddd',
    padding: '8px',
    textAlign: 'left',
  };

  return (
    <div style={containerStyle}>
      <table style={tableStyle}>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header} style={thStyle}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {row.map((cell, index) => (
                <td key={index} style={tdStyle}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BasicTable;
