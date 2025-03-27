import React from "react";

export interface Column<T> {
  title: string;
  dataIndex: keyof T;
}

interface Props<T> {
  columns: Column<T>[];
  data?: T[];
}

const Table = <T,>({ columns, data = [] }: Props<T>) => {
  return (
    <div className="table-container">
      <div className="table-wrapper">
        <table className="employee-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.dataIndex as string}>{col.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((col) => (
                    <td key={col.dataIndex as string}>
                      {row[col.dataIndex] as any}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} style={{ textAlign: "center" }}>
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
