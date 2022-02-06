// table view using react-table

// see https://react-table.tanstack.com/
// example - https://react-table.tanstack.com/docs/examples/editable-data

import React from 'react'
import { Stack, PrimaryButton, DefaultButton } from '@fluentui/react'
import { Text, SearchBox, ComboBox, Dropdown } from '@fluentui/react'
import {
  useTable,
  useSortBy,
  useFilters,
  // useGroupBy,
  // useExpanded,
} from 'react-table'
import './table.css'

const views = [
  {
    name: 'default',
    fields: [
      { name: 'id', readonly: true, field: 'id' },
      // { name: 'data', readonly: true, field: 'data' },
      { name: 'type' },
      { name: 'name' },
      { name: 'notes' },
    ],
    filters: [{ field: 'name', operator: 'contains', value: 'g' }],
    groups: [{ field: 'type' }],
    sorts: [{ field: 'name', order: 'ascending' }],
  },
]
let currentView = 'default'
let view = views[0]

const fieldOptions = view.fields.map(field => ({
  key: field.name,
  text: field.name,
}))

const filterOperators = [
  { key: 'contains', text: 'contains' },
  { key: 'starts with', text: 'starts with' },
  { key: 'is', text: 'is' },
  { key: 'is not', text: 'is not' },
]

const sortOrders = [
  { key: 'ascending', text: 'ascending' },
  { key: 'descending', text: 'descending' },
]

// need a dummy menu item for search etc dropdowns to render on click
const menuItems = [{ key: 'blank', text: '' }]

const stackTokens = { childrenGap: 5 }

// -----------------------------------------------------

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

function FilterBox() {
  return (
    <div style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
      <Stack horizontal disableShrink tokens={stackTokens}>
        <Stack.Item align="center">
          <Text>Where</Text>
        </Stack.Item>
        <ComboBox defaultSelectedKey="name" options={fieldOptions}></ComboBox>
        <Dropdown
          defaultSelectedKey={filterOperators[0].key}
          // @ts-ignore
          options={filterOperators}
        ></Dropdown>
        <SearchBox
          ariaLabel="Filter text"
          placeholder="Filter text"
          // onAbort={onAbort}
          // onChange={onChange}
          // styles={searchBoxStyles}
          onSearch={newValue =>
            console.log('SearchBox onSearch fired: ' + newValue)
          }
        />
      </Stack>
    </div>
  )
}

// -----------------------------------------------------

function GroupBox() {
  return (
    <div style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
      <Stack horizontal disableShrink tokens={stackTokens}>
        <Stack.Item align="center">
          <Text>Group By</Text>
        </Stack.Item>
        <Dropdown defaultSelectedKey="type" options={fieldOptions}></Dropdown>
        {/* <Dropdown
          defaultSelectedKey={sortOrders[0].key}
          options={sortOrders}
        ></Dropdown> */}
      </Stack>
    </div>
  )
}

// -----------------------------------------------------

function SortBox() {
  return (
    <div style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
      <Stack horizontal disableShrink tokens={stackTokens}>
        <Stack.Item align="center">
          <Text>Sort By</Text>
        </Stack.Item>
        <Dropdown defaultSelectedKey="name" options={fieldOptions}></Dropdown>
        <Dropdown
          defaultSelectedKey={sortOrders[0].key}
          options={sortOrders}
        ></Dropdown>
      </Stack>
    </div>
  )
}

// -----------------------------------------------------

// sources is the Neomem data aggregator
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

  // fetch initial data for table
  React.useEffect(() => {
    async function fetchData() {
      const data = await sources.get() //. get ALL data for now
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

  //. these will be dynamic based on the current view
  const filterMenuProps = React.useMemo(
    () => ({
      onRenderMenuList: FilterBox,
      shouldFocusOnMount: true,
      items: menuItems,
    }),
    []
  )

  const groupMenuProps = React.useMemo(
    () => ({
      onRenderMenuList: GroupBox,
      shouldFocusOnMount: true,
      items: menuItems,
    }),
    []
  )

  const sortMenuProps = React.useMemo(
    () => ({
      onRenderMenuList: SortBox,
      shouldFocusOnMount: true,
      items: menuItems,
    }),
    []
  )

  return (
    <div style={{ width: '100%', margin: 'auto' }}>
      <Stack horizontal disableShrink tokens={stackTokens}>
        <PrimaryButton onClick={clickAdd} iconProps={{ iconName: 'Add' }}>
          Add
        </PrimaryButton>
        <DefaultButton
          iconProps={{ iconName: 'Filter' }}
          menuProps={filterMenuProps}
        >
          Filter
        </DefaultButton>
        <DefaultButton
          iconProps={{ iconName: 'GroupList' }}
          menuProps={groupMenuProps}
        >
          Group
        </DefaultButton>
        <DefaultButton
          iconProps={{ iconName: 'Sort' }}
          menuProps={sortMenuProps}
        >
          Sort
        </DefaultButton>
      </Stack>
      <br />
      <TableUI columns={columns} data={data} updateData={updateData} />
    </div>
  )
}

export default Table
