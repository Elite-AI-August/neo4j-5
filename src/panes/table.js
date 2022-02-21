// table view

// uses react-table
// see https://react-table.tanstack.com/
// example - https://react-table.tanstack.com/docs/examples/editable-data

import React from 'react'
// import { Checkbox } from '@fluentui/react/lib-commonjs'
import {
  useTable,
  useSortBy,
  useFilters,
  useRowSelect,
  // useGroupBy,
  // useExpanded,
} from 'react-table'

// const showCheckboxes = false

const rowSelectorWidth = 20
const defaultColumnWidth = 150

const initialState = { hiddenColumns: ['id'] } //. better way?

// checkbox used for selecting rows
//. not used, as don't like checkboxes.
// eslint-disable-next-line react/display-name
// const IndeterminateCheckbox = React.forwardRef(
//   // @ts-ignore
//   ({ indeterminate, ...rest }, ref) => {
//     const defaultRef = React.useRef()
//     const resolvedRef = ref || defaultRef
//     React.useEffect(() => {
//       // @ts-ignore
//       // resolvedRef.current.indeterminate = indeterminate
//     }, [resolvedRef, indeterminate])
//     return (
//       <>
//          <input type="checkbox" ref={resolvedRef} {...rest} />
//       </>
//     )
//   }
// )

