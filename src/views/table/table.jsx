// table view using react-table

// see https://react-table.tanstack.com/
// example - https://react-table.tanstack.com/docs/examples/editable-data

import React from 'react'
import { PrimaryButton } from '@fluentui/react'
import {
  useTable,
  useSortBy,
  useFilters,
  // useGroupBy,
  // useExpanded,
} from 'react-table'
import { Bar } from '../../components/bar/bar' //. move up to app
import './table.css'

//. move up to app
const views = [
  {
    name: 'default',
    source: {
      name: 'neo4j',
      options: {},
    },
    fields: [
      { name: 'id', readonly: true, field: 'id' },
      // { name: 'data', readonly: true, field: 'data' }, // debug
      { name: 'type' },
      { name: 'name' },
      { name: 'notes' },
    ],
    filters: [{ field: 'name', operator: 'contains', value: 'g' }],
    groups: [{ field: 'type' }],
    sorts: [{ field: 'name', order: 'ascending' }],
    pane: {
      name: 'table',
      options: {},
    },
  },
]
let currentView = 'default'
let view = views.find(view => view.name === currentView)

function TableUI({ columns, data, updateData }) {
  // const filterTypes = React.useMemo(
  //   () => ({
  //     // Add a new fuzzyTextFilterFn filter type.
  //     // fuzzyText: fuzzyTextFilterFn,
  //     // // Or, override the default text filter to use
  //     // // "startWith"
  //     // text: (rows, id, filterValue) => {
  //     //   return rows.filter(row => {
  //     //     const rowValue = row.values[id]
  //     //     return rowValue !== undefined
  //     //       ? String(rowValue)
  //     //           .toLowerCase()
  //     //           .startsWith(String(filterValue).toLowerCase())
  //     //       : true
  //     //   })
  //     // },
  //   }),
  //   []
  // )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
        // note: this isn't part of the API, but anything added to these
        // options will automatically be available on the instance -
        // so can call this function from the cell renderer.
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
            {headerGroup.headers.map(header => (
              <th {...header.getHeaderProps(header.getSortByToggleProps())}>
                {header.render('Header')}
                <span>
                  {' '}
                  {header.isSorted ? (header.isSortedDesc ? ' ▼' : ' ▲') : ''}
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
    setValue(e.target.value || '')
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
    setValue(initialValue || '')
  }, [initialValue])

  //. adjust to fill whole cell
  return <input value={value} onChange={onChange} onBlur={onBlur} />
}

// -----------------------------------------------------

// sources is the Neomem data aggregator
//. call it db? could be a single source or aggregate?
function Table({ sources }) {
  // get columns
  //. this will be dynamic as view is changed eh?
  const columns = React.useMemo(() => {
    return view.fields.map(field => ({
      Header: field.name,
      accessor: field.field || (row => row.data[field.name]),
      // Cell: field.readonly ? () => null : EditableCell,
      Cell: EditableCell,
    }))
  }, [])

  const [data, setData] = React.useState([])

  // **fetch initial data for table**
  //. rename sources to neomem? nm? it's the core, like a graph db
  React.useEffect(() => {
    async function fetchData() {
      // const data = await sources.get() //. get ALL data for now
      const { nodes } = await sources.get() //. get ALL data for now
      const data = nodes
      setData(data)
    }
    fetchData()
  }, [sources])

  // cell value was updated -
  // called by cell renderer when value is updated.
  const updateData = React.useCallback(
    (row, column, value) => {
      console.log(data)
      console.log(row, column, value)
      const rowIndex = row.index // eg 1
      const columnId = column.id // eg 'notes'
      setData(oldRows => {
        // update table rows
        const newRows = oldRows.map((row, index) => {
          if (index === rowIndex) {
            return { ...oldRows[rowIndex], [columnId]: value }
          }
          return row
        })
        // now update db
        sources.set({ id: row.values.id, prop: column.id, value }) //. update db
        return newRows
      })
    },
    [data, sources]
  )

  // add button handler
  const clickAdd = React.useCallback(async () => {
    // add to database
    const name = ''
    const item = { data: { name } }
    const rows = await sources.add([item]) //. add to db
    console.log('added', rows)
    // if worked okay add to table rows also
    if (rows && rows[0]) {
      item.id = rows[0].id
      setData(oldRows => {
        const newRows = [...oldRows, item]
        return newRows
      })
    }
  }, [sources])

  return (
    <div style={{ width: '100%', margin: 'auto' }}>
      {/* . move to app */}
      <Bar views={views} view={view} />
      <br />
      <TableUI columns={columns} data={data} updateData={updateData} />
      <br />
      {/* . move to app */}
      <PrimaryButton onClick={clickAdd} iconProps={{ iconName: 'Add' }}>
        Add
      </PrimaryButton>
    </div>
  )
}

export default Table
