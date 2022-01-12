import styles from '../styles/Table.module.css';

export const Table = ({ className = '', data = [], columns = [] }) => {
  let tableClassName = styles.table;

  if (className) {
    tableClassName = `${tableClassName} ${className}`
  }

  const rows = [...new Array(data.length)].map((_, index) => columns.map(({ columnId }) => data[index][columnId]))

  return (
    <table className={tableClassName}>
      <thead>
        <tr>
          {columns.map(({ columnId, Header }) => (
            <td key={columnId}>
              {
                Header
              }
            </td>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            { row.map((cell, index) => (
              <td key={index}>
                { cell }
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}