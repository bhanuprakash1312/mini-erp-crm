export default function Table({ columns = [], rows = [] }) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key || column}>{column.label || column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={row.id || index}>
            {columns.map((column) => (
              <td key={`${row.id || index}-${column.key || column}`}>
                {row[column.key || column]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
