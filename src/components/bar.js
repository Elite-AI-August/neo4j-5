import React from 'react'
import { Stack, DefaultButton } from '@fluentui/react/lib-commonjs'
import {
  Text,
  SearchBox,
  ComboBox,
  Dropdown,
} from '@fluentui/react/lib-commonjs'

// need a dummy menu item for search etc dropdowns to render on click
const menuItems = [{ key: 'blank', text: '' }]

const stackTokens = { childrenGap: 5 }

// -----------------------------------------------------

function ViewBox({ viewOptions }) {
  return (
    <div style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
      <Stack horizontal disableShrink tokens={stackTokens}>
        <ComboBox
          defaultSelectedKey={viewOptions[0].key}
          options={viewOptions}
        ></ComboBox>
        {/* <Dropdown
          defaultSelectedKey={filterOperators[0].key}
          // @ts-ignore
          options={filterOperators}
        ></Dropdown> */}
      </Stack>
    </div>
  )
}

// -----------------------------------------------------

function SourceBox() {
  return (
    <div style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
      <Stack horizontal disableShrink tokens={stackTokens}>
        {/* <ComboBox
          defaultSelectedKey={viewOptions[0].key}
          options={viewOptions}
        ></ComboBox> */}
        {/* <Dropdown
          defaultSelectedKey={filterOperators[0].key}
          // @ts-ignore
          options={filterOperators}
        ></Dropdown> */}
      </Stack>
    </div>
  )
}

// -----------------------------------------------------

function FieldBox() {
  return (
    <div style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
      <Stack horizontal disableShrink tokens={stackTokens}>
        {/* <ComboBox
          defaultSelectedKey={viewOptions[0].key}
          options={viewOptions}
        ></ComboBox> */}
        {/* <Dropdown
          defaultSelectedKey={filterOperators[0].key}
          // @ts-ignore
          options={filterOperators}
        ></Dropdown> */}
      </Stack>
    </div>
  )
}

// -----------------------------------------------------

function FilterBox({ fieldOptions, filterOperators }) {
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

function GroupBox({ fieldOptions }) {
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

function SortBox({ fieldOptions, sortOrders }) {
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

function PaneBox({ fieldOptions, sortOrders }) {
  return (
    <div style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
      {/* <Stack horizontal disableShrink tokens={stackTokens}>
        <Stack.Item align="center">
          <Text>Sort By</Text>
        </Stack.Item>
        <Dropdown defaultSelectedKey="name" options={fieldOptions}></Dropdown>
        <Dropdown
          defaultSelectedKey={sortOrders[0].key}
          options={sortOrders}
        ></Dropdown>
      </Stack> */}
    </div>
  )
}

// -----------------------------------------------------

const viewMenuProps = () => ({
  onRenderMenuList: ViewBox,
  shouldFocusOnMount: true,
  items: menuItems,
})

const sourceMenuProps = () => ({
  onRenderMenuList: SourceBox,
  shouldFocusOnMount: true,
  items: menuItems,
})

const fieldMenuProps = () => ({
  onRenderMenuList: FieldBox,
  shouldFocusOnMount: true,
  items: menuItems,
})

const filterMenuProps = () => ({
  onRenderMenuList: FilterBox,
  shouldFocusOnMount: true,
  items: menuItems,
})

const groupMenuProps = () => ({
  onRenderMenuList: GroupBox,
  shouldFocusOnMount: true,
  items: menuItems,
})

const sortMenuProps = () => ({
  onRenderMenuList: SortBox,
  shouldFocusOnMount: true,
  items: menuItems,
})

const paneMenuProps = () => ({
  onRenderMenuList: PaneBox,
  shouldFocusOnMount: true,
  items: menuItems,
})

// -----------------------------------------------------

export function Bar({ views, view }) {
  const viewOptions = views.map(view => ({
    key: view.name,
    text: view.name,
  }))

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

  return (
    <Stack horizontal disableShrink tokens={stackTokens}>
      {/* view */}
      <DefaultButton
        iconProps={{ iconName: 'View' }}
        menuProps={viewMenuProps.bind(null, { viewOptions })}
      >
        View
      </DefaultButton>

      {/* source */}
      <DefaultButton
        iconProps={{ iconName: 'Database' }}
        menuProps={sourceMenuProps.bind(null, { viewOptions })}
      >
        Source
      </DefaultButton>

      {/* fields */}
      <DefaultButton
        iconProps={{ iconName: 'TripleColumn' }}
        menuProps={fieldMenuProps.bind(null, { viewOptions })}
      >
        Fields
      </DefaultButton>

      {/* filter */}
      <DefaultButton
        iconProps={{ iconName: 'Filter' }}
        menuProps={filterMenuProps.bind(null, {
          fieldOptions,
          filterOperators,
        })}
      >
        Filter
      </DefaultButton>

      {/* group */}
      <DefaultButton
        iconProps={{ iconName: 'GroupList' }}
        menuProps={groupMenuProps.bind(null, { fieldOptions })}
      >
        Group
      </DefaultButton>

      {/* sort */}
      <DefaultButton
        iconProps={{ iconName: 'Sort' }}
        menuProps={sortMenuProps.bind(null, { fieldOptions, sortOrders })}
      >
        Sort
      </DefaultButton>

      {/* pane */}
      <DefaultButton
        iconProps={{ iconName: 'ViewAll2' }}
        menuProps={paneMenuProps.bind(null, {})}
      >
        Pane
      </DefaultButton>
    </Stack>
  )
}
