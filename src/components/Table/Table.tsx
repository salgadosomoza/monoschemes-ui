import './Table.css';

export interface TableColumn {
  key: string;
  label: string;
  width?: string;
}

export interface TableProps {
  columns: TableColumn[];
  data: Array<Record<string, string | number>>;
  striped?: boolean;
  bordered?: boolean;
  onRowClick?: (row: Record<string, string | number>) => void;
}

export function Table({
  columns,
  data,
  striped = false,
  bordered = true,
  onRowClick,
}: TableProps) {
  return (
    <div className="table-wrapper">
      <table className="table" data-striped={striped} data-bordered={bordered}>
        <thead>
          <tr>
            {columns.map(col => (
              <th
                key={col.key}
                className="table-th"
                style={col.width ? { width: col.width } : undefined}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={i}
              className="table-row"
              data-clickable={onRowClick ? 'true' : undefined}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
            >
              {columns.map(col => (
                <td key={col.key} className="table-td">{row[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
