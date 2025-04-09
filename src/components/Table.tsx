import React from "react";

const INIT_LENGTH = 10;

export interface Column<T> {
  title: string;
  dataIndex?: keyof T;
  width?: number;
  renderItem?: (
    value: any,
    data: T,
    record: T,
    index: number
  ) => React.ReactNode;
}

interface Props<T> {
  columns: Column<T>[];
  data?: T[];
  loading?: boolean;
}

const Table = <T,>({ columns, data = [], loading = false }: Props<T>) => {
  const displayedData = loading
    ? Array.from({ length: INIT_LENGTH })
    : [...data, ...Array(Math.max(0, INIT_LENGTH - data.length)).fill(null)];

  return (
    <div className="table-container">
      <div className="table-wrapper">
        <table className="employee-table">
          <thead>
            <tr>
              {columns.map((col, index) => (
                <th key={index} style={{ width: col?.width || 200 }}>
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayedData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((col, colIndex) => (
                  <td key={colIndex}>
                    {loading ? (
                      <div
                        style={{
                          width: "100%",
                          height: "26px",
                          background: "#ddd",
                          borderRadius: "4px",
                        }}
                      ></div>
                    ) : row ? (
                      col.renderItem ? (
                        col.renderItem(
                          row[col.dataIndex],
                          data[rowIndex],
                          row,
                          rowIndex
                        )
                      ) : (
                        (row[col.dataIndex] as any)
                      )
                    ) : (
                      <span>&nbsp;</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