// eslint-disable-next-line react/display-name
const RowSelector = React.forwardRef(
  // @ts-ignore
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef
    console.log('resolvedRef, rest', resolvedRef, rest)
    // React.useEffect(() => {
    //   // @ts-ignore
    //   // resolvedRef.current.indeterminate = indeterminate
    // }, [resolvedRef, indeterminate])
    function clickRowSelector() {
      // alert('highlight row ' + indeterminate + ' ' + JSON.stringify(rest))
      // toggle add/remove row from selection? no - do like gsheet
      //. in gsheet, click selects the whole row in light blue
      //. use cmd+click to add/remove to/from the growing selection
      // so for now just do the plain click, and rightclick
      // resolvedRef.current.indeterminate = indeterminate
    }
    function rightClickRowSelector(event) {
      event.preventDefault() // prevent default context menu from appearing
      // alert('menu')
    }
    // const selected = rest.checked
    // const selected = selectedRowIds[foo]
    return <input type="checkbox" ref={resolvedRef} {...rest} />
    // return (
    //   <div
    //     onClick={clickRowSelector}
    //     onContextMenu={rightClickRowSelector}
    //     className="table-checkbox"
    //     // className={'table-checkbox' + (selected ? ' selected' : '')}
    //     // checked={rest.checked}
    //   >
    //     &nbsp;
    //   </div>
    // )
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
    // @ts-ignore
    selectedFlatRows,
    // @ts-ignore
    state: { selectedRowIds },
  } = useTable(
    {
      columns,
      data,
      initialState, // for hidden columns
      // note: anything added to these options will automatically be available
      // on the instance - so can call this function from the cell renderer.
      // @ts-ignore
      updateData,
      // setSelections,
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
          // @ts-ignore
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <RowSelector {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          EditableCell: ({ row }) => (
            <RowSelector
              {...row
                // @ts-ignore
                .getToggleRowSelectedProps()}
            />
          ),
        },
        ...columns,
      ])
    }
  )

  // React.useEffect(() => {
  //   console.log(selectedRowIds)
  //   // const selected = selectedRowIds.map((row: Row) => row.original)
  //   // setSelectedRows(selected)
  //   // Object.keys()
  //   setSelections(selectedRowIds)
  // }, [setSelections, selectedRowIds])

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
              {headerGroup.headers.map((header, i) => (
                // eslint-disable-next-line react/jsx-key
                <th
                  {...header.getHeaderProps({
                    ...header.getSortByToggleProps(),
                    style: {
                      width: i === 0 ? rowSelectorWidth : defaultColumnWidth,
                      minWidth: rowSelectorWidth,
                    }, //. this is just a default for empty cols?
                  })}
                >
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
            // console.log(204, row.original.id)
            return (
              // eslint-disable-next-line react/jsx-key
              <tr
                {...row.getRowProps()}
                style={{
                  background: selectedRowIds[row.id] ? '#eee' : 'inherit',
                }}
              >
                {/* <td>
                <Checkbox checked={selected[row.id]} />
              </td> */}
                {row.cells.map(cell => {
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <td {...cell.getCellProps()}>
                      {cell.render('EditableCell')}
                    </td>
                  )
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

  function onChange(event) {
    setValue(event.target.value || '')
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
  return (
    <input
      value={value}
      // onClick={() => toggleAllRowsSelected(false)} //. deselect all rows!
      onChange={onChange}
      onBlur={onBlur}
      style={{ background: 'inherit' }}
    />
  )
}

// -----------------------------------------------------------------------

// neomem is the Neomem data aggregator
function Table({ neomem, view }) {
  // get columns
  // this is dynamic as view is changed
  const columns = React.useMemo(() => {
    const fields = (view && view.fields) || []
    return fields.map(field => ({
      Header: field.name,
      accessor: field.field || (row => row.data[field.name] || ''),
      width: field.width || 150, //.
      // Cell: field.readonly ? () => null : EditableCell, //.
      // Cell2: EditableCell,
      EditableCell,
      //. ReadonlyCell
    }))
  }, [view])

  // this is data for the table - eg [{ id, data: { name: 'pokpok' }}, ...] ?
  const [data, setData] = React.useState([])

  // const clearSelections = () => {}

  // **fetch initial data for table**
  React.useEffect(() => {
    async function fetchData() {
      console.log('fetchdata', view)
      const { items, error } = await neomem.get(view)
      items.push({ id: null, data: {} })
      setData(items)
    }
    fetchData()
  }, [neomem, view])

  // cell value was updated -
  // called by cell renderer when value is updated.
  // handles editing existing value as well as new row.
  const updateData = React.useCallback(
    async (row, column, value) => {
      console.log(row, column, value)
      //. check for db error/timeout etc
      const id = row.values && row.values.id // eg 'afbe32-d431...' or null
      const prop = column.id // eg 'name'
      console.log({ id, prop, value })
      const { items, error } = await neomem.set({ id, prop, value }) // update db
      // update table rows also
      if (!error) {
        const rowIndex = row.index // eg 1
        const columnId = column.id // eg 'name'
        // add new item
        if (!id) {
          const newId = items[0].id // eg 'afbe32-d431...'
          setData(oldRows => {
            const newRows = oldRows.map((row, i) => {
              if (i === rowIndex) {
                return { ...oldRows[i], [columnId]: value, id: newId }
              }
              return row
            })
            newRows.push({ id: null, data: {} })
            return newRows
          })
        } else {
          // edit existing item
          setData(oldRows => {
            const newRows = oldRows.map((row, i) => {
              if (i === rowIndex) {
                return { ...oldRows[i], [columnId]: value }
              }
              return row
            })
            return newRows
          })
        }
      }
    },
    [neomem]
  )

  // // handler for Add button
  // const clickAdd = React.useCallback(async () => {
  //   // add to database
  //   const name = ''
  //   const item = { data: { name } }
  //   const { items, error } = await neomem.add([item]) // add new item to db
  //   if (!error) {
  //     console.log('added', items)
  //     // if worked okay add to table rows also
  //     if (items && items[0]) {
  //       item.id = items[0].id // guid eh?
  //       setData(oldRows => {
  //         const newRows = [...oldRows, item]
  //         return newRows
  //       })
  //     }
  //   }
  // }, [neomem])

  // // handler for Delete button
  // const clickDelete = React.useCallback(async () => {
  //   // delete selected rows from database
  //   const ids = Object.keys(selections).map(rownum => data[rownum].id)
  //   console.log(`delete ids`, ids)
  //   for (let id of ids) {
  //     await neomem.delete({ id })
  //     //. if worked, delete from table rows also
  //     setData(oldRows => oldRows.filter(row => row.id !== id))
  //   }
  // }, [neomem, selections, data])

  return (
    <div
      className="table-pane"
      style={{ width: '100%', margin: 'auto', padding: '4px' }}
    >
      <TableUI
        columns={columns}
        data={data}
        updateData={updateData}
        // setSelections={setSelections}
      />
    </div>
  )
}

export default Table
