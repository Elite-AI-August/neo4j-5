// table view

// uses react-table
// see https://react-table.tanstack.com/
// example - https://react-table.tanstack.com/docs/examples/editable-data

import React from 'react'
import { PrimaryButton, Checkbox } from '@fluentui/react/lib-commonjs'
import {
  useTable,
  useSortBy,
  useFilters,
  useRowSelect,
  // useGroupBy,
  // useExpanded,
} from 'react-table'
import { Bar } from '../components/bar' //. move up to app
import { Subbar } from '../components/subbar' //. move up to app
// import './table.css'
// import styles from '../styles/table.module.css'

//. move up to app
const views = [
  {
    name: 'default',
    source: {
      name: 'supabase', //. not used yet
      options: {},
    },
    fields: [
      // { name: 'id', readonly: true, field: 'id' },
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

// eslint-disable-next-line react/display-name
const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef
    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])
    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    )
  }
)

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

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    // selectedFlatRows,
    // state: { selectedRowIds },
  } = useTable(
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
    useSortBy,
    // useGroupBy,
    // useExpanded, // useGroupBy would be pretty useless without useExpanded
    //
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        // make a column for selection
        {
          id: 'selection',
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ])
    }
  )

  // render the ui for the table
  // note: getHeaderProps etc fns include the key, which eslint complains about not finding
  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            // eslint-disable-next-line react/jsx-key
            <tr {...headerGroup.getHeaderGroupProps()}>
              {/* <th>foo</th> */}
              {headerGroup.headers.map(header => (
                // eslint-disable-next-line react/jsx-key
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
              // eslint-disable-next-line react/jsx-key
              <tr {...row.getRowProps()}>
                {/* <td>
                <Checkbox checked={selected[row.id]} />
              </td> */}
                {row.cells.map(cell => {
                  // eslint-disable-next-line react/jsx-key
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      {/* <p>Selected Rows: {Object.keys(selectedRowIds).length}</p>
      <pre>
        <code>
          {JSON.stringify(
            {
              selectedRowIds: selectedRowIds,
              'selectedFlatRows[].original': selectedFlatRows.map(
                d => d.original
              ),
            },
            null,
            2
          )}
        </code>
      </pre> */}
    </>
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
//. call it db? could be a single source or aggregate? call it nm? yah
function Table({ sources }) {
  // get columns
  //. this will be dynamic as view is changed eh?
  const columns = React.useMemo(() => {
    return view.fields.map(field => ({
      Header: field.name,
      accessor: field.field || (row => row.data[field.name] || ''),
      // Cell: field.readonly ? () => null : EditableCell,
      Cell: EditableCell,
    }))
  }, [])

  // this is data for the table - eg [{ id, data: { name: 'pokpok' }}, ...] ?
  const [data, setData] = React.useState([])

  // **fetch initial data for table**
  //. rename sources to neomem? nm? it's the core, like a graph db
  React.useEffect(() => {
    async function fetchData() {
      // const data = await sources.get() //. get ALL data for now
      //. rename nodes to items?
      const { nodes } = await sources.get() //. get ALL data for now
      const data = nodes
      setData(data)
    }
    fetchData()
  }, [sources])

  // cell value was updated -
  // called by cell renderer when value is updated.
  const updateData = React.useCallback(
    async (row, column, value) => {
      console.log(row, column, value)
      //. check for db error/timeout etc
      const id = row.values && row.values.id
      const prop = column.id
      console.log({ id, prop, value })
      await sources.set({ id, prop, value }) // update db - //. check for error etc
      // update table rows
      const rowIndex = row.index // eg 1
      const columnId = column.id // eg 'notes'
      setData(oldRows => {
        const newRows = oldRows.map((row, index) => {
          if (index === rowIndex) {
            return { ...oldRows[rowIndex], [columnId]: value }
          }
          return row
        })
        return newRows
      })
    },
    [sources]
  )

  // handler for Add button
  const clickAdd = React.useCallback(async () => {
    // add to database
    const name = ''
    const item = { data: { name } }
    const rows = await sources.add([item]) // add new item to db
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

  // handler for Delete button
  const clickDelete = React.useCallback(async () => {
    // // delete from database
    // const rows = await sources.delete()
    // // if worked okay remove from table rows also
    // if (rows && rows[0]) {
    //   // item.id = rows[0].id
    //   setData(oldRows => {
    //     const newRows = [...oldRows, item]
    //     return newRows
    //   })
    // }
    alert('delete')
  }, [sources])

  return (
    <div
      className="table-pane"
      style={{ width: '100%', margin: 'auto', padding: '4px' }}
    >
      {/* . move to app */}
      <Bar views={views} view={view} />
      <TableUI columns={columns} data={data} updateData={updateData} />
      {/* . move to app */}
      <Subbar clickAdd={clickAdd} clickDelete={clickDelete} />
      <br />
    </div>
  )
}

export default Table
