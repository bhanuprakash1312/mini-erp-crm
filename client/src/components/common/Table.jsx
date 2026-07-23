export default function Table({ columns = [], rows = [] }) {
  return (
    <div className="w-full overflow-x-auto bg-white rounded-xl border border-slate-200 shadow-sm">
      <table className="w-full text-left border-collapse text-sm">
        <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px] leading-normal">
          <tr>
            {columns.map((column) => (
              <th key={column.key || column} className="px-6 py-3">
                {column.label || column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-slate-600">
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-8 text-center text-slate-400 font-medium">
                No data available
              </td>
            </tr>
          ) : (
            rows.map((row, index) => (
              <tr key={row.id || index} className="hover:bg-slate-50/50 transition-colors">
                {columns.map((column) => (
                  <td key={`${row.id || index}-${column.key || column}`} className="px-6 py-3.5 whitespace-nowrap">
                    {row[column.key || column]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
