import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

const AdminTable = ({ columns, data, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto bg-white shadow-card rounded-xl">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-surface-container-low">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className="px-6 py-4 text-left text-xs font-semibold text-on-surface-variant uppercase tracking-wider"
              >
                {col.label}
              </th>
            ))}
            {(onEdit || onDelete) && (
              <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr key={row.id || rowIndex} className="hover:bg-gray-50 transition-colors">
              {columns.map((col) => (
                <td key={col.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {row[col.key]}
                </td>
              ))}
              {(onEdit || onDelete) && (
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-3">
                    {onEdit && (
                      <button
                        onClick={() => onEdit(row)}
                        className="text-admin-accent hover:text-indigo-800 transition-colors"
                        title="Edit"
                      >
                        <PencilSquareIcon className="w-5 h-5" />
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(row)}
                        className="text-secondary hover:text-secondary-container transition-colors"
                        title="Delete"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={columns.length + (onEdit || onDelete ? 1 : 0)} className="px-6 py-8 text-center text-gray-500">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;
