// table view using react-table

// see https://react-table.tanstack.com/
// example - https://react-table.tanstack.com/docs/examples/editable-data

import React from 'react'
import { PrimaryButton } from '@fluentui/react'
import { useTable } from 'react-table'
import './table.css'

// -----------------------------------------------------

function TableUI({ columns, data, updateData }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
      // note: this isn't part of the API, but anything we put into these
      // options will automatically be available on the instance -
      // so can call this function from our cell renderer.
      // @ts-ignore
      updateData,
    })

  // render the ui for the table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

// -----------------------------------------------------

function EditableCell({
  value: initialValue,
  row, // { index }
  column, // { id }
  updateData, // this is a custom function that we supplied to useTable
}) {
  // keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue)

  const onChange = e => {
    setValue(e.target.value)
  }

  // only update the external data when the input is blurred
  const onBlur = () => {
    updateData(row, column, value) // eg 1, 'notes', 'pokpok'
  }

  // if the initialValue is changed externally, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  //. adjust to fill whole cell
  return <input value={value} onChange={onChange} onBlur={onBlur} />
}

// -----------------------------------------------------

// sources is the Neomem data aggregator
function Table({ sources }) {
  const columns = React.useMemo(
    () => [
      {
        Header: 'id',
        accessor: 'id', // accessor is the "key" in the data
        Cell: EditableCell,
      },
      {
        Header: 'data',
        accessor: row => JSON.stringify(row.data),
        Cell: EditableCell,
      },
      {
        Header: 'name',
        accessor: row => row.data.name, //.
        Cell: EditableCell,
      },
      {
        Header: 'notes',
        accessor: row => row.data.notes, //.
        Cell: EditableCell,
      },
    ],
    []
  )

  const [data, setData] = React.useState([])

  React.useEffect(() => {
    async function fetchData() {
      const data = await sources.get() //. get ALL data for now
      setData(data)
    }
    fetchData()
  }, [])

  // When our cell renderer calls updateData, we'll use
  // rowIndex, columnId and new value to update the original data.
  function updateData(row, column, value) {
    console.log(data)
    console.log(row, column, value)
    const rowIndex = row.index // eg 1
    const columnId = column.id // eg 'notes'
    setData(oldRows => {
      const newRows = oldRows.map((row, index) => {
        if (index === rowIndex) {
          return { ...oldRows[rowIndex], [columnId]: value }
        }
        return row
      })
      sources.set({ id: row.values.id, prop: column.id, value })
      return newRows
    })
  }

  const clickAdd = React.useCallback(() => {
    // const id = 'lkmlkm'
    const name = 'kjkjdnfjhb'
    const item = { data: { name } }
    setData(old => {
      sources.add({ value: { data: { name } } }) //. add to db
      return [...old, item]
    })
  }, [sources])

  return (
    <div style={{ width: '100%', margin: 'auto' }}>
      <PrimaryButton onClick={clickAdd}>Add</PrimaryButton>
      <br />
      <br />
      <TableUI columns={columns} data={data} updateData={updateData} />
    </div>
  )
}

export default Table
