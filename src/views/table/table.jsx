// table view using react-table

// see https://react-table.tanstack.com/
// example - https://react-table.tanstack.com/docs/examples/editable-data

import React from 'react'
import {
  Stack,
  PrimaryButton,
  DefaultButton,
  CommandButton,
  Icon,
} from '@fluentui/react'
import {
  useTable,
  useSortBy,
  useFilters,
  useGroupBy,
  useExpanded,
} from 'react-table'
import './table.css'

const stackTokens = { childrenGap: 5 }

// -----------------------------------------------------

function TableUI({ columns, data, updateData }) {
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      // fuzzyText: fuzzyTextFilterFn,
      // // Or, override the default text filter to use
      // // "startWith"
      // text: (rows, id, filterValue) => {
      //   return rows.filter(row => {
      //     const rowValue = row.values[id]
      //     return rowValue !== undefined
      //       ? String(rowValue)
      //           .toLowerCase()
      //           .startsWith(String(filterValue).toLowerCase())
      //       : true
      //   })
      // },
    }),
    []
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
        // note: this isn't part of the API, but anything we put into these
        // options will automatically be available on the instance -
        // so can call this function from our cell renderer.
        // @ts-ignore
        updateData,
      },
      useFilters,
      useSortBy
      // useGroupBy,
      // useExpanded // useGroupBy would be pretty useless without useExpanded
    )

  // render the ui for the table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render('Header')}
                <span>
                  {' '}
                  {column.isSorted ? (column.isSortedDesc ? ' ▼' : ' ▲') : ''}
                </span>
              </th>
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
  value: initialValue, // value can be undefined
  row, // { index, values }
  column, // { id }
  updateData, // this is the custom function that we supplied to useTable
}) {
  // keep and update the state of the cell normally.
  // need the || '' in case initval is undefined, which confuses the input component.
  const [value, setValue] = React.useState(initialValue || '')

  function onChange(e) {
    setValue(e.target.value)
  }

  // only update the external data when the input is blurred
  // and value has changed
  function onBlur() {
    if (value !== initialValue) {
      updateData(row, column, value)
    }
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
        // readonly
      },
      // {
      //   Header: 'data',
      //   accessor: row => JSON.stringify(row.data),
      //   // readonly
      // },
      {
        Header: 'type',
        accessor: row => row.data.type, //.
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

  // fetch initial data for table
  React.useEffect(() => {
    async function fetchData() {
      const data = await sources.get() //. get ALL data for now
      setData(data)
    }
    fetchData()
  }, [sources])

  // When our cell renderer calls updateData, we'll use
  // rowIndex, columnId and new value to update the original data.
  const updateData = React.useCallback(
    (row, column, value) => {
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
    },
    [data, sources]
  )

  const clickAdd = React.useCallback(async () => {
    // add to database
    const name = ''
    const item = { data: { name } }
    const rows = await sources.add([item]) //. add to db
    console.log('added', rows)
    if (rows && rows[0]) {
      item.id = rows[0].id
      setData(oldRows => {
        // add to table also
        const newRows = [...oldRows, item]
        return newRows
      })
    }
  }, [sources])

  const clickFilter = React.useCallback(async () => {}, [])
  const clickGroup = React.useCallback(async () => {}, [])
  const clickSort = React.useCallback(async () => {}, [])

  return (
    <div style={{ width: '100%', margin: 'auto' }}>
      <Stack horizontal disableShrink tokens={stackTokens}>
        <PrimaryButton onClick={clickAdd} iconProps={{ iconName: 'Add' }}>
          Add
        </PrimaryButton>
        <DefaultButton onClick={clickFilter} iconProps={{ iconName: 'Filter' }}>
          Filter
        </DefaultButton>
        <DefaultButton
          onClick={clickGroup}
          iconProps={{ iconName: 'GroupList' }}
        >
          Group
        </DefaultButton>
        <DefaultButton onClick={clickSort} iconProps={{ iconName: 'Sort' }}>
          Sort
        </DefaultButton>
      </Stack>
      <br />
      <TableUI columns={columns} data={data} updateData={updateData} />
    </div>
  )
}

export default Table
